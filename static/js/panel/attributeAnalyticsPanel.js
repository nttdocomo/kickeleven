/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('./base');
	require('../highcharts');
	return taurus.view('taurus.panel.AttributeAnalyticsPanel', Base.extend({
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.model.on('change',this.renderChart,this)
		},
		renderChart:function(){
			var me = this;
			require.async('../highcharts-more',function(){
				me.$el.find('.panel-body').highcharts({
					chart: {
				        polar: true,
				        type: 'line',
				        height:135
				    },
				    
				    title: {
				        text: ''
				    },
				    
				    pane: {
				    	size: '80%'
				    },
				    
				    xAxis: {
				        categories: [(me.model.get('player').isGk() ? '扑救能力':'防守'), '身体', '速度', (me.model.get('player').isGk() ? '精神':'创造力'), 
				                (me.model.get('player').isGk() ? '指挥防守':'进攻'), (me.model.get('player').isGk() ? '神经指数':'技术'), '制空', (me.model.get('player').isGk() ? '大脚开球':'精神')],
				        tickmarkPlacement: 'on',
				        lineWidth: 0
				    },
				        
				    yAxis: {
				        gridLineInterpolation: 'polygon',
				        lineWidth: 0,
				        min: 0
				    },
				    
				    tooltip: {
				    	shared: true,
				        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
				    },
				    
				    legend: {
				        align: 'right',
				        verticalAlign: 'top',
				        y: 70,
				        layout: 'vertical',
				        enabled:false
				    },
				    
				    series: [{
				        name: '能力值',
				        data: [(me.model.get('player').isGk() ? me.model.getAnalytics('one_on_ones','reflexes'):me.model.getAnalytics('marking','tackling','positioning')),
				        me.model.getAnalytics('agility','jumping','natural_fitness','stamina','strength'),
				        me.model.getAnalytics('pace','acceleration'),
				        (me.model.get('player').isGk() ? me.model.getAnalytics('aggression','anticipation','bravery','composure','consentration','creativity','desisions','determination','flair','influence','off_the_ball'):me.model.getAnalytics('creativity','flair','teamwork')),
				        (me.model.get('player').isGk() ? me.model.getAnalytics('communication'):me.model.getAnalytics('long_shots','heading','composure','off_the_ball','technique')),
				        (me.model.get('player').isGk() ? me.model.getAnalytics('eccentricity'):me.model.getAnalytics('dribbling','technique','first_touch','passing')),
				        (me.model.get('player').isGk() ? me.model.getAnalytics('aerial_ability'):me.model.getAnalytics('heading','jumping')),
				        (me.model.get('player').isGk() ? me.model.getAnalytics('kicking'):me.model.getAnalytics('aggression','anticipation','bravery','composure','consentration','creativity','desisions','determination','flair','influence','off_the_ball'))],
				        pointPlacement: 'on'
				    }]
				
				});
			})
			//chart.write(this.$el.find('.section-body')[0]);
		},
		getRadarChartData : function() {
			return [{
				name : "防守",
				litres : this.model.getAnalytics('marking','tackling','positioning')
			}, {
				name : "身体",
				litres : this.model.getAnalytics('agility','jumping','natural_fitness','stamina','strength')
			}, {
				name : "速度",
				litres : this.model.getAnalytics('pace','acceleration')
			}, {
				name : "创造力",
				litres : this.model.getAnalytics('creativity','flair','teamwork')
			}, {
				name : "进攻",
				litres : this.model.getAnalytics('long_shots','heading','composure','off_the_ball','technique')
			}, {
				name : "技术",
				litres : this.model.getAnalytics('dribbling','technique','first_touch','passing')
			}, {
				name : "制空",
				litres : this.model.getAnalytics('heading','jumping')
			}, {
				name : "精神",
				litres : this.model.getAnalytics('aggression','anticipation','bravery','composure','consentration','creativity','desisions','determination','flair','influence','off_the_ball')
			}];
		}
	}))
})
