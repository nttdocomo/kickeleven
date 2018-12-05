/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../taurus/view/base');
	return taurus.view("taurus.view.PlayerDialogHeader", Base.extend({
		tpl:'<%if(typeof(profile)!=="undefined"){%><%=name%><%}%><%if(typeof(contract)!=="undefined"){%>向<a class="js-dm-header-title" href="#"><%=name%></a>提供合同<%}%><%if(typeof(transfer)!=="undefined"){%>向<a class="js-dm-header-title" href="#"><%=name%></a>提出转会申请<%}%>',
		tagName:'span'
	}))
})
