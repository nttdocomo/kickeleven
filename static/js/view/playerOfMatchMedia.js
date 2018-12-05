/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../taurus/view/base','../taurus/i18n'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../taurus/view/base'),require('../taurus/i18n'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../taurus/view/base'),require('../taurus/i18n'));
	}
}(this, function(Base,i18n) {
	return Base.extend({
		className:'media',
		tpl:'<div class="media-left">\
		    <a href="<%=url%>">\
		    	<img class="media-object" src="<%=src%>" alt="<%=name%>" height="64">\
		    </a>\
		</div>\
		<div class="media-body">\
		  	<h4 class="media-heading"><%=title%></h4>\
		  	<p><%=name%></p>\
		  	<p><%=rate%></p>\
		</div>',
        initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.model.on('change',function(){
				this.renderHtml();
			},this);
		},
		getTplData:function(){
			var model = this.model,id=model.get('playerId');
			return {
				url:'/player/'+id+'/',
				src:'/images/player/64_64/'+(id||0)+'.png',
				title:i18n.__('Player Of Match'),
				name:model.get('wSName'),
				rate:model.get('rating')
			}
		}
	});
}));
