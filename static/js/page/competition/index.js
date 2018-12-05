/**
 * @author nttdocomo
 */
define(function(require){
	require('moment');
	var Base = require('../base'),
	Table = require('../../taurus/classic/panel/table'),
	Event = require('../../model/event'),
	EventStanding = require('../../model/event_standing'),
	EventStandingEntries = require('../../collection/event_standing_entry'),
	Team = require('../../collection/team'),
	Match = require('../../collection/match'),
	Fixture = require('../../collection/fixture'),
	Goal = require('../../collection/goal'),
	Nation = require('../../model/nation'),
	ProfileSidebar = require('../../view/competitionProfileSidebar'),
	moment = require('moment'),
	i18n = require('../../taurus/i18n');
	return Base.extend({
		events:{
			'click .player-list a':'playerSummary'/*,
			'click .results-table tr':function(e){
				var goals = new Goal(),
				$target = $(e.currentTarget),
				id = $target.attr('data-item-id'),
				result =this.results.get(id);
				if($target.hasClass('expand')){
					$target.removeClass('expand');
					$target.nextAll('[data-match-id]').remove();
				} else {
					goals.fetch({
						data:{
							match:id
						},
						success:function(collection){
							$target.after(collection.map(function(model){
								var goals_info = '<img class="" src="/images/players/20_20/<%=player.id%>.png" alt="<%=player.name%>">';
								if(model.get('owngoal')){
									goals_info += '(OG)';
								}
								return _.template('<tr data-match-id="'+result.id+'"><td></td><td>'+(model.get('team_id') == result.get('team1_id') ? goals_info:'')+'</td><td><%=minute%></td><td>'+(model.get('team_id') == result.get('team2_id') ? goals_info:'')+'</td></tr>',model.toJSON())
							}).join('')).addClass('expand');
						}
					});
				}
			}*/
		},
		tpl:'<div class="col-lg-2"></div><div class="col-lg-3"></div></div><div class="col-lg-3"></div><div class="col-lg-4 flex-height"></div>',
		initialize:function(options){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.model = new Event();
			this.model.fetch({
				data:{
					competition:options.id
				},
				success:_.bind(function(model){
					document.title = model.get('competition').name;
					new ProfileSidebar({
						model:model,
						renderTo:me.$el.find('.col-lg-2')
					});
					this.listTeam(model);
					this.listFixtures(model);
					this.listResults(model)
				},this),
			});

		},
		listResults:function(model){
			var me = this,
			collection = new Match();
			collection.fetch({
				data:{
					'event':this.model.id,
					'limit':20,
					'results':1
				}
			});
			new Table({
				loading:true,
				hideHeaders:true,
				rowTemplate:'<tr data-item-id="<%=id%>">',
				refreshable:true,
				header:false,
				uiClass:'results-table flex-height',
				title:i18n.__('Results'),
				columns : [{
					text : i18n.__('Date'),
					width:60,
					renderer : function(value,data) {
						return '<span title="' + moment(value).format(i18n.__('MMM DD, YYYY HH:mm')) + '">' + moment(value).format(i18n.__('MMM DD, HH:mm')) + '</span>';
					},
					dataIndex : 'play_at'
				},{
					text : i18n.__('Home'),
					align:'right',
					renderer : function(value,data) {
						return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'">'+value.name+'</a>';
					},
					dataIndex : 'team1'
				},{
					text : i18n.__('Home'),
					align:'right',
					width:36,
					renderer : function(value,data) {
						return '<img src="/images/team/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/>';
					},
					dataIndex : 'team1'
				},{
					text : i18n.__('Result'),
					width:50,
					align:'center',
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						return '<a href="/match/'+record.id+'/">'+[record.get('score1') !== null ? record.get('score1') : '0',record.get('score2') !== null ? record.get('score2') : '0'].join(':')+'</a>';
					},
					dataIndex : 'team2'
				},{
					text : i18n.__('Away'),
					align:'left',
					width:36,
					renderer : function(value,data) {
						return '<img src="/images/team/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/>';
					},
					dataIndex : 'team2'
				},{
					text : i18n.__('Away'),
					align:'left',
					renderer : function(value,data) {
						return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'">'+value.name+'</a>';
					},
					dataIndex : 'team2'
				}],
				collection : collection,
				renderTo:me.$el.find('.col-lg-3:eq(0)')
			});
		},
		listFixtures:function(model){
			var me = this,
			matchs = new Fixture();
			matchs.fetch({
				data:{
					'event':this.model.id,
					'limit':20
				}
			});
			new Table({
				loading:true,
				hideHeaders:true,
				refreshable:true,
				header:false,
				uiClass:'player-list flex-height',
				title:i18n.__('Fixtures'),
				columns : [{
					text : i18n.__('Date'),
					renderer : function(value,data) {
						return '<span title="' + moment(value).format(i18n.__('MMM DD, HH:mm')) + '">' + moment(value).format(i18n.__('MMM DD, HH:mm')) + '</span>';
					},
					dataIndex : 'play_at'
				},{
					text : i18n.__('Home'),
					renderer : function(value,data) {
						return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'"><img src="/images/team/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/></a>';
					},
					dataIndex : 'team1'
				},{
					text : '',
					renderer : function(value,data) {
						return 'vs'
					},
					dataIndex : 'team2'
				},{
					text : i18n.__('Away'),
					renderer : function(value,data) {
						return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'"><img src="/images/team/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/></a>';
					},
					dataIndex : 'team2'
				}],
				collection : matchs,
				renderTo:me.$el.find('.col-lg-3:eq(1)').empty()
			});
		},
		listTeam:function(model){
			var me = this;
			event_standing_entries = new EventStandingEntries();
			event_standing_entries.fetch({
				data:{
					'event':this.model.id
				}
			});
			new Table({
				loading:true,
				refreshable:true,
				uiClass:'player-list flex-height',
				title:i18n.__('League Table'),
				columns : [{
					text : i18n.__('Team'),
					renderer : function(fieldValue, cellValues, record) {
						return '<a data-item-id="'+fieldValue.id+'" href="/team/'+fieldValue.id+'/">'+fieldValue.name+'</a>';
					},
					dataIndex : 'team'
				},{
					text : i18n.__('Played'),
					width:40,
					dataIndex : 'played'
				},{
					text : i18n.__('W'),
					width:40,
					dataIndex : 'won'
				},{
					text : i18n.__('D'),
					width:40,
					dataIndex : 'drawn'
				},{
					text : i18n.__('L'),
					width:40,
					dataIndex : 'lost'
				},{
					text : i18n.__('GF'),
					width:40,
					dataIndex : 'goals_for'
				},{
					text : i18n.__('GA'),
					width:40,
					dataIndex : 'goals_against'
				},{
					text : i18n.__('+/-'),
					width:40,
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						var goals_for = record.get('goals_for'),
						goals_against = record.get('goals_against');
						if(goals_for !== null && goals_against !== null){
							return goals_for - goals_against;
						}
						return '-';
					},
					dataIndex : 'goals_for'
				},{
					text : i18n.__('Pts'),
					width:40,
					dataIndex : 'pts'
				}],
				collection : event_standing_entries,
				renderTo:me.$el.find('>.col-lg-4')
			});
		}
	});
});
