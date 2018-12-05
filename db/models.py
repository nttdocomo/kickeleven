#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-6-1

@author: nttdocomo
'''
import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,scoped_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import exc
from sqlalchemy import event
from sqlalchemy.pool import Pool

@event.listens_for(Pool, "checkout")
def ping_connection(dbapi_connection, connection_record, connection_proxy):
    cursor = dbapi_connection.cursor()
    try:
        cursor.execute("SELECT 1")
    except:
        # optional - dispose the whole pool
        # instead of invalidating one at a time
        # connection_proxy._pool.dispose()

        # raise DisconnectionError - pool will try
        # connecting again up to three times before raising.
        raise exc.DisconnectionError()
    cursor.close()

DB_CONNECT_STRING = 'mysql+mysqldb://%s%s@%s/%s?charset=utf8' % (settings.DATABASE_USERNAME, settings.DATABASE_PASSWORD, settings.DATABASE_HOST,settings.DATABASE_NAME)
engine = create_engine(DB_CONNECT_STRING, echo_pool=True)
DB_Session = sessionmaker(bind=engine,expire_on_commit=False)
sql_session = scoped_session(sessionmaker(bind=engine))

Base = declarative_base()
AutomapBase = automap_base()

class BaseModel(Base):
    __abstract__ = True
    __table_args__ = { # 可以省掉子类的 __table_args__ 了
        'mysql_engine': 'InnoDB',
        'mysql_charset': 'utf8'
    }
class AutomapBaseModel(AutomapBase):
    __abstract__ = True
    __table_args__ = { # 可以省掉子类的 __table_args__ 了
        'mysql_engine': 'InnoDB',
        'mysql_charset': 'utf8'
    }
    
AutomapBase.prepare(engine, reflect=True)