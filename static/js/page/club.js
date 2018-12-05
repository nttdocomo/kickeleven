/**
 * @author nttdocomo
 */
define(function(require){
	require('moment');
	var Base = require('./base'),
	Table = require('../taurus/panel/table'),
	Club = require('../collection/club'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		tpl:'<div class="col-lg-12"></div>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.listClub();
		},
		listClub:function(){
			var me = this;
			me.collection = new Club;
			me.collection.pager();
			new Table({
				loading:true,
				header:false,
				refreshable:true,
				uiClass:'player-list',
				title:i18n.__('Club'),
				columns : [{
					text : i18n.__('Club Name'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-item-id="'+data.id+'" href="/club/'+data.id+'/">'+value+'</a>';
					},
					dataIndex : 'name'
				}, {
					text : i18n.__('Nation'),
					sortable : true,
					width:200,
					renderer : function(value) {
						var result = [];
						if(value){
							return value.short_name;
						} else {
							return '-';
						}
					},
					dataIndex : 'nation'
				}],
				collection : me.collection,
				renderTo:me.$el.find('.col-lg-12').empty(),
				onRefresh:function(){
					me.collection.fetch();
				},
				pager:true
			});
			//me.collection.length || me.collection.fetch();
		}
	});
});
