/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	return taurus.view('taurus.views.Profile',Base.extend({
		tpl:'<%_.each(items,function(item){%><div class="col-lg-6 form-group"><label class="control-label"><%=item.name%></label><p class="form-control-static"><%=item.value%></p></div><%})%>',
		className:'clearfix form-horizontal'
	}))
})
