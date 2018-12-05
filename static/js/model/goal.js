/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/goals/' + (this.isAdmin ? '?admin=1':'');
			} else {
				return '/api/goals/?id=' + this.id + (this.isAdmin ? '&admin=1':'');
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.goals;
			}
			return resp;
		}
	});
});