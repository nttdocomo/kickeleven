/**
 * @author nttdocomo
 */
define(function(require) {
	require('backbone.paginator');
	require('../model/statistic');
	return taurus.klass('taurus.collection.Statistic', Backbone.Paginator.requestPager.extend({
		model : taurus.model.Statistic,
		paginator_core : {
			type : 'GET',

			// the type of reply (jsonp by default)
			dataType : 'json',
			cache : true,

			// the URL (or base URL) for the service
			url : '/api/statistic/'
		},
		paginator_ui : {
			// the lowest page index your API allows to be accessed
			firstPage : 1,

			// which page should the paginator start from
			// (also, the actual page the paginator is on)
			currentPage : 1,

			// how many items per page should be shown
			perPage : 10,

			// a default number of total pages to query in case the API or
			// service you are using does not support providing the total
			// number of pages for us.
			// 10 as a default in case your service doesn't return the total
			totalPages : 10
		},
		server_api : {
			player:function(){
				return this.player.id
			}
		},
		parse : function(resp) {
			var results = resp.results;
			//Normally this.totalPages would equal response.d.__count
			//but as this particular NetFlix request only returns a
			//total count of items for the search, we divide.
			//this.totalPages = Math.ceil(resp.count / this.perPage);
			this.totalRecords = resp.count;
			return results;
		}
	}));
})