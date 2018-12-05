/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base'),
	Panel = require('../taurus/classic/panel/panel'),
	Column = require('../layout/column'),
	Row = require('../layout/row'),
	Table = require('../taurus/classic/panel/table'),
	Match = require('../collection/fixture'),
	Fixture = require('../model/match'),
	Player = require('../collection/player'),
	Transfer = require('../collection/transfer'),
	NextMatch = require('../view/nextMatch'),
	moment = require('moment'),
	i18n = require('../taurus/i18n'),
	player = new Player,
	transfer = new Transfer,
	match = new Match,
	fixture = new Fixture
	return Base.extend({
		events:{
			'click .nav a':'navigate',
			'click .player-list a':'playerSummary',
			'click .club-panel a':'clubSummary',
			'click .club-panel .list-group-item:eq(0)':'squad'
		},
		items:[{
			'class':Column,
			uiClass:'col-lg-8',
			style:{
				'padding-top':200
			},
			items:[{
				'class':NextMatch,
				style:{
					'margin-top':-200,
					'margin-bottom':20,
					height:'100%'
				},
				height:180,
				model:fixture
			},{
				'class':Row,
				uiClass:'flex-height',
				items:[{
					'class':Column,
					uiClass:'col-lg-6',
					items:[{
						'class':Table,
						loading:true,
						header:false,
						refreshable:true,
						frame:true,
						uiClass:'player-list flex-height',
						title:i18n.__('Player'),
						columns : [{
							text : i18n.__('Name'),
							flex : 1,
							sortable : false,
							renderer : function(value,data) {
								return '<a data-player-id="'+data.id+'" href="/#player/'+data.id+'/">'+value+'</a>';
							},
							dataIndex : 'name'
						}, {
							text : i18n.__('Nation'),
							sortable : true,
							width:180,
							renderer : function(value) {
								var result = [];
								if(value){
									return _.map(value,function(nation){
										return nation.name
									}).join('/');
								} else {
									return '-';
								}
							},
							dataIndex : 'nationality'
						}, {
							text : i18n.__('Height'),
							sortable : true,
							width:50,
							dataIndex : 'height'
						}, {
							text : i18n.__('Age'),
							sortable : true,
							width:50,
							renderer : function(value) {
								return taurus.Date.getAge(value, 'yyyy-mm-dd');
							},
							dataIndex : 'date_of_birth'
						}],
						collection : player,
						onRefresh:function(){
							this.collection.fetch();
						},
						pager:true
					}]
				},{
					'class':Column,
					uiClass:'col-lg-6',
					items:[{
						'class':Row,
						style:{
							'margin-top':-120,
							'margin-bottom':20
						},
						height:100,
					},{
						'class':Row,
						uiClass:'flex-height',
						items:[{
							'class':Table,
							hideHeaders:true,
							loading:true,
							rowTemplate:'<tr data-item-id="<%=id%>">',
							refreshable:true,
							header:false,
							uiClass:'results-table flex-height',
							title:i18n.__('Fixtures'),
							columns : [{
								text : i18n.__('Date'),
								renderer : function(value,data) {
									return '<span title="' + moment(value).format('MMM DD, YYYY HH:mm') + '">' + moment(value).format('YYYY-MM-DD HH:mm') + '</span>';
								},
								dataIndex : 'play_at'
							},{
								text : i18n.__('Home'),
								align:'right',
								renderer : function(value,data) {
									return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" class="text-right">'+value.name+'</a>';
								},
								dataIndex : 'team1'
							}/*,{
								text : i18n.__('Home'),
								cellWidth:36,
								renderer : function(value,data) {
									return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'" class="text-right"><img src="/images/clubs/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/></a>';
								},
								dataIndex : 'team1'
							},{
								text : i18n.__('Away'),
								cellWidth:36,
								align:'left',
								renderer : function(value,data) {
									return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'"><img src="/images/clubs/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/></a>';
								},
								dataIndex : 'team2'
							}*/,{
								text : i18n.__('Away'),
								align:'left',
								renderer : function(value,data) {
									return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/">'+value.name+'</a>';
								},
								dataIndex : 'team2'
							}],
							collection : match,
						}]
					}]
				}]
			}]
		},{
			'class':Column,
			uiClass:'col-lg-4',
			items:[{
				'class':Table,
				//hideHeaders:true,
				title:i18n.__('Transfer'),
				loading:true,
				rowTemplate:'<tr data-item-id="<%=id%>">',
				refreshable:true,
				uiClass:'results-table flex-height',
				columns : [{
					text : i18n.__('Date'),
					renderer : function(value,data) {
						return moment(value).format(i18n.__('YYYY-MM-DD'));
					},
					dataIndex : 'transfer_date'
				},{
					text : i18n.__('Player'),
					renderer : function(value,data) {
						return value.name;
					},
					dataIndex : 'player'
				},{
					text : i18n.__('From'),
					renderer : function(value,data) {
						return value.name;
					},
					dataIndex : 'releasing_team'
				}/*,{
					text : i18n.__('Home'),
					cellWidth:36,
					renderer : function(value,data) {
						return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'" class="text-right"><img src="/images/clubs/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/></a>';
					},
					dataIndex : 'team1'
				},{
					text : i18n.__('Away'),
					cellWidth:36,
					align:'left',
					renderer : function(value,data) {
						return '<a data-item-id="'+value.id+'" href="/team/'+value.id+'/" title="'+value.name+'"><img src="/images/clubs/20_20/'+value.id +'.png" height="20" width="20" alt="'+value.name+'"/></a>';
					},
					dataIndex : 'team2'
				}*/,{
					text : i18n.__('To'),
					renderer : function(value,data) {
						return value.name;
					},
					width:150,
					dataIndex : 'taking_team'
				},{
					text : i18n.__('Fee'),
					renderer : function(value,data) {
						return value;
					},
					width:50,
					dataIndex : 'transfer_sum'
				}],
				collection : transfer,
			}]
		}],
		//tpl:'<div class="col-lg-4 flex-height"></div><div class="col-lg-4 flex-height"></div><div class="col-lg-4 flex-height"></div>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			//this.recentMatch();
			//this.table();
			player.fetch();
			match.fetch({});
			transfer.fetch();
			match.on('sync',function(collection){
				console.log(collection);
				fixture.set(collection.at(0).attributes)
				console.log(fixture)
			})
		}
	});
});
