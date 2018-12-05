/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	Stats = require('./stats'),
	ProfileDetails = require('./profileDetails'),
	ProfilePicture = require('./profilePicture'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		tpl:['<div class="profile-header-inner clearfix"></div><div class="profile-banner-footer clearfix"><div class="default-footer"></div></div>'].join(''),
        className:'profile-header',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			new ProfilePicture({
				model:this.model,
				renderTo:this.$el.find('.profile-banner-footer'),
				operation:'prepend'
			})
			new Stats({
				model:this.model,
				renderTo:this.$el.find('.default-footer')
			});
			new ProfileDetails({
				model:this.model,
				renderTo:this.$el
			})
		}
	});
});
