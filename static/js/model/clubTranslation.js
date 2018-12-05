/**
 * @author nttdocomo
 */
define(function(require) {
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/clubtranslation/';
			} else {
				return '/api/clubtranslation/?id=' + this.id;
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.clubtranslation;
			}
			return resp;
		}
	});
});