/**
 * @author nttdocomo
 */
define(function(require) {
	var RequestPager = require('./requestPager'),
	Match = require('../model/match');
	return RequestPager.extend({
		model : Match,
		url : '/api/matches/',
		state: {
		    firstPage: 1,
		    currentPage: 1,
		    pageSize:20
		},
		parseState: function (resp, queryParams, state, options) {
			return {totalRecords: parseInt(resp.rv.count)};
		},
		parseRecords : function(resp) {
			var results;
			if(resp.rv){
				results = resp.rv.matches;
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