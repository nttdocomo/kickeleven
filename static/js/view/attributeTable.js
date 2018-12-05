/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	return taurus.view('taurus.views.AttributeTable',Base.extend({
		tpl:'<tbody><%_.each(data,function(value,key){%><tr><td><%=i18n.__(key.replace(/(^[a-z]|_[a-z])/ig,function($1){return $1.toUpperCase().replace("_"," ")}))%></td><td><%=value%></td></tr><%})%></tbody>',
		tagName:'table',
		className:'table attribute-table',
		html : function(data) {
			if (_.isEmpty(data)){
				return ''
			}
			return Base.prototype.html.apply(this,[{data:data}])
		}
	}))
})
