/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/panel/panel'),
	Profile = require('../view/personalDetail'),
	i18n = require('../i18n/{locale}');
	return Base.extend({
		title:i18n.__('Personal Detail'),
		initComponent:function(){
			Base.prototype.initComponent.apply(this,arguments);
			new Profile({
				renderTo:this.$el.find('.panel-body'),
				model:this.model
			})
		}
	})
})
