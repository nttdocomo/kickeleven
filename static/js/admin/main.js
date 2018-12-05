/**
 * @author nttdocomo
 */
define(function(require){
	require('../taurus/taurus');
	var Router = require('./route');
	var panel,
		clubCreatePanel,
		messageDialog,
	i18n = require('../i18n/{locale}');
	taurus.augmentObject('taurus',{
		POSITION:['Striker','Attack Midfielder','Midfielder','Defensive Midfielder','Wing Back','Defender','Sweeper','Goalkeeper']
	});
	taurus.itemPathPrefix = '';
	$(document).on('click','.btn-logout',function(){
		var form = document.createElement('form');
		form.action = '/logout/';
		form.method = 'POST';
		form.innerHTML = '<input type="text" value="'+location.pathname + location.hash+'" name="redirect" />';
		document.body.appendChild(form);
		form.submit();
		return false;
	});
	new Router;
	Backbone.history.start();
});
