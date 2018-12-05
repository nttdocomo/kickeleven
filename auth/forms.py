#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-4-11

@author: nttdocomo
'''
import web
from web import utils, net
from web import form
from db.models import DB_Session
from models import User, RegistrationProfile
# from django.forms import ValidationError

vpass = form.regexp(r".{3,20}$", 'must be between 3 and 20 characters')
vemail = form.regexp(r".*@.*", "must be a valid email address")

class BaseForm(form.Form):
    def render(self):
        out = ''
        out += self.rendernote(self.note)
        
        for i in self.inputs:
            html = utils.safeunicode(i.pre) + i.render() + self.rendernote(i.note) + utils.safeunicode(i.post)
            if i.is_hidden():
                out += '    <tr style="display: none;"><th></th><td>%s</td></tr>\n' % (html)
            else:
                out += '    <div class="form-group"><label for="%s">%s</label>%s</div>\n' % (i.id, net.websafe(i.description), html)
        out += ""
        return out

class InputPatch(form.Input):
    def render(self):
        attrs = self.attrs.copy()
        attrs['type'] = self.get_type()
        if self.value is not None:
            attrs['value'] = self.value
        attrs['name'] = self.name
        attrs['class_'] = 'form-control'
        return '<input %s/>' % attrs

form.Input = InputPatch

class LoginForm(BaseForm):
    def __init__(self, *inputs, **kw):
        super(LoginForm, self).__init__(*(form.Textbox("email", description="Email", class_='form-control'),
    form.Password("password", vpass, description="Password", class_='form-control')))

    def validates(self, source=None, _validate=True, **kw):
        source = source or kw or web.input()
        out = super(LoginForm, self).validates(source=source, _validate=_validate, **kw)
        db = DB_Session()
        query = db.query(User)
        try:
            user = query.filter(User.email == source.email).one()
            if user and user.validate_password(source.password):
                session = web.config.session
                session.login=1  
                session.privilege=user.privilege
                out = True
            else:
                out = False
        except Exception, e:
            out = False
        db.close()
        return out

class RegistrationForm(BaseForm):
    def __init__(self, *inputs, **kw):
        super(RegistrationForm, self).__init__(*(form.Textbox("username", description="Username", class_='form-control'),
    form.Textbox("email", vemail, description="E-Mail", class_='form-control'),
    form.Password("password", vpass, description="Password", class_='form-control'),
    form.Password("password2", description="Repeat password", class_='form-control')), **{
        "validators" : [form.Validator("Passwords did't match", lambda i: i.password == i.password2)]
                                                                                          })
    
    def save(self, domain_override=""):
        source = web.input()
        """
        Create the new ``User`` and ``RegistrationProfile``, and
        returns the ``User`` (by calling
        ``RegistrationProfile.objects.create_inactive_user()``).
        
        """
        new_user = RegistrationProfile.create_inactive_user(username=source['username'],
                                                                    password=source['password'],
                                                                    email=source['email'],
                                                                    domain_override=domain_override,
                                                                    )
        return new_user
    
#     def validates(self, source=None, _validate=True, **kw):
#         out = super(RegistrationForm, self).validates(source=source, _validate=_validate, **kw)
#         if out:
#             source = source or kw or web.input()
#             if 'password1' in source and 'password2' in source:
#                 if source['password1'] != source['password2']:
#                     out = False
#                     raise ValidationError(u'You must type the same password each time')
#         return out