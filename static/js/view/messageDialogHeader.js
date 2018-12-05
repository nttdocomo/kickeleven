/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../taurus/view/base');
	return taurus.view("taurus.view.MessageDialogHeader", Base.extend({
		tpl:'<%if(typeof(conversation_list)!=="undefined"){%>消息<%}%><%if(typeof(message)!=="undefined"){%><a class="js-dm-header-title" href="#">消息</a> › <%=name%><%}%>',
		tagName:'span'
	}))
})
