/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	var DropdownMenuItem = require('./dropdownMenuItem');
	return taurus.view('taurus.views.DropdownMenu',Base.extend({
		tpl:'<%=html%>',
		tagName:'ul',
		className:'dropdown-menu',
		html:function(){
			var html = _.map(this.menus,function(item){
				if(item.menus){
					 return (new DropdownMenuItem({
					 	className:'dropdown-submenu'
					 })).html(item)
				}
				return (new DropdownMenuItem()).html(item)
			}).join('')
			return Base.prototype.html.apply(this,[{'html':html}])
		}
	}))
})
