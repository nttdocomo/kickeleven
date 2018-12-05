/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./table');
	var Profile = require('../view/club');
	var Table = require('../taurus/view/table');
	return taurus.view('taurus.panel.MatchPanel',Base.extend({
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			var me = this;
			this.collection.on('sync',function(){
				new Table({
					columns : [{
						text : '赛事',
						flex : 1,
						sortable : false,
						renderer : function(value,data) {
							return value.competition.competition_name
							//return '<img src="/image/20/20/'+value.competition.logo+'/" />'
						},
						dataIndex : 'season'
					}, {
						text : '比赛时间',
						flex : 1,
						sortable : false,
						renderer : function(value,data) {
							return moment.utc(value).format("DD.M")
						},
						dataIndex : 'match_datetime'
					}, {
						text : 'H/A',
						flex : 1,
						sortable : false,
						renderer : function(value,data) {
							if(value[0].id != me.model.id){
								return 'A'
							}
							return 'H'
						},
						dataIndex : 'team'
					}, {
						text : '对手',
						flex : 1,
						sortable : false,
						renderer : function(value,data) {
							return _.find(value,function(club){
								return club.id != me.model.id
							}).club_name
						},
						dataIndex : 'team'
					}, {
						text : '比分',
						flex : 1,
						sortable : false,
						renderer : function(value,data) {
							if(data.team[0].id != me.model.id){
								return value.reverse().join('-')
							}
							return value.join('-')
						},
						dataIndex : 'result'
					}],
					collection : me.collection,
					height:200,
					renderTo : me.$el
				})
			})
		},
		html:function(){
			var me = this;
			return Base.prototype.html.call(this,{
				'title':'赛程',
				'content':''
			})
		}
	}))
})
