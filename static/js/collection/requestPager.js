/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	require('backbone-pageable');
	return Backbone.PageableCollection.extend({
		queryParams: {

		    // `Backbone.PageableCollection#queryParams` converts to ruby's
		    // will_paginate keys by default.
		    currentPage: "p",
		    pageSize: "limit"
		}
	});
});