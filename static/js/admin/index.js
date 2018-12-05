/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../page/base');
	return Base.extend({
		tpl:'<div class="col-lg-2 flex-height"><ul class="nav nav-pills nav-stacked"><li class="active"><a href="#" data-item-type="player"><%=i18n.__("Player")%></a></li><li><a href="#" data-item-type="club"><%=i18n.__("Club")%></a></li></ul></div><div class="col-lg-2 flex-height"></div><div class="col-lg-2 flex-height"></div><div class="col-lg-6 flex-height"></div>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
		}
	});
});
