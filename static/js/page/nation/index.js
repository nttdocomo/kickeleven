/**
 * @author nttdocomo
 */
define(function(require){
	require('moment');
	var Base = require('../base'),
	Table = require('../../taurus/panel/table'),
	Competition = require('../../collection/competition'),
	Team = require('../../collection/team'),
	Nation = require('../../model/nation'),
	i18n = require('../../i18n/{locale}');
	return Base.extend({
		events:{
			'click .player-list a':'playerSummary'
		},
		tpl:'<div class="col-lg-3"></div><div class="col-lg-9"></div>',
		initialize:function(options){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.model = new Nation({
				id:options.id
			});
			this.competition = new Competition();
			this.competition.fetch({
				data:{
					nation:options.id
				}
			});
			this.nationTeam = new Team();
			this.nationTeam.fetch({
				data:{
					nation:options.id,
					type:1
				}
			});
			this.competition.fetch({
				data:{
					nation:options.id
				}
			});
			this.listCompetition();
			this.listNationTeam();
		},
		listCompetition:function(){
			var me = this;
			new Table({
				loading:true,
				refreshable:true,
				uiClass:'player-list',
				title:i18n.__('National leagues and cup competition'),
				columns : [{
					text : i18n.__('Competition'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-item-id="'+data.id+'" href="/#competition/'+data.id+'/">'+value+'</a>';
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
				uiClass:'player-list',
				title:i18n.__('National Teams'),
				columns : [{
					text : i18n.__('National Teams'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-item-id="'+data.id+'" href="/#team/'+data.id+'/">'+value+'</a>';
					},
					dataIndex : 'team_name'
				}],
				collection : this.nationTeam,
				renderTo:me.$el.find('.col-lg-3').empty(),
				onRefresh:function(){
					me.collection.fetch();
				}
			});
		}
	});
});
