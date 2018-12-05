/**
 * @author nttdocomo
 */
define(function(require) {
	var Model = require('../model/playerTranslation');
	return Backbone.Paginator.requestPager.extend({
		model : Model,
		sync: function ( method, model, options ) {
			var self = this,queryAttributes = {};
			self.setDefaults();
			// Some values could be functions, let's make sure
			// to change their scope too and run them
			_.each(_.result(self, "server_api"), function(value, key){
				if( _.isFunction(value) ) {
					value = _.bind(value, self);
					value = value();
				}
				if(value)
					queryAttributes[key] = value;
			});
			
			var queryOptions = _.clone(self.paginator_core);
			_.each(queryOptions, function(value, key){
				if( _.isFunction(value) ) {
					value = _.bind(value, self);
					value = value();
				}
				queryOptions[key] = value;
			});
			
			// Create default values if no others are specified
			queryOptions = _.defaults(queryOptions, {
				timeout: 60000,
				cache: false,
				type: 'GET',
				dataType: 'jsonp'
			});
			
			// Allows the passing in of {data: {foo: 'bar'}} at request time to overwrite server_api defaults
			if( options.data ){
				options.data = decodeURIComponent($.param(_.extend(queryAttributes,options.data)));
			}else{
				options.data = decodeURIComponent($.param(queryAttributes));
			}
			
			queryOptions = _.extend(queryOptions, {
				data: decodeURIComponent($.param(queryAttributes)),
				processData: false,
				url: _.result(queryOptions, 'url')
			}, options);
			
			var bbVer = Backbone.VERSION.split('.');
			var promiseSuccessFormat = !(parseInt(bbVer[0], 10) === 0 &&
                                   parseInt(bbVer[1], 10) === 9 &&
                                   parseInt(bbVer[2], 10) === 10);
                                   
            var success = queryOptions.success;
            queryOptions.success = function ( resp, status, xhr ) {
            	if ( success ) {
            		// This is to keep compatibility with Backbone 0.9.10
            		if (promiseSuccessFormat) {
            			success( resp, status, xhr );
            		} else {
            			success( model, resp, queryOptions );
            		}
            	}
            	/*if ( model && model.trigger ) {
            		model.trigger( 'sync', model, resp, queryOptions );
            	}*/
            };
            
            var error = queryOptions.error;
            queryOptions.error = function ( xhr ) {
            	if ( error ) {
            		error( model, xhr, queryOptions );
            	}
            	if ( model && model.trigger ) {
            		model.trigger( 'error', model, xhr, queryOptions );
            	}
            };
            
            var xhr = queryOptions.xhr = $.ajax( queryOptions );
            if ( model && model.trigger ) {
            	model.trigger('request', model, xhr, queryOptions);
            }
            return xhr;
        },
		paginator_core : {
			type : 'GET',

			// the type of reply (jsonp by default)
			dataType : 'json',
			cache : true,

			// the URL (or base URL) for the service
			url : '/api/playertranslation/'
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
			p : function() {
				return this.currentPage
			},
			nation : function() {
				return this.nation ? this.nation.id : undefined
			}
		},
		parse : function(resp) {
			var results;
			if(resp.rv){
				results = resp.rv.playertranslation;
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