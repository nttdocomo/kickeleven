#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-6-1

@author: nttdocomo
'''
import web
import datetime
from db.models import BaseModel,sql_session
from sqlalchemy import Column
from sqlalchemy.types import String, DateTime, Text

# session
class WebpySession(BaseModel):
    '''webpy的session表'''
    __tablename__ = 'sessions'
    
    session_id = Column(String(128), primary_key=True)
    atime = Column(DateTime, nullable=False, default=datetime.datetime.now)
    data = Column(Text, nullable=True)

#webpy的session是有bug的，这里修复
class Session(web.session.Session):
    '''修复webpy的session过期时间无效的bug'''
    def _setcookie(self, session_id, expires='', **kw):
        if expires == '':
            expires = self._config.timeout
        super(Session, self)._setcookie(session_id, expires, **kw)

class SQLAStore(web.session.Store):
    '''webpy的session存储在sqlalchemy中的接口'''
    def __init__(self):
        self.table = WebpySession.__table__

    def __contains__(self, key):
        return bool(sql_session.execute(self.table.select(self.table.c.session_id==key)).fetchone())

    def __getitem__(self, key):
        s = sql_session.execute(self.table.select(self.table.c.session_id==key)).fetchone()
        if s is None:
            raise KeyError
        else:
            sql_session.execute(self.table.update().values(atime=datetime.datetime.now()).where(self.table.c.session_id==key))
            return self.decode(s[self.table.c.data])

    def __setitem__(self, key, value):
        pickled = self.encode(value)
        if key in self:
            sql_session.execute(self.table.update().values(data=pickled).where(self.table.c.session_id==key))
        else:
            sql_session.execute(self.table.insert().values(session_id=key, data=pickled))
        sql_session.commit()

    def __delitem__(self, key):
        sql_session.execute(self.table.delete(self.table.c.session_id==key))

    def cleanup(self, timeout):
        timeout = datetime.timedelta(timeout/(24.0*60*60))
        last_allowed_time = datetime.datetime.now() - timeout
        sql_session.execute(self.table.delete(self.table.c.atime<last_allowed_time))