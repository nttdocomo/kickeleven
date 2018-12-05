/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../taurus/view/base','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../taurus/view/base'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../taurus/view/base'),require('underscore'));
	}
}(this, function(Base, _){
	return Base.extend({
		className:'row next-match',
		tpl:'<div class="col-lg-6"><div class="row"><div class="col-lg-5 home"><img src="<%=team1_img%>" /></div><div class="col-lg-2 versus"><span>VS</span></div><div class="col-lg-5 away"><img src="<%=team2_img%>" /></div></div></div><div class="col-lg-6"></div>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.model.on('change',_.bind(function(){
				this.renderHtml()
			},this))
		},
		getTplData:function(){
			var data = this.model.toJSON();
			data.team1_img = config.static + 'resources/team/'+data.team1.id+config.imgsuffix
			data.team2_img = config.static + 'resources/team/'+data.team2.id+config.imgsuffix
			return data
		},
		renderHtml:function(){
			if(this.model.isNew()){
				return ''
			}
			return Base.prototype.renderHtml.apply(this,arguments)
		}
	})
}))