/**
 * @author nttdocomo
 */

define(function(require) {
	var Base = require('../taurus/view/base');
	var ListItem = require('./messageDialogConversationListItem');
	return taurus.view("taurus.view.MessageDialogConversationList", Base.extend({
		tpl:'<%=list%>',
		tagName:'ul',
		className:'list-group',
		html:function(){
			var html = this.collection.map(function(model){
				return (new ListItem({
					model:model
				})).html()
			}).join('')
			return Base.prototype.html.call(this,{'list':html})
		}
	}))
})