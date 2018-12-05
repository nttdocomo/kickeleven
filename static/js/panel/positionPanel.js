/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	var PositionTable = require('../view/positionTable');
	var PositionView = require('../view/positionView');
	return taurus.view('taurus.panel.PositionPanel',Base.extend({
		events:{
			'mouseenter circle':function(e){
				this.$el.find('#balloons').append('<g transform="translate('+e.offsetX+','+e.offsetY+')"><rect x="0.5" y="0.5" width="185" height="24" rx="6" ry="6" stroke-width="2" fill="#FF6600" stroke="#FFFFFF" fill-opacity="1" stroke-opacity="1"></rect><text y="5.5" fill="#000000" font-family="Verdana" font-size="11" opacity="0.4" text-anchor="middle" transform="translate(94,12)"><tspan y="5.5" x="0">18.5 litres of beer per year</tspan></text></g>')
			},
			'mouseout circle':function(){
				this.$el.find('#balloons > g').remove()
			}
		},
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
		},
		getTplData:function(){
			var data = Base.prototype.getTplData.apply(this,arguments)
			/*if(data.position){
				data.content = (new PositionView()).html(data.position)// + (new PositionTable()).html(data.position)
			}*/
			return data
		},
		render:function(){
			var me = Base.prototype.render.apply(this,arguments)
			new PositionView({
				model:this.model,
				renderTo:this.$el.find('.panel-body')
			})
			return me
		}
	}))
})
