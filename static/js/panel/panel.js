/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return taurus.view('taurus.panel.Panel',Base.extend({
		afterRender:function(){
			var me = this;
			require.async('../view/'+this.view,function(View){
				new View({
					model:me.model,
					renderTo:me.$el.find('.panel-body')
				})
			})
		}
	}))
})
