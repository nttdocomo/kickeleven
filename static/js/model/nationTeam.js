/**
 * @author nttdocomo
 */
define(function(require) {
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api?method=nationteam' + (this.isAdmin ? '&admin=1':'');;
			} else {
				return '/api?method=nationteam&id=' + this.id + (this.isAdmin ? '&admin=1':'');
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.team;
			}
			return resp;
		}
	});
});