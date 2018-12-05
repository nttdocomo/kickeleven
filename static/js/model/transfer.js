/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/transfer/';
			} else {
				return '/api/transfer/?id=' + this.id;
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.transfer;
			}
			return resp;
		}
	});
});