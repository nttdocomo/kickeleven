/**
 * @author nttdocomo
 */
define(function(require) {
	require('../model/message');
	return taurus.klass('taurus.collection.Message',Backbone.Collection.extend({
		model : taurus.model.Message,
		url : '/api?method=player.get.message',
		parse:function(resp){
			return resp.rv.messages;
		}
	}));
})