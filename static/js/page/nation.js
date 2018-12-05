/**
 * @author nttdocomo
 */
define(function(require){
	require('moment');
	var Base = require('./base'),
	Table = require('../taurus/panel/table'),
	Nation = require('../collection/nation'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		tpl:'<div class="col-lg-12"></div>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.listNation();
		},
		listNation:function(){
			var me = this;
			me.collection = new Nation;
			me.collection.pager();
			new Table({
				loading:true,
				header:false,
				refreshable:true,
				uiClass:'player-list',
				title:i18n.__('Club'),
				columns : [{
					text : i18n.__('Full Name'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-item-id="'+data.id+'" href="/#nation/'+data.id+'/">'+value+'</a>';
					},
					dataIndex : 'full_name'
				}, {
					text : i18n.__('Continent'),
					sortable : true,
					width:200,
					renderer : function(value) {
						if(value){
							return value.name;
						} else {
							return '-';
						}
					},
					dataIndex : 'continent'
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
