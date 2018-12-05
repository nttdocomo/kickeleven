/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		tpl:['<img src="/images/players/120_120/<%=id%>.png" />'].join(''),
		tagName:'a',
        className:'profile-picture pull-left media-thumbnail js-nav js-tooltip',
        initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.model.on('sync',function(){
				this.html();
			},this);
		},
		getTplData:function(){
			return $.extend(Base.prototype.getTplData.apply(this,arguments),this.model.toJSON());
		}
	});
});
