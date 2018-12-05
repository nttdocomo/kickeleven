/**
 * @author nttdocomo
 */
define(function(require){
	require('taurus/moment');
	var Base = require('./base'),
	Table = require('../taurus/panel/table'),
	Column = require('../layout/column'),
	Player = require('../collection/player'),
	Match = require('../collection/match'),
	i18n = require('../taurus/i18n'),
	_ = require('underscore'),
	player = new Player;
	return Base.extend({
		events:{
			'click .player-list a':'playerProfileDialog'
		},
		items:[{
			cls:Column,
			uiClass:'col-lg-12',
			items:[{
				cls:Table,
				loading:true,
				header:false,
				refreshable:true,
				uiClass:'player-list flex-height',
				title:i18n.__('Player'),
				columns : [{
					text : i18n.__('Name'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-player-id="'+data.id+'" href="/#player/'+data.id+'/">'+value+'</a>';
					},
					dataIndex : 'name'
				}, {
					text : i18n.__('Nation'),
					sortable : true,
					width:200,
					renderer : function(value) {
						var result = [];
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
					text : i18n.__('Age'),
					sortable : true,
					width:50,
					renderer : function(value) {
						return taurus.Date.getAge(value, 'yyyy-mm-dd');
					},
					dataIndex : 'date_of_birth'
				}],
				collection : player,
				onRefresh:function(){
					this.collection.fetch();
				},
				pager:true
			}]
		}],
		//tpl:'<div class="col-lg-12"></div>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			//this.listMatch();
			//this.listPlayer();
			player.fetch();
		},
		playerProfileDialog:function(e){
			var me = this;
			require.async(['../widget/playerProfilePopDialog'],function(Dialog){
				var model = me.player.get($(e.currentTarget).attr('data-player-id'));
				(new Dialog({
					width:590,
					title:i18n.__('Personal Profile'),
					model:model,
					renderTo:taurus.$body
				})).show();
				model.fetch();
			});
			return false;
		}
	});
});
