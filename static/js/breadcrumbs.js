/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./taurus/view/base');
	return Base.extend({
		tpl:'<%=breadcrumbs%>',
		tagName:'ol',
		className:'breadcrumb',
		getTplData:function(){
			return{
				breadcrumbs:_.map(this.breadcrumbs,function(breadcrumb){
					return _.template('<li<%if(active){%> class="active"<%}%>><%if(!active){%><a href="<%=href%>"><%}%><%=text%><%if(!active){%></a><%}%></li>',{
						text:breadcrumb.text,
						active:breadcrumb.active,
						href:breadcrumb.href
					});
				}).join('')
			};
		}
	});
});