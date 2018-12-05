#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-1-23

@author: nttdocomo
'''
import web, os
from auth.controllers import *
from soccer.controllers import *
from api.urls import app_api
from sessions.models import Session, SQLAStore

home='' 
os.environ["SCRIPT_NAME"] = home 
os.environ["REAL_SCRIPT_NAME"] = home

web.config.smtp_server = 'smtp.gmail.com'
web.config.smtp_port = 587
web.config.smtp_username = 'nttdocomo.ouyi@gmail.com'
web.config.smtp_password = '709394803610'
web.config.smtp_starttls = True
web.config.debug = False

urls = (
    '/api', app_api,
    '/register/', 'RegisterPage',
    '/activate/(\w+)/','Activate',
    '/admin/', 'Admin',
    '/login/', 'Login',
    '/logout/', 'Logout',
    '/images/(.*)','Images'
)
app = web.application(urls, locals())

if __name__ == "__main__":
    #关掉stderr的输出位置
    import sys
    sys.stderr = None
    #fastcgi的方式运行app
    web.wsgi.runwsgi = lambda func, addr=None: web.wsgi.runfcgi(func, addr)
    app.run()