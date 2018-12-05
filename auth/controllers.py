#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-1-23

@author: nttdocomo
'''
import web, json
from auth.models import RegistrationProfile
from auth.forms import RegistrationForm,LoginForm

class AuthBase(object):
    def __init__(self):
        session = web.config.session
        if (not hasattr(session, 'login')) or session.login == 0:
            raise web.seeother('/login/', absolute=True)

class Admin(AuthBase):
    def GET(self):
        session = web.config.session
        render = web.template.render('templates')
        return render.admin(session.login)
        
class Login:
    def GET(self):
        f = LoginForm()
        render = web.template.render('templates')
        return render.login()
    def POST(self):
        f = LoginForm()
        web.header('Content-Type', 'application/json')
        try:
            if not f.validates():
                raise web.unauthorized('Your email or password is wrong')
    #             return json.dumps({'success':False})
            else:
                return json.dumps({'success':True})
    #             raise web.seeother('/admin/')
        except web.HTTPError, e:
            return json.dumps({'message':e.data})

class Logout:
    def GET(self):
        web.seeother('/')

    def POST(self):
        input = web.input()
        redirect = '/login/'
        session = web.config.session
        session.login = 0
        session.kill()
        if hasattr(input, 'redirect'):
            redirect = input.redirect
        raise web.seeother(redirect)

class RegisterPage:
    def GET(self):
        f = RegistrationForm()
        render = web.template.render('templates')
        return render.register()
    def POST(self):
        f = RegistrationForm()
        if not f.validates():
            render = web.template.render('templates')
            return render.register()
        else:
            domain_override = web.ctx.host
            new_user = f.save(domain_override)
#             render = web.template.render('templates')
#             web.header('Content-Type', 'text/html')
#             return render.register_success()
            web.header('Content-Type', 'application/json')
            return json.dumps({'success':True})

class Activate:
    def GET(self,activation_key):
        activation_key = activation_key.lower() # Normalize before trying anything with it.
        account = RegistrationProfile.activate_user(activation_key)
        render = web.template.render('templates')
        web.header('Content-Type', 'text/html')
        return render.activate()