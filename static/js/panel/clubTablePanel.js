/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/panel/table');
	var Table = require('../taurus/view/tableBody');
	return taurus.view('taurus.panel.ClubTablePanel',Base.extend({
		className:'panel panel-default table-panel club-list',
		title:i18n.__('Club'),
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.collection.on('sync',function(){
				this.html();
			},this)
		},
		getTplData:function(){
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				content:(new Table({
					columns : [{
						text : i18n.__('Club Name'),
						flex : 1,
						width : 150,
						sortable : false,
						renderer : function(value,data) {
							return '<a data-item-id="'+data.id+'" href="/#club/'+data.id+'/">'+value+'</a>'
						},
						dataIndex : 'club_name'
					}, {
						text : i18n.__('Nation'),
						width : 100,
						sortable : true,
						renderer : function(value) {
							if(value){
								return value.nation_name
							} else {
								return '-'
							}
						},
						dataIndex : 'nation'
					}],
					collection : this.collection
				})).html()
			})
		}/*,
		html:function(){
			Base.prototype.html.apply(this,arguments)
			new Table({
				columns : [{
					text : i18n.__('Full Name'),
					flex : 1,
					width : 150,
					sortable : false,
					renderer : function(value,data) {
						return '<a data-item-id="'+data.id+'" href="/#player/'+data.id+'/">'+value+'</a>'
					},
					dataIndex : 'full_name'
				}, {
					text : i18n.__('Nation'),
					width : 100,
					sortable : true,
					renderer : function(value) {
						var result = [];
						if(value){
							if(value.length === 1){
								return value[0].nation_name
							} else {
								_.each(value,function(item){
									result.push(item.nation_name)
								})
								return result.join('/')
							}
						} else {
							return '-'
						}
					},
					dataIndex : 'nation'
				}],
				collection : this.collection,
				renderTo:this.$el
			})
		}*/
	}))
})
