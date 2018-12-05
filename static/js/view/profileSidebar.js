/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		/*tpl:'<img src="<%=logo%>" /><div class="caption"><h3><%=name%></h3><h4><a href="competition/<%=competition_id%>/"><%=competition_name%></a></h4></div>',*/
		tpl:'<img src="<%=logo%>" /><div class="caption"><h3><%=name%></h3></div>',
        className:'thumbnail',
        initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.model.on('sync',function(){
				this.renderHtml();
			},this);
		},
		getTplData:function(){
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				logo:this.model.getLogoPath(),
				name:this.model.get('team_name')/*,
				competition_name:this.model.get('events').competition.name,
				competition_id:this.model.get('events').competition.id*/
			});
		}
	});
});
