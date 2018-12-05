/**
 * @author nttdocomo
 */
define(function(require) {
	var Players = require('./player');
	var Player = require('../model/player');
	return Players.extend({
		model : Player,
		paginator_core : {
			type : 'GET',

			// the type of reply (jsonp by default)
			dataType : 'json',
			cache : true,

			// the URL (or base URL) for the service
			url : '/api/nationsquad/'
		},
		server_api : {
			nation:function(){
				return this.nation.id;
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