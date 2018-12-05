/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	return taurus.view('taurus.views.DropdownMenuItem',Base.extend({
		tpl:'<a href="<%if(typeof(href)!=="undefined"){%><%=href%><%}else{%>#<%}%>"><%=text%></a>',
		tagName:'li',
		html:function(item){
			if(item.menus){
				this.tpl += (new taurus.views.DropdownMenu({'menus':item.menus})).html()
			}
			return Base.prototype.html.call(this,item)
		}
	}))
})
