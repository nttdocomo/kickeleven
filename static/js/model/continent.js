/**
 * @author nttdocomo
 */
define(function(require){
	require('../collection/nation');
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/continent/';
			} else {
				return '/api/continent/?id=' + this.id;
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.continent;
			}
			return resp
		}/*,
		save:function(key, val, options){
			return Backbone.Model.prototype.save.call(this, key, val, $.extend(options,{
				emulateJSON:true
			}));
		}*/
	});
});
