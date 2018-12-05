/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	var kit_name = ['Home','Away','Third']
	return taurus.view('taurus.views.Kit',Base.extend({
		tpl:['<%_.each(kit,function(item,i){%><div class="col-lg-4 text-center"><img src="/image/90/90/<%=item%>/"/><p><%=kitType[i]%></p></div><%})%>'].join(''),
		className:'row',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.model.on('sync',function(){
				me.html()
			})
		},
		getTplData:function(){
			var json = this.model.toJSON();
			json.kitType = ['Home','Away','Third']
			return json
		}
	}))
})
