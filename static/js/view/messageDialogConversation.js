/**
 * @author nttdocomo
 */

define(function(require) {
	var Base = require('../taurus/view/base');
	return taurus.view("taurus.view.MessageDialogConversation", Base.extend({
		tpl:'<%=content%>',
		tagName:'div',
		className:'message-convo'
	}))
})