/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/team/?' + (this.isAdmin ? '&admin=1':'');;
			} else {
				return '/api/team/?id=' + this.id + (this.isAdmin ? '&admin=1':'');
			}
		},
		getLogoPath:function(){
			return '/images/team/'+this.id + '.png';
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