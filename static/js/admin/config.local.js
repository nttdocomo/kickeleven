/**
 * @author nttdocomo
 */
seajs.config({
	plugins : ['shim', 'text'],
	base : "../static/js/",
	alias : {
		"jquery" : "jquery-2.0.0.js",
		"underscore" : "underscore.js",
		"modernizr" : "taurus/modernizr",
		"moment" : "taurus/moment"
	},
	map : [['http://localhost:8080/static/js/taurus/', 'http://battle.ship.com/src/']],
	preload : ['jquery', 'underscore', 'modernizr', 'plugin-text'],
	vars : {
		'locale' : (navigator.language || navigator.browserLanguage).toLowerCase()
	},
});