/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/panel/panel'),
	Profile = require('../view/playerMiniProfile');
	return taurus.view('taurus.panel.PlayerPanel',Base.extend({
		tpl:'<div class="panel-heading"><h3 class="panel-title"><%=title%></h3></div><%=content%>',
		html:function(){
			Base.prototype.html.apply(this,arguments);
			var me = this;
			this.model.on('sync',function(){
				me.html()
			})
		},
		getTplData:function(){
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				title:this.model.get('full_name'),
				content: (new Profile({
					model:this.model
				})).html()
			})
		}
	}))
})
