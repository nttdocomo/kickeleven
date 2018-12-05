#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-1-29

@author: nttdocomo
'''
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# why is this here?
#PROJECT_DIR = os.path.abspath(os.path.join(BASE_DIR, '..'))


PROJECT_DIR = BASE_DIR

STATIC_DIR = os.path.join(os.path.dirname(__file__),'static')

TEMP_DIR = os.path.join(STATIC_DIR,'tmp')

ACCOUNT_ACTIVATION_DAYS = 1
DEFAULT_FROM_EMAIL = 'nttdocomo.ouyi@gmail.com'
DATABASE_USERNAME = 'root'
DATABASE_PASSWORD = ''
DATABASE_NAME = 'kickeleven'