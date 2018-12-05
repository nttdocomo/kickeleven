/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/panel/table');
	var Table = require('../taurus/view/tableBody');
	return taurus.view('taurus.panel.PlayerTablePanel',Base.extend({
		className:'panel panel-default table-panel player-list',
		title:i18n.__('Player'),
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.collection.on('sync',function(){
				this.html();
			},this)
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
