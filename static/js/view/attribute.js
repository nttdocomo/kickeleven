/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	taurus.augmentString('taurus.templates.views.attribute', ['<caption>...</caption><tbody><tr><td></td></tr></tbody>'].join(''));
	return taurus.view('taurus.views.Attribute',Base.extend({
		className:'span4'
	}))
})
