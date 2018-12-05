/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone'),
	RequestPager = require('./requestPager');
	return RequestPager.extend({
		model : Backbone.Model,
		url : '/api/event_standing_entry/',
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
				results = resp.rv.event_standing_entries;
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
		},
		comparator : function(a,b){
			if(a.get('wins') === null && b.get('wins') !== null){
				return 1;
			}
			if(a.get('pts') !== null && b.get('pts') === null){
				return -1;
			}
			var pts1 = a.get('pts'),
			pts2 = b.get('pts');
			if(pts1 > pts2){
				return -1;
			}
			if(pts1 == pts2){
				if(a.get('goals_for') - a.get('goals_against') > b.get('goals_for') - b.get('goals_against')){
					return -1;
				}
			}
			if(pts1 == pts2 && a.get('goals_for') - a.get('goals_against') == b.get('goals_for') - b.get('goals_against')){
				if(a.get('goals_for') > b.get('goals_for')){
					return -1;
				}
			}
			return 1;
		}
	});
});