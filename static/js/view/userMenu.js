/**
 * @author nttdocomo
 */
define(function(require){
	var DropdownMenu = require('./dropdownMenu');
	return taurus.view('taurus.views.UserMenu',DropdownMenu.extend({
		events:{
			'click li:eq(0)':function(){
				require.async('../widget/messageDialog',function(MessageDialog){
					(new MessageDialog({
						title:'消息',
						renderTo:$(document.body)
					})).show()
				})
				return false;
			},
			'click li:eq(1)':function(){
				require.async('../widget/playerEditDialog',function(Dialog){
					(new Dialog({
						title:'编辑信息',
						renderTo:$(document.body)
					})).show()
				})
				return false;
			}
		}
	}))
})
