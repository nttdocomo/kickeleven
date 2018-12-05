/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		tpl:['<h1 class="fullname"><a href=""><%=name%></a></h1>'].join(''),
        className:'profile-details',
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
