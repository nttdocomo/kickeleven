/**
 * @author nttdocomo
 */
define(function(require){
	require('moment');
	var Base = require('../base'),
	Table = require('../../taurus/panel/table'),
	Team = require('../../collection/team'),
	Club = require('../../model/club'),
	i18n = require('../../i18n/zh-cn');
	return Base.extend({
		events:{
			'click .player-list a':'playerSummary'
		},
		tpl:'<div class="col-lg-3 flex-height"></div><div class="col-lg-9 flex-height"></div>',
		initialize:function(options){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.model = new Club({
				id:options.id
			});
			this.clubTeam = new Team();
			this.clubTeam.fetch({
				data:{
					club:options.id,
					type:2
				}
			});
			/*this.competition = new Competition();
			this.competition.fetch({
				data:{
					nation:options.id
				}
			});
			this.listCompetition();*/
			this.listNationTeam();
		},
		listCompetition:function(){
			var me = this;
			new Table({
				loading:true,
				refreshable:true,
				uiClass:'player-list flex-height',
				title:i18n.__('National leagues and cup competition'),
				columns : [{
					text : i18n.__('Competition'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-item-id="'+data.id+'" href="/competition/'+data.id+'/">'+value+'</a>';
					},
					dataIndex : 'name'
				}],
				collection : this.competition,
				renderTo:me.$el.find('.col-lg-9').empty(),
				onRefresh:function(){
					me.collection.fetch();
				}
			});
		},
		listNationTeam:function(e){
			var me = this;
			new Table({
				loading:true,
				header:false,
				refreshable:true,
				uiClass:'player-list flex-height',
				title:i18n.__('Club Teams'),
				columns : [{
					text : i18n.__('National Teams'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-item-id="'+data.id+'" href="/team/'+data.id+'/">'+value+'</a>';
					},
					dataIndex : 'team_name'
				}],
				collection : this.clubTeam,
				renderTo:me.$el.find('.col-lg-3').empty(),
				onRefresh:function(){
					me.collection.fetch();
				}
			});
		}
	});
});
