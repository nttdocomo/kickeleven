/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../taurus/view/base'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../taurus/view/base'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../taurus/view/base'));
	}
}(this, function(Base) {
	return Base.extend({
		className:'media',
		tpl:'<div class="media-left">\
		    <a href="<%=url%>">\
		    	<img class="media-object" src="<%=src%>" alt="<%=name%>">\
		    </a>\
		</div>\
		<div class="media-body">\
		  	<h4 class="media-heading"><%=name%></h4>\
		</div>',
        initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.model.on('change',function(){
				this.renderHtml();
			},this);
		},
		getTplData:function(){
			var model = this.model,id=model.id;
			return {
				url:'/player/'+id+'/',
				src:'/images/player/'+id+'.png',
				name:model.get('wSName')
			}
		}
	});
}));