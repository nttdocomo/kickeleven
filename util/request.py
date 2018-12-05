#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2013-4-17

@author: nttdocomo
'''

def parseAcceptLanguage(acceptLanguage):
    languages = acceptLanguage.split(",")
    return languages[0].lower()
#     locale_q_pairs = []
#     for language in languages:
#         if language.split(";")[0] == language:
#             locale_q_pairs.append((language.strip(), "1"))
#         else:
#             locale = language.split(";")[0].strip()
#             q = language.split(";")[1].split("=")[1]
#             locale_q_pairs.append((locale, q))
#     return locale_q_pairs