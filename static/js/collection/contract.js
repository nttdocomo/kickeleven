/**
 * @author nttdocomo
 */
define(function(require) {
	require('../model/contract');
	return taurus.klass('taurus.collection.Contract',Backbone.Collection.extend({
		model : taurus.model.Contract,
		url : '/api/contract/'
	}));
})