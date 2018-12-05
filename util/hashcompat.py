#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-6-1

@author: nttdocomo
'''
"""
The md5 and sha modules are deprecated since Python 2.5, replaced by the
hashlib module containing both hash algorithms. Here, we provide a common
interface to the md5 and sha constructors, depending on system version.
"""

import sys
if sys.version_info >= (2, 5):
    import hashlib
    md5_constructor = hashlib.md5
    md5_hmac = md5_constructor
    sha_constructor = hashlib.sha1
    sha_hmac = sha_constructor
else:
    import md5
    md5_constructor = md5.new
    md5_hmac = md5
    import sha
    sha_constructor = sha.new
    sha_hmac = sha

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