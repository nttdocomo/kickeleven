 /**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	var Statistic = require('../view/statistic');
	taurus.augmentString('taurus.templates.panel.statistic', ['<div class="popover-title">Statistic</div>'].join(''));
	return taurus.view('taurus.panel.Statistic',Base.extend({
		className:'statistic panel',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			new Statistic({
				renderTo:this.$el
			})
		}
	}))
})
