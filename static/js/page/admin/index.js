/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../base'),
	i18n = require('../../i18n/zh-cn'),
	Table = require('../../taurus/panel/table');
	return Base.extend({
		tpl:'<div class="col-lg-12 flex-height"></div>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			new Table({
				pager:false,
				uiClass:'flex-height',
				title:this.title,
				columns : [{
					text : i18n.__('Name'),
					flex : 1,
					sortable : false,
					renderer : function(value,data) {
						return '<a href="'+data.admin_url+'">'+value+'</a>';
					},
					dataIndex : 'name'
				}],
				collection : new Backbone.Collection(this.model_list),
				renderTo:this.$el.find('.col-lg-12'),
				operation:'prepend'
			});
		}
	});
});
