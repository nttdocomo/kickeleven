#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2012-1-26

@author: nttdocomo
'''

import settings

#http://blog.notdot.net/2010/01/ReferenceProperty-prefetching-in-App-Engine
def prefetch_refprops(entities, *props):
    fields = [(entity, prop) for entity in entities for prop in props]
    ref_keys = [prop.get_value_for_datastore(x) for x, prop in fields]
    ref_entities = dict((x.key(), x) for x in db.get(set(ref_keys)))
    for (entity, prop), ref_key in zip(fields, ref_keys):
        prop.__set__(entity, ref_entities[ref_key])
    return entities

def query_dict_to_keywords(query_dict):
    if settings.DEBUG:
        # support for profiling, pretend profiling stuff doesn't exist
        return dict([(str(k), v) for k, v in query_dict.items() if not k.startswith('_prof')])
    
    return dict([(str(k), v) for k, v in query_dict.items()])

def dbg():
    """ Enter pdb in App Engine
    Renable system streams for it.
    """
    import pdb
    import sys
    pdb.Pdb(stdin=getattr(sys,'__stdin__'),stdout=getattr(sys,'__stderr__')).set_trace(sys._getframe().f_back)