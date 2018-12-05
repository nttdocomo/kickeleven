#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2014-1-23

@author: nttdocomo
'''
import web
import datetime
from sqlalchemy import *
from db.models import BaseModel,AutomapBaseModel,DB_Session,engine
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import class_mapper
from sqlalchemy.types import CHAR, String, Date, DateTime, Boolean, Integer
from sqlalchemy.orm import relationship,backref,object_session
from sqlalchemy.dialects.mysql import TINYINT

metadata = MetaData(bind=engine)

def parseAcceptLanguage(acceptLanguage):
    languages = acceptLanguage.split(",")
    return languages[0].lower()

def _to_api(v):
#    if hasattr(v, 'to_api'):
#        v = v.to_api()
    if isinstance(v, type([])):
        v = [_to_api(x) for x in v]
#    elif isinstance(v, datetime.datetime):
#        v = str(v)
    elif isinstance(v, datetime.date):
        # Convert date/datetime to ms-since-epoch ("new Date()").
        if isinstance(v, datetime.datetime):
            epoch = datetime.datetime(1970, 1, 1)
            # ms = time.mktime(value.utctimetuple())*1000
        else:
            epoch = datetime.date(1970, 1, 1)
            # ms = time.mktime(value.timetuple())*1000
        diff = v - epoch
        ms = (diff.days * 24 * 3600 + diff.seconds) * 1000
        ms += getattr(v, 'microseconds', 0)
        v = int(ms)
    elif isinstance(v, type({})):
        v = dict([(key, _to_api(value)) for (key, value) in v.iteritems()])
    elif isinstance(v, BaseModel):
        v = v.to_api(False)
    return v

class ApiModel(BaseModel): 
    __abstract__ = True
   
    def to_api(self):
        o = {}
        columns = [c.key for c in class_mapper(self.__class__).columns]
        for prop in columns:
            value = getattr(self, prop)
            o[prop] = _to_api(value)
        return o

class Translation(ApiModel):
    __abstract__ = True

    language_code = Column(CHAR(6))
    #version = db.IntegerProperty(verbose_name="版本", default=1)
#     active = db.BooleanProperty(verbose_name="是否激活", default=True)

    def to_api(self):
        o = super(Translation, self).to_api()
        #del o['id']
        #del o['language_code']
        return o

class TranslationModel(ApiModel):
    __abstract__ = True  

    def to_api(self, admin):
        o = super(TranslationModel, self).to_api()
        if admin is None:
            translation = self.get_tranlation()
            if translation is not None:
                id = o['id']
                o.update(translation.to_api())
                o['id'] = id
        return o
    
    def get_language(self):
        return parseAcceptLanguage(web.ctx.env['HTTP_ACCEPT_LANGUAGE'])
    
    def get_tranlation(self,translation):
        session = DB_Session()
        if translation is not None:
            try:
                translation = translation.one()
            except Exception:
                translation = None
        session.close()
        return translation

class Continent(ApiModel):
    __tablename__ = 'continent'

    id = Column(TINYINT(1), primary_key=True, autoincrement=True)
    name = Column(String(14)) # or Column(String(30))
    nation = relationship("Nation")

class Nation(TranslationModel):
    __tablename__ = 'nation'

    id = Column(TINYINT(1), primary_key=True, autoincrement=True)
    name = Column(String(60)) # or Column(String(30))
    continent_id = Column(TINYINT(3), ForeignKey('continent.id'))
    translation = relationship("NationTranslation", backref="nation", lazy="dynamic")
    club = relationship("Club", backref="nation", lazy="dynamic")
    city = relationship("City", backref="nation", lazy="dynamic")

    def get_tranlation(self):
        translation = self.translation.filter(NationTranslation.nation_id == self.id).filter(NationTranslation.language_code==self.get_language())
        return super(Nation, self).get_tranlation(translation)

class NationTranslation(Translation):
    __tablename__ = 'nationtranslation'

    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(60)) # or Column(String(30))
    nation_id = Column(TINYINT(3), ForeignKey('nation.id'))

class City(TranslationModel):
    __tablename__ = 'city'

    id = Column(Integer, primary_key=True, autoincrement=True)
    city_name = Column(String(60))
    nation_id = Column(TINYINT(3), ForeignKey('nation.id'))
    capital = Column(Boolean, default=False)

    def to_api(self,admin=None):
        o = super(TranslationModel, self).to_api()
        o['nation'] = self.nation.to_api(admin)
        #del o['id']
        #del o['language_code']
        return o

    def get_tranlation(self):
        translation = self.translation.filter(CityTranslation.city_id == self.id).filter(CityTranslation.language_code==self.get_language())
        return super(City, self).get_tranlation(translation)

class CityTranslation(Translation):
    __tablename__ = 'citytranslation'

    id = Column(Integer, primary_key=True, autoincrement=True)
    city_name = Column(String(60))
    city_id = Column(Integer, ForeignKey('city.id'))

class CompetitionCategory(ApiModel):
    __tablename__ = 'competition_category'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(20))

class EventsTeams(BaseModel):
    __tablename__ = 'event_team'

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey('events.id'))
    team_id = Column(Integer, ForeignKey('team.id'))
    
class Seasons(ApiModel):
    __tablename__ = 'season'

    id = Column(Integer, primary_key=True, autoincrement=True)
    year = Column(Integer)
    title = Column(CHAR(5))

class Competition(ApiModel):
    __tablename__ = 'competition'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    code = Column(String)
    nation_id = Column(TINYINT(3), ForeignKey('nation.id'))
    
class Events(ApiModel):
    __tablename__ = 'event'

    id = Column(Integer, primary_key=True, autoincrement=True)
    competition_id = Column(Integer, ForeignKey(Competition.id))
    season_id = Column(Integer, ForeignKey(Seasons.id))
    #teams = relationship('Team', secondary=EventsTeams.__table__, backref=backref('events', uselist=False))
    competition = relationship("Competition", foreign_keys="Events.competition_id")
    season = relationship("Seasons", foreign_keys="Events.season_id")
    
    def to_api(self):
        db = DB_Session()
        o = super(Events, self).to_api()
        o['competition'] = self.competition.to_api()
        o['season'] = self.season.to_api()
        db.close()
        return o

class Round(ApiModel):
    __tablename__ = 'round'

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey(Events.id))
    name = Column(String(50))
    round = Column(Integer)
    start_at = Column(Date)
    end_at = Column(Date)
    event = relationship("Events", foreign_keys="Round.event_id")

class Club(TranslationModel):
    __tablename__ = 'club'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60)) # or Column(String(30))
    foundation = Column(Date())
    nation_id = Column(TINYINT(3), ForeignKey('nation.id'))
    logo_id = Column(Integer)
    home_kit = Column(CHAR(45))
    away_kit = Column(CHAR(45))
    third_kit = Column(CHAR(45))
    translation = relationship('ClubTranslation', backref="club_ref", lazy="dynamic")
    
    def to_api(self, admin):
        db = DB_Session()
        o = super(Club, self).to_api(admin)
        nation = self.nation
        try:
            o['nation'] = nation.to_api(admin)
        except Exception,e:
            o['nation'] = None
        db.close()
        return o

    def get_tranlation(self):
        translation = self.translation.filter(ClubTranslation.club == self.id).filter(ClubTranslation.language_code==self.get_language())
        return super(Club, self).get_tranlation(translation)

class ClubTranslation(Translation):
    __tablename__ = 'clubtranslation'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60)) # or Column(String(30))
    club = Column(TINYINT(10), ForeignKey('club.id'))

class Team(ApiModel):
    __tablename__ = 'team'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(15))
    event_standing_entry = relationship("EventStandingEntries", uselist=False, back_populates="team")
    teamplayer = relationship("TeamPlayer", backref="team", cascade='all, delete-orphan')
    
    def to_api(self,admin):
        db = DB_Session()
        o = super(Team, self).to_api()
        db.close()
        return o
    
    @property
    def competition(self):
        query = object_session(self).query(Competition).with_parent(self,'competitions')
        return query.first()

class EventStandings(ApiModel):
    __tablename__ = 'event_standings'

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey(Events.id))
    event_standing_entries = relationship("EventStandingEntries")
    
    def to_api(self,admin):
        db = DB_Session()
        o = super(EventStandings, self).to_api()
        o['event_standing_entries'] = [v.to_api() for v in self.event_standing_entries]
        db.close()
        return o

class EventStandingEntries(ApiModel):
    __tablename__ = 'event_standing_entries'

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_standing_id = Column(Integer, ForeignKey(EventStandings.id))
    team_id = Column(Integer, ForeignKey(Team.id))
    pos = Column(TINYINT(3))
    played = Column(TINYINT(3))
    won = Column(TINYINT(3))
    drawn = Column(TINYINT(3))
    lost = Column(TINYINT(3))
    goals_for = Column(TINYINT(3))
    goals_against = Column(TINYINT(3))
    pts = Column(Integer, default = 0)
    team = relationship("Team", back_populates="event_standing_entry")
    
    def to_api(self,admin):
        db = DB_Session()
        o = super(EventStandingEntries, self).to_api()
        o['team'] = self.team.to_api(admin)
        db.close()
        return o

class TeamPlayer(ApiModel):
    __tablename__ = 'teamplayer'

    id = Column(Integer, primary_key=True, autoincrement=True)
    team_id = Column(Integer, ForeignKey('team.id'))
    player_id = Column(Integer, ForeignKey('player.id'))
    event_id = Column(Integer, ForeignKey('event.id'))
    player = relationship("Player", backref="teamplayer")
    
    def to_api(self,admin):
        db = DB_Session()
        o = super(TeamPlayer, self).to_api()
        o['player'] = self.player.to_api(admin)
        o['team'] = self.team.to_api(admin)
        db.close()
        return o

class Nationality(ApiModel):
    __tablename__ = 'nationality'

    id = Column(Integer, primary_key=True, autoincrement=True)
    country_id = Column(Integer, ForeignKey('nation.id'))
    player_id = Column(Integer, ForeignKey('player.id'))
    player = relationship("Player", backref="nationlayer")
    nation = relationship("Nation", backref="nationlayer")
    
    def to_api(self,admin):
        db = DB_Session()
        o = super(TeamPlayer, self).to_api()
        o['player'] = self.player.to_api(admin)
        o['nation'] = self.nation.to_api(admin)
        db.close()
        return o

class PlayerPosition(BaseModel):
    __tablename__ = 'player2position'

    id = Column(Integer, primary_key=True, autoincrement=True)
    player_id = Column(Integer, ForeignKey('player.id'), primary_key=True)
    position_id = Column(Integer, ForeignKey('position.id'), primary_key=True)
    position_child = relationship("Position", backref="player2position")

class Player(TranslationModel):
    __tablename__ = 'player'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60)) # or Column(String(30))
    date_of_birth = Column(Date())
    height = Column(TINYINT(3))
    weight = Column(TINYINT(4))
    foot = Column(CHAR(5))
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.datetime.now, default=datetime.datetime.now)
    translation = relationship('PlayerTranslation', backref="player_ref", lazy="dynamic")
    player2position = relationship("PlayerPosition", backref="player_ref", cascade='all, delete-orphan')
    transfer = relationship("Transfer", backref="player_ref", cascade='all, delete-orphan')
    
    __mapper_args__ = {
        "order_by":"name"
    }
    
    def to_api(self, admin):
        o = super(Player, self).to_api(admin)
        db = DB_Session()
        nation = db.query(Nation).join(Nationality, Nation.id == Nationality.country_id).join(Player, Player.id == Nationality.player_id).filter(Player.id == self.id).all()
        try:
            o['nationality'] = _to_api(nation)
        except Exception,e:
            o['nation'] = None
        del o['created_at']
        del o['updated_at']
        db.close()
        return o

    def get_tranlation(self):
        translation = self.translation.filter(PlayerTranslation.player == self.id).filter(PlayerTranslation.language_code==self.get_language())
        return super(Player, self).get_tranlation(translation)

class PlayerTranslation(Translation):
    __tablename__ = 'playertranslation'

    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(60)) # or Column(String(30))
    short_name = Column(String(30)) # or Column(String(30))
    player = Column(TINYINT(3), ForeignKey('player.id'))

class Position(ApiModel):
    __tablename__ = 'position'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30)) # or Column(String(30))
    
    __mapper_args__ = {
        "order_by":["name"]
    }

class Transfer(ApiModel):
    __tablename__ = 'transfer'

    id = Column(Integer, primary_key=True, autoincrement=True)
    taking_team_id = Column(Integer, ForeignKey(Team.id)) # or Column(String(30))
    releasing_team_id = Column(Integer, ForeignKey(Team.id)) # or Column(String(30))
    player_id = Column(Integer, ForeignKey(Player.id))
    season = Column(Integer)
    transfer_date = Column(Date())
    transfer_sum = Column(Integer)
    contract_period = Column(Date())
    loan = Column(CHAR(3))
    player = relationship("Player", foreign_keys="Transfer.player_id")
    taking_team = relationship("Team", foreign_keys="Transfer.taking_team_id")
    releasing_team = relationship("Team", foreign_keys="Transfer.releasing_team_id")
    
    __mapper_args__ = {
        "order_by":["-transfer_date"]
    }
    
    def to_api(self):
        o = super(Transfer, self).to_api()
        db = DB_Session()
        o['releasing_team'] = self.releasing_team.to_api(None)
        o['taking_team'] = self.taking_team.to_api(None)
        o['player'] = self.player.to_api(None)
        db.close()
        return o

class Match(ApiModel):
    __tablename__ = 'match'

    id = Column(Integer, primary_key=True, autoincrement=True)
    round_id = Column(Integer, ForeignKey(Round.id))
    team1_id = Column(Integer, ForeignKey(Team.id)) # or Column(String(30))
    team2_id = Column(Integer, ForeignKey(Team.id)) # or Column(String(30))
    play_at = Column(DateTime)
    score1 = Column(TINYINT(2))
    score2 = Column(TINYINT(2))
    team1 = relationship("Team", foreign_keys="Match.team1_id")
    team2 = relationship("Team", foreign_keys="Match.team2_id")
    round = relationship("Round", foreign_keys="Match.round_id")
    
    __mapper_args__ = {
        "order_by":["play_at"]
    }
    
    def to_api(self, admin):
        o = super(Match, self).to_api()
        o['team1'] = self.team1.to_api(admin)
        o['team2'] = self.team2.to_api(admin)
        if self.round is not None:
            o['round'] = self.round.to_api()
        return o
    
class MatchEvents(ApiModel):
    __tablename__ = 'match_events'

    id = Column(Integer, primary_key=True, autoincrement=True)
    player_id = Column(Integer, ForeignKey(Player.id))
    match_id = Column(Integer, ForeignKey(Match.id))
    team_id = Column(Integer, ForeignKey(Team.id)) # or Column(String(30))
    minute = Column(TINYINT(3))
    offset = Column(TINYINT(2))
    match = relationship("Match", foreign_keys="MatchEvents.match_id")
    team = relationship("Team", foreign_keys="MatchEvents.team_id")
    player = relationship("Player", foreign_keys="MatchEvents.player_id")
    
    __mapper_args__ = {
        "order_by":["minute"]
    }
    
    def to_api(self):
        o = super(MatchEvents, self).to_api()
        o['player'] = self.player.to_api(None)
        o['team'] = self.team.to_api(None)
        return o

class MatchPlayerStatistics(ApiModel):
    __table__ = Table('match_player_statistics', metadata, autoload=True)
    
    def to_api(self):
        o = super(MatchPlayerStatistics, self).to_api()
        db = DB_Session()
        o['player'] = db.query(Player).get(self.playerId).to_api(None)
        db.close()
        return o

#class MatchPlayerStatistics(AutomapApiModel):
#    __tablename__ = 'match_player_statistics'

class Goals(ApiModel):
    __tablename__ = 'goal_events'

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey(MatchEvents.id))
    penalty = Column(Boolean,default=False)
    owngoal = Column(Boolean,default=False)
    event = relationship("MatchEvents", backref=backref("goal", uselist=False), foreign_keys="Goals.event_id")