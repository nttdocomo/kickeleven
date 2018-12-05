/**
 * @author nttdocomo
 */
define(function(){
	seajs.config({
		base : "/static/js/",
		alias : {
			"jquery" : "jquery-2.0.0.js",
			"underscore" : "underscore.js",
			"modernizr" : "taurus/modernizr",
			"backbone" : "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js",
			"backbone.paginator":"http://cdnjs.cloudflare.com/ajax/libs/backbone.paginator/0.8/backbone.paginator.min.js",
			"moment" : "http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min.js"
		},
		map : [['http://localhost:8080/static/js/taurus/', 'http://battle.ship.com/src/']],
		vars : {
			'locale' : (navigator.language || navigator.browserLanguage).toLowerCase()
		},
	});
	seajs.use("/static/js/main");
})
