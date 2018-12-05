/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../base'),
	Table = require('../../taurus/classic/panel/table'),
	Panel = require('../../taurus/classic/panel/panel'),
	Teams = require('../../collection/team'),
	Players = require('../../collection/player'),
	Team = require('../../model/team'),
	Club = require('../../model/club'),
	Player = require('../../model/player'),
	Transfer = require('../../collection/transfer'),
	Fixture = require('../../collection/fixture'),
	Result = require('../../collection/result'),
	RecentTransfer = require('../../view/recentTransfer'),
	ProfileSidebar = require('../../view/profileSidebar'),
	i18n = require('../../taurus/i18n'),
	Backbone = require('backbone'),
	moment = require('moment');
	return Base.extend({
		events:{
			'click .js-action-profile-name':'playerProfileDialog'
		},
		tpl:'<div class="col-lg-2"></div><div class="col-lg-3 flex-height"></div><div class="col-lg-4 flex-height"></div><div class="col-lg-3"></div>',
		initialize:function(options){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.model = new Team({
				id:options.id
			});
			this.model.fetch({
				success:function(model){
					model.set('club',new Club(model.get('owner')));
					document.title = model.get('name');
					new ProfileSidebar({
						model:model,
						uiClass:'text-center',
						renderTo:me.$el.find('.col-lg-2:eq(0)')
					});
					me.listMatchs(model);
					//me.listResults(model);
				}
			});
			this.squad = new Players();
			this.squad.setPageSize(37,{
				data:{
					team:options.id
				}
			})
			this.listSquad();
			this.recentTransfer();
		},
		listMatchs:function(model){
			var me = this;
			matchs = new Fixture();
			matchs.fetch({
				data:{
					'team':this.model.id
				}
			});
			new Table({
				loading:true,
				hideHeaders:true,
				refreshable:true,
				uiClass:'player-list flex-height',
				title:i18n.__('Fixtures'),
				columns : [{
					text : i18n.__('Date'),
					renderer : function(value,data) {
						return moment(value).format('MMM DD HH:mm:SS');
					},
					dataIndex : 'play_at'
				},{
					text : i18n.__('H/A'),
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						return fieldValue.id == me.model.id ? 'H' : 'A'
					},
					dataIndex : 'team1'
				},{
					text : i18n.__('Result'),
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						if(_.isNull(fieldValue)){
							return '-'
						}
						var score;
						if(record.get('team1_id') == me.model.id){
							score = [record.get('score1'),record.get('score2')].join(':');
						} else {
							score = [record.get('score2'),record.get('score1')].join(':');
						}
						return '<a href="/match/'+record.id+'/">'+score+'</a>';
					},
					dataIndex : 'score1'
				},{
					text : i18n.__('Team'),
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						var team = fieldValue.id != me.model.id ? fieldValue : record.get('team1');
						return '<a data-item-id="'+team.id+'" href="/team/'+team.id+'/"><img src="'+config.resource + 'team/20/' + team.id + config.imgsuffix + '" alt="'+team.name+'" height="20" width="20"/> '+team.name+'</a>';
					},
					width:200,
					dataIndex : 'team2'
				}],
				collection : matchs,
				renderTo:me.$el.find('.col-lg-3:eq(0)'),
				onRefresh:function(){
					me.collection.fetch();
				}
			});
		},
		listResults:function(model){
			var me = this;
			matchs = new Result();
			matchs.fetch({
				data:{
					'team':this.model.id,
					limit:10
				}
			});
			new Table({
				loading:true,
				hideHeaders:true,
				refreshable:true,
				uiClass:'player-list flex-height',
				title:i18n.__('Fixtures'),
				columns : [{
					text : i18n.__('Date'),
					renderer : function(value,data) {
						return moment(value).format('MMM DD');
					},
					dataIndex : 'play_at'
				},{
					text : i18n.__('H/A'),
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						return fieldValue.id == me.model.id ? 'H' : 'A'
					},
					dataIndex : 'team1'
				},{
					text : i18n.__('Result'),
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						var score;
						if(record.get('team1_id') == me.model.id){
							score = [record.get('score1'),record.get('score2')].join(':');
						} else {
							score = [record.get('score2'),record.get('score1')].join(':');
						}
						return '<a href="/match/'+record.id+'/">'+score+'</a>';
					},
					dataIndex : 'score1'
				},{
					text : i18n.__('Team'),
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						var team = fieldValue.id != me.model.id ? fieldValue : record.get('team1');
						return '<a data-item-id="'+team.id+'" href="/team/'+team.id+'/"><img src="/images/team/20_20/'+team.id +'.png" alt="'+team.name+'" height="20" width="20"/> '+team.name+'</a>';
					},
					dataIndex : 'team2'
				}],
				collection : matchs,
				renderTo:me.$el.find('.col-lg-3:eq(0) > .row:eq(1) > .col-lg-12'),
				onRefresh:function(){
					me.collection.fetch();
				}
			});
		},
		recentTransfer:function(){
			var taking_transfer = new Transfer();
			taking_transfer.setPageSize(6,{
				data:{
					taking_team:this.model.id
				}
			})
			/*taking_transfer.fetch({
				data:{
					taking_team:this.model.id
				}
			});*/
			new Panel({
				uiClass:'flex-height',
				title:'Recent Tranfer',
				items:[{
					'class':RecentTransfer,
					collection : taking_transfer
				}],
				renderTo:this.$el.find('.col-lg-3:eq(1)')
			});
		},
		listSquad:function(e){
			var me = this;
			new Table({
				loading:true,
				header:false,
				refreshable:true,
				uiClass:'player-list flex-height',
				title:i18n.__('Squad'),
				columns : [{
					text : i18n.__('Name'),
					flex : 1,
					sortable : false,
					renderer : function(fieldValue, cellValues, record, recordIndex, fullIndex) {
						return '<a data-player-id="'+record.id+'" href="/#player/'+record.id+'/" class="js-action-profile-name">'+fieldValue+'</a>';
					},
					width:200,
					dataIndex : 'name'
				}, {
					text : i18n.__('Nation'),
					sortable : true,
					width:200,
					renderer : function(value) {
						if(value){
							return _.map(value,function(nation){
								return nation.name
							}).join('/');
						} else {
							return '-';
						}
					},
					dataIndex : 'nationality'
				}, {
					text : i18n.__('Height'),
					sortable : true,
					width:50,
					dataIndex : 'height'
				}, {
					text : '年龄',
					sortable : true,
					width:50,
					renderer : function(value) {
						return taurus.Date.getAge(value, 'yyyy-mm-dd');
					},
					dataIndex : 'date_of_birth'
				}],
				collection : this.squad,
				renderTo:me.$el.find('.col-lg-4').empty(),
				onRefresh:function(){
					me.collection.fetch();
				}
			});
		},
		playerProfileDialog:function(e){
			var me = this;
			require.async(['../../widget/playerProfilePopDialog'],function(Dialog){
				var id = $(e.currentTarget).attr('data-player-id'),
				model = me.squad.get(id);
				if(!model){
					model = new Player({
						id:id
					});
				}
				model.fetch({
					success:function(){
						(new Dialog({
							width:590,
							title:i18n.__('Personal Profile'),
							model:model,
							renderTo:taurus.$body
						})).show();
					}
				});
			});
			return false;
		}
	});
});
