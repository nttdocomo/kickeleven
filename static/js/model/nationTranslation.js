/**
 * @author nttdocomo
 */
define(function(require) {
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api?method=nationtranslation';
			} else {
				return '/api?method=nationtranslation&id=' + this.id;
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.nationtranslation;
			}
			return resp;
		}
	});
});