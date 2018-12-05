/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['backbone'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('backbone'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('backbone'));
	}
}(this, function(Backbone) {
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/match_player_statistics/' + (this.isAdmin ? '?admin=1':'');
			} else {
				return '/api/match_player_statistics/?match=' + this.get('match') + (this.isAdmin ? '&admin=1':'');
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.player_statistics;
			}
			return resp;
		}
	});
}));