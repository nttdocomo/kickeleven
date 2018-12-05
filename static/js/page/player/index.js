/**
 * @author nttdocomo
 */
define(function(require){
	require('moment');
	var Base = require('../base'),
	PersonalDetail = require('../../panel/PersonalDetail'),
	Table = require('../../taurus/panel/table'),
	Transfer = require('../../collection/transfer'),
	i18n = require('../../i18n/{locale}'),
	Player = require('../../model/player');
	return Base.extend({
		events:{
			'click .js-action-profile-name':'playerProfileDialog'
		},
		tpl:'<div class="col-lg-3"></div><div class="col-lg-6 flex-height"></div><div class="col-lg-3"></div>',
		initialize:function(options){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.player = new Player({
				id:options.id
			});
			this.playerDetail()
			this.transfer()
			this.player.fetch({
				url:'/api/personal_detail/',
				data:{
					id:options.id
				}
			});
		},
		playerDetail:function(){
			new PersonalDetail({
				model:this.player,
				renderTo:this.$el.find('.col-lg-3:eq(0)')
			})
		},
		transfer:function(){
			var collection = new Transfer();
			this.player.set('transfer',collection);
			collection.fetch({
				data:{
					player:this.player.id
				}
			});
			new Table({
				title:'Transfer History',
				loading:true,
				columns : [{
					text : i18n.__('Season'),
					dataIndex : 'season'
				}, {
					text : i18n.__('Release Team'),
					renderer : function(value,data) {
						return value.team_name;
					},
					dataIndex : 'releasing_team'
				}, {
					text : i18n.__('Take Team'),
					renderer : function(value,data) {
						return value.team_name;
					},
					dataIndex : 'taking_team'
				}, {
					text : i18n.__('Loan'),
					dataIndex : 'loan'
				}, {
					text : i18n.__('Transfer Date'),
					renderer : function(value,data) {
						return moment(value).format('YYYY-MM-DD');
					},
					dataIndex : 'transfer_date'
				}],
				collection : collection,
				renderTo:this.$el.find('> .col-lg-6')
			});
		}
	});
});
