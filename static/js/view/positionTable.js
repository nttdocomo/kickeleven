/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	var POSITIONS=['Striker','Attack Midfielder','Midfielder','Defensive Midfielder','Wing Back','Defender','Defender','Sweeper','Goalkeeper']
	var SIDE = ['center','left','right']
	return taurus.view('taurus.views.PositionTable',Base.extend({
		tpl:'<tbody><tr><%_.each(data,function(position){%><td><%=position.position%>(<%=position.side%>)</td><%})%></tr></tbody>',
		tagName:'table',
		className:'table',
		html : function(data) {
			data = _.map(data,function(item,i){
				item.position = POSITIONS[item.position]
				item.side = SIDE[item.side]
				return item
			})
			return Base.prototype.html.apply(this,[{data:data}])
		}
	}))
})
