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
}(this, function(Base){
	return Base.extend({
		scale:12,
		size:'lg',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.$el.addClass(['col',this.size,this.scale].join('-'));
		}
	})
}));