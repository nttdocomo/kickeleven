/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/panel/table'),
	SearchField = require('../taurus/form/field/searchfield');
	return Base.extend({
		afterRender:function(){
			var me = this;
			Base.prototype.afterRender.apply(this,arguments);
			new SearchField({
				name:this.search_fields[0],
				width:300,
				renderTo:this.$el.find('.panel-body'),
				onTriggerClick:function(){
					var attr = {};
					attr[this.getName()] = this.getValue();
					me.collection.search(attr);
				}
			});
		}
	});
});
