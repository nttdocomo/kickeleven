/**
 * @author nttdocomo
 */
define(function(require) {
	var Player = require('./player');
	return taurus.klass('taurus.model.Staff', Player.extend());
})