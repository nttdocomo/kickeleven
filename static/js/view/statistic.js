 /**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	taurus.augmentString('taurus.templates.view.statistic', ['<div>11111111</div>'].join(''));
	return taurus.view('taurus.view.Statistic',Base.extend({
		className:'panel-content'
	}))
})
