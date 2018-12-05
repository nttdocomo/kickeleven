/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	require('../view/club');
	require('../view/player');
	return taurus.view('taurus.panel.ProfilePanel',Base.extend({
		afterRender:function(){
			new taurus.views[this.view]({
				model:this.model,
				renderTo:this.$el.find('.panel-body')
			})
		}
	}))
})
