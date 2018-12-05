/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	return Backbone.Collection.extend({
		url:function(){
			if(this.isNew()){
				return '/api/match_player_statistics/' + (this.isAdmin ? '?admin=1':'');
			} else {
				return '/api/match_player_statistics/?match=' + this.match + (this.isAdmin ? '&admin=1':'');
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
});