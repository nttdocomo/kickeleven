#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-1-23

@author: nttdocomo
'''
import web
import datetime
import random
import sha
import re
import settings
from db.models import BaseModel,DB_Session
from util.hashcompat import md5_constructor, sha_constructor
from util.encoding import smart_str
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import CHAR, String, DateTime, Boolean, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TINYINT

def get_hexdigest(algorithm, salt, raw_password):
    """
    Returns a string of the hexdigest of the given plaintext password and salt
    using the given algorithm ('md5', 'sha1' or 'crypt').
    """
    raw_password, salt = smart_str(raw_password), smart_str(salt)
    if algorithm == 'crypt':
        try:
            import crypt
        except ImportError:
            raise ValueError('"crypt" password algorithm not supported in this environment')
        return crypt.crypt(raw_password, salt)

    if algorithm == 'md5':
        return md5_constructor(salt + raw_password).hexdigest()
    elif algorithm == 'sha1':
        return sha_constructor(salt + raw_password).hexdigest()
    raise ValueError("Got unknown password algorithm type in password.")

UNUSABLE_PASSWORD = '!' # This will never be a valid hash
SHA1_RE = re.compile('^[a-f0-9]{40}$')

class User(BaseModel):
    __tablename__ = 'user'
    keep_existing=True

    id = Column(Integer, primary_key=True, autoincrement=True)
    date_joined = Column(DateTime, nullable=False, default=datetime.datetime.now)
    username = Column(String(60), unique=True) # or Column(String(30))
    email = Column(String(60))
    password = Column(CHAR(60),default=UNUSABLE_PASSWORD)
    is_active = Column(Boolean, default=True)
    privilege = Column(TINYINT(1), default=0)

    def set_password(self, raw_password):
        algo = 'sha1'
        salt = get_hexdigest(algo, str(random.random()), str(random.random()))[:5]
        hsh = get_hexdigest(algo, salt, raw_password)
        self.password = '%s$%s$%s' % (algo, salt, hsh)

    def validate_password(self, password):
        algo, salt, hsh = self.password.split('$')
        return hsh == get_hexdigest(algo, salt, password)

class RegistrationProfile(BaseModel):
    __tablename__ = 'registrationprofile'
    
    ACTIVATED = u"ALREADY_ACTIVATED"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    activation_key = Column(CHAR(41), unique=True)
    
    user = relationship(User)
    
    @classmethod
    def activate_user(cls, activation_key):
        """
        Validate an activation key and activate the corresponding
        ``User`` if valid.
        
        If the key is valid and has not expired, return the ``User``
        after activating.
        
        If the key is not valid or has expired, return ``False``.
        
        If the key is valid but the ``User`` is already active,
        return ``False``.
        
        To prevent reactivation of an account which has been
        deactivated by site administrators, the activation key is
        reset to the string constant ``RegistrationProfile.ACTIVATED``
        after successful activation.

        To execute customized logic when a ``User`` is activated,
        connect a function to the signal
        ``registration.signals.user_activated``; this signal will be
        sent (with the ``User`` as the value of the keyword argument
        ``user``) after a successful activation.
        
        """
        #from registration.signals import user_activated
        
        # Make sure the key we're trying conforms to the pattern of a
        # SHA1 hash; if it doesn't, no point trying to look it up in
        # the database.
        db = DB_Session()
        if SHA1_RE.search(activation_key):
            query = db.query(RegistrationProfile)
            profile = query.filter(RegistrationProfile.activation_key == activation_key).one()
            if not profile:
                return False
            if not profile.activation_key_expired():
                user = profile.user
                user.is_active = 1
                profile.activation_key = RegistrationProfile.ACTIVATED
                db.flush()
                db.commit()
                db.close()
                #user_activated.send(sender=self.model, user=user)
                return user
        return False
    
    @classmethod
    def create_inactive_user(cls,username, password, email, domain_override="", 
                             send_email=True):
        new_user = User(username=username, email=email, is_active=False)
        new_user.set_password(password)
        db = DB_Session()
        db.add(new_user)
        db.flush()
        db.refresh(new_user)
        db.commit()
        db.close()
        
        registration_profile = cls.create_profile(new_user)
        if send_email:
            current_site = domain_override
#            current_site = Site.objects.get_current()
            
            subject = web.template.render('templates').activation_email_subject({ 'site': current_site,'activation_key': registration_profile.activation_key })
#             render_to_string('registration/activation_email_subject.txt',
#                                        { 'site': current_site,'activation_key': registration_profile.activation_key })
            # Email subject *must not* contain newlines
            subject = ''.join(subject.__str__().splitlines())
            
            message = web.template.render('templates').activation_email({ 'activation_key': registration_profile.activation_key,
                                         'expiration_days': settings.ACCOUNT_ACTIVATION_DAYS,
                                         'site': current_site })
#             render_to_string('registration/activation_email.txt',
#                                        { 'activation_key': registration_profile.activation_key,
#                                          'expiration_days': settings.ACCOUNT_ACTIVATION_DAYS,
#                                          'site': current_site })
            
            web.sendmail(settings.DEFAULT_FROM_EMAIL, new_user.email,subject, message)
        return new_user
    
    @classmethod
    def create_profile(self, user):
        """
        Create a ``RegistrationProfile`` for a given
        ``User``, and return the ``RegistrationProfile``.
        
        The activation key for the ``RegistrationProfile`` will be a
        SHA1 hash, generated from a combination of the ``User``'s
        username and a random salt.
        
        """
        salt = sha.new(str(random.random())).hexdigest()[:5]
        activation_key = sha.new(salt+user.username).hexdigest()
#        prepend "key_" to the key_name, because key_names can't start with numbers
        registrationprofile = RegistrationProfile(user=user, activation_key=activation_key)
        db = DB_Session()
        db.add(registrationprofile)
        db.flush()
        db.refresh(registrationprofile)
        db.commit()
        db.close()
        return registrationprofile
    
    def activation_key_expired(self):
        """
        Determine whether this ``RegistrationProfile``'s activation
        key has expired, returning a boolean -- ``True`` if the key
        has expired.
        
        Key expiration is determined by a two-step process:
        
        1. If the user has already activated, the key will have been
           reset to the string constant ``ACTIVATED``. Re-activating
           is not permitted, and so this method returns ``True`` in
           this case.

        2. Otherwise, the date the user signed up is incremented by
           the number of days specified in the setting
           ``ACCOUNT_ACTIVATION_DAYS`` (which should be the number of
           days after signup during which a user is allowed to
           activate their account); if the result is less than or
           equal to the current date, the key has expired and this
           method returns ``True``.
        
        """
        expiration_date = datetime.timedelta(days=settings.ACCOUNT_ACTIVATION_DAYS)
        return self.activation_key == RegistrationProfile.ACTIVATED or \
               (self.user.date_joined + expiration_date <= datetime.datetime.now())

    activation_key_expired.boolean = True