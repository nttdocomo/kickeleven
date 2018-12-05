/**
 * @author nttdocomo
 */
define(function(require) {
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/city/' + (this.isAdmin ? '?admin=1':'');
			} else {
				return '/api/city/?id=' + this.id + (this.isAdmin ? '&admin=1':'');
			}
		}
	});
});