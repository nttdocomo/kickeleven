/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	require('../svg');
	var POSITION = [2,4,6,8,8,10,11,12]
	var SIDE = [1,3,5]
	return taurus.view('taurus.views.PositionView',Base.extend({
		tpl:'',
		className:'football-field',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.draw = SVG(this.$el.attr('id'))
			this.draw.attr({
				attrpreserveAspectRatio:"none"
			})
			this.draw.size(340, 235)
			var me = this;
			$(window).on('resize',function(){
				me.scaleSVG()
			})
			this.model.on('sync',function(){
				this.createSVG()
			},this)
		},
		scaleSVG:function(){
			this.scaleRate = this.$el.width() / 340;
			this.draw.size(340*this.scaleRate, 235*this.scaleRate)
			this.draw.viewbox(0, 0, 340, 235)
		},
		createSVG:function(){
			//this.draw.size(340, 235)
        	this.beginDraw()
        	this.scaleSVG()
		},
		beginDraw:function(){
			var draw = this.draw
			draw.clear();
			this.addStatium()
			/*var image = draw.image('/media/img/football_field.png')
        	image.size(230, 368)*/
        	this.addPositionCircle(draw)
		},
		addStatium:function(){
			var draw = this.draw
			var glass = draw.rect(340, 235).attr({
				fill: '#264D0C'
			})
			var square = draw.rect(330, 225).attr({
				fill: 'transparent',
				stroke: '#ffffff',
				'stroke-width': 2
			}).translate(5, 5)
			var halfwayLine = draw.line(170, 5, 170, 230).stroke({ width: 2 ,color:'#ffffff'})
			var centerCircle = draw.circle(55).stroke({ width: 2 ,color:'#ffffff'}).fill({color:'transparent'}).translate(142.5, 90)
			this.drawArea(0);
			this.drawArea(1);
		},
		drawArea:function(opposite){
			var draw = this.draw
			var penaltyArea = draw.rect(50, 121).attr({
				fill: 'transparent',
				stroke: '#ffffff',
				'stroke-width': 2
			})
			var goalArea = draw.rect(17, 55).attr({
				fill: 'transparent',
				stroke: '#ffffff',
				'stroke-width': 2
			})
			var penaltyPoint = draw.circle(6).attr({
				fill: '#ffffff'
			})
			draw.group().translate(55, 95).add(draw.path('M 0,0 a27,27 0 0,1 0,40').attr({
				fill: 'transparent',
				stroke: '#ffffff',
				'stroke-width': 2
			}));
			draw.group().translate(285, 95).add(draw.path('M 0,0 a27,27 0 0,0 0,40').attr({
				fill: 'transparent',
				stroke: '#ffffff',
				'stroke-width': 2
			}));
			/*draw.path('M 194,262 a27,27 0 1,0 0,40').attr({
				fill: 'transparent',
				stroke: '#ffffff',
				'stroke-width': 2
			})*/
			if(opposite){
				penaltyArea.translate(285, 57)
				goalArea.translate(318, 90)
				penaltyPoint.translate(299, 114.5)
			} else {
				penaltyArea.translate(5, 57)
				goalArea.translate(5, 90)
				penaltyPoint.translate(35, 114.5)
			}
		},
		addPositionCircle:function(draw){
			var me = this, draw = this.draw, group = draw.group().translate(0, 0);
			_.each(this.model.get('position'),function(position){
				var x = 340 - (POSITION[position.position])*340/12;
				var y = 235 - (6 - SIDE[position.side])*235/6 - 8;
				var circle = draw.circle(16).translate(x, y).attr({
					fill: '#' + me.getCircleColor(position.point),
					stroke: '#' + me.getCircleStroke(position.point),
					'stroke-width': 3
				})
				group.add(circle)
				//'<circle r="8" cx="0" cy="0" fill="#00FF00" stroke="#000000" fill-opacity="1" stroke-width="2" stroke-opacity="0" transform="translate(115,115)"></circle>'
			})
		},
		getCircleColor:function(point){
			if(point === 20){
				return '40f023'
			}
			if(point > 14 && point < 20){
				return '60c21e'
			}
			if(point > 10 && point <= 14){
				return 'A3CC35'
			}
			if(point <= 10 && point > 8){
				return 'E9DB00'
			}
			return 'ED7500'
		},
		getCircleStroke:function(point){
			if(point === 20){
				return 'ffffff'
			}
			return '000000'
		}
	}))
})
