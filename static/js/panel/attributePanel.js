/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./table');
	require('../view/attributeTable');
	return taurus.view('taurus.panel.AttributePanel',Base.extend({
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			var me = this;
			this.model.on('change',function(){
				me.html()
			})
		},
		getTplData:function(){
			var data = Base.prototype.getTplData.apply(this,arguments);
			var attribute = this.model['get_'+this.type]()
			if(_.isEmpty(attribute)){
				data.content = ''
			} else {
				data.content = _.template('<table class="table attribute-table"><tbody><%_.each(data,function(value,key){%><tr><td><%=i18n.__(key.replace(/(^[a-z]|_[a-z])/ig,function($1){return $1.toUpperCase().replace("_"," ")}))%></td><td><%=value%></td></tr><%})%></tbody></table>',{data:attribute})
			}
			//data.content = (new taurus.views[this.view]()).html(this.model['get_'+this.type]())
			return data
		}
	}))
})
