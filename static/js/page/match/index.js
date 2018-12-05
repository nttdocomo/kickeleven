/**
 * @author nttdocomo
 */
define(function(require){
	require('moment');
	var Base = require('../base'),
	Table = require('../../taurus/panel/table'),
	Panel = require('../../taurus/panel/panel'),
	i18n = require('../../taurus/i18n'),
	Overview = require('../../view/matchOverview'),
	Match = require('../../model/match'),
	Player = require('../../model/player'),
	Backbone = require('backbone'),
	MatchPlayerStatistics = require('../../collection/matchPlayerStatistics'),
	MatchPlayerStatistic = require('../../model/matchPlayerStatistics'),
	Column = require('../../layout/column'),
	Row = require('../../layout/row'),
	Media = require('../../view/playerOfMatchMedia');
	return Base.extend({
		events:{
			'click .js-action-profile-name':'playerProfileDialog'
		},
		//tpl:'<div class="col-lg-4"></div><div class="col-lg-8 flex-height"><div class="row row-5"><div class="col-lg-12"></div></div><div class="row row-5"><div class="col-lg-12"></div></div></div>',
		initialize:function(options){
			var me = this,match = new Match({
				id:options.id
			}),
			playerOfMatch = new MatchPlayerStatistic(),
			matchPlayerStatistics = new MatchPlayerStatistics(),
			team1Statistics = new Backbone.Collection(),
			team2Statistics = new Backbone.Collection(),
			columns = [{
				text : i18n.__('Name'),
				renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
					return fieldValue.name;
				},
				dataIndex : 'player'
			},{
				text : i18n.__('Shots'),
				dataIndex : 'shotsTotal'
			},{
				text : i18n.__('ShotsOT'),
				dataIndex : 'shotOnTarget'
			},{
				text : i18n.__('KeyPasses'),
				dataIndex : 'keyPassTotal'
			},{
				text : i18n.__('PA%'),
				dataIndex : 'passSuccessInMatch'
			},{
				text : i18n.__('AerialsWon'),
				dataIndex : 'duelAerialWon'
			},{
				text : i18n.__('Touches'),
				dataIndex : 'touches'
			},{
				text : i18n.__('Shots'),
				dataIndex : 'shotsTotal'
			},{
				text : i18n.__('ShotOT'),
				dataIndex : 'shotOnTarget'
			},{
				text : i18n.__('KeyPasses'),
				dataIndex : 'keyPassTotal'
			},{
				text : i18n.__('Dribbles'),
				dataIndex : 'dribbleTotal'
			},{
				text : i18n.__('Fouled'),
				dataIndex : 'foulGiven'
			},{
				text : i18n.__('Offsides'),
				dataIndex : 'offsideGiven'
			},{
				text : i18n.__('Disp'),
				dataIndex : 'dispossessed'
			},{
				text : i18n.__('UnsTouches'),
				dataIndex : 'turnover'
			},{
				text : i18n.__('TotalTackles'),
				dataIndex : 'tackleTotalAttempted'
			},{
				text : i18n.__('Interceptions'),
				dataIndex : 'interceptionAll'
			},{
				text : i18n.__('Clearances'),
				dataIndex : 'clearanceTotal'
			},{
				text : i18n.__('BlockedShots'),
				dataIndex : 'shotBlocked'
			},{
				text : i18n.__('Fouls'),
				dataIndex : 'foulCommitted'
			},{
				text : i18n.__('Rating'),
				dataIndex : 'rating'
			}]
			this.match = match;
			this.items = [{
				cls:Column,
				scale:4,
				items:[{
					cls:Panel,
					title:'Overview',
					items:[{
						cls:Overview,
						model:match
					},{
						cls:Media,
						model:playerOfMatch
					}]
				}]
			},{
				cls:Column,
				scale:8,
				uiClass:'flex-height',
				items:[{
					cls:Row,
					uiClass:'row-5',
					items:[{
						cls:Column,
						items:[{
							cls:Table,
							uiClass:'flex-height',
							title:'',//this.match.get('team1').team_name,
							columns : columns,
							collection : team1Statistics,
						}]
					}]
				},{
					cls:Row,
					uiClass:'row-5',
					items:[{
						cls:Column,
						items:[{
							cls:Table,
							uiClass:'flex-height',
							title:'',//this.match.get('team1').team_name,
							columns : columns,
							collection : team2Statistics,
						}]
					}]
				}]
			}]
			Base.prototype.initialize.apply(this,arguments);
			var team1 = this.items[1].items[0].items[0].items[0],
			team2 = this.items[1].items[1].items[0].items[0],
			media = this.items[0].items[0].items[1];
			matchPlayerStatistics.on('sync',function(collection){
				team1Statistics.reset(collection.filter(function(model){
					return model.get('teamId') == me.match.get('team1').id
				}))
				team2Statistics.reset(collection.filter(function(model){
					return model.get('teamId') == me.match.get('team2').id
				}))
				media.model = collection.find(function(model){
					return model.get('isManOfTheMatch')
				})
				media.renderHtml();
			});
			team1Statistics.comparator = team2Statistics.comparator = 'positionOrder';
			match.fetch({
				success:function(model){
					matchPlayerStatistics.fetch({
						url:'/api/match_player_statistics/',
						data:{
							match:model.id
						}
					});
					team1.setTitle(model.get('team1').name)
					team2.setTitle(model.get('team2').name)
					//me.player_of_the_match();
				}
			});
			//this.overview();
		}
	});
});
