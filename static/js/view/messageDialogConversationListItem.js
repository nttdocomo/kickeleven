/**
 * @author nttdocomo
 */

define(function(require) {
	var Base = require('../taurus/view/base');
	return taurus.view("taurus.view.MessageDialogConversationListItem", Base.extend({
		tpl:'<div class="dm-thread js-dm-thread" data-thread-id="<%=id%>"><span class="glyphicon glyphicon-chevron-right pull-right"></span><div class="dm-thread-content"><a href="#"><b class="fullname"><%=sender.full_name%></b></a><p class="dm-thread-snippet js-tweet-text"><%=title%></p></div></div>',
		tagName:'li',
		className:'dm-thread-item js-dm-thread-item'
	}))
})