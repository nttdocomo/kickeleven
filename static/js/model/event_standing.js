/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/event_standing/' + (this.isAdmin ? '&admin=1':'');
			} else {
				return '/api/event_standing/?id=' + this.id + (this.isAdmin ? '&admin=1':'');
			}
		},
		save:function(key, val, options){
			var attrs, current, done;
			// Handle both `"key", value` and `{key: value}` -style arguments.
			if (key == null || _.isObject(key)) {
				attrs = key;
				options = val;
			} else if (key != null) {
				(attrs = {})[key] = val;
			}
			Backbone.Model.prototype.save.apply(this,[attrs, options]);
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.table;
			}
			return resp
		}
	});
});