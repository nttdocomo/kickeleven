/**
 * @author nttdocomo
 */
define(function(require) {
	var Player = require('./player');
	return Player.extend({
		model : taurus.model.Player,
		paginator_core : {
			type : 'GET',

			// the type of reply (jsonp by default)
			dataType : 'json',
			cache : true,

			// the URL (or base URL) for the service
			url : '/api/clubsquad/'
		},
		paginator_ui : {
			// the lowest page index your API allows to be accessed
			firstPage : 1,

			// which page should the paginator start from
			// (also, the actual page the paginator is on)
			currentPage : 1,

			// how many items per page should be shown
			perPage : 20,

			// a default number of total pages to query in case the API or
			// service you are using does not support providing the total
			// number of pages for us.
			// 10 as a default in case your service doesn't return the total
			totalPages : 10
		},
		server_api : {
			p : function() {
				return this.currentPage
			},
			limit:function() {
				return this.paginator_ui.perPage;
			},
			club:function(){
				return this.club.id;
			}
		},
		parse : function(resp) {
			var results;
			if(resp.rv){
				results = resp.rv.player;
				if(resp.rv.count)
					this.totalRecords = resp.rv.count;
			} else {
				results = _.isArray(resp) ? resp : resp.results;
				//Normally this.totalPages would equal response.d.__count
				//but as this particular NetFlix request only returns a
				//total count of items for the search, we divide.
				//this.totalPages = Math.ceil(resp.count / this.perPage);
				if(resp.count)
					this.totalRecords = resp.count;
			}
			return results;
		}
	});
});