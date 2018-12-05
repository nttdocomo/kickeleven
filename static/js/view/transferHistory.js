/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	Transfer = require('../collection/transfer'),
	Table = require('../taurus/panel/table'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
        className:'transfer-history',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var collection = new Transfer();
			this.model.set('transfer',collection);
			collection.fetch({
				data:{
					player:this.model.id
				}
			});
			new Table({
				loading:true,
				hideHeaders:true,
				columns : [{
					text : i18n.__('Season'),
					dataIndex : 'season'
				}, {
					text : i18n.__('Release Team'),
					renderer : function(value,data) {
						return value.team_name;
					},
					dataIndex : 'releasing_team'
				}, {
					text : i18n.__('Take Team'),
					renderer : function(value,data) {
						return value.team_name;
					},
					dataIndex : 'taking_team'
				}, {
					text : i18n.__('Loan'),
					dataIndex : 'loan'
				}, {
					text : i18n.__('Transfer Date'),
					renderer : function(value,data) {
						return moment(value).format('YYYY-MM-DD');
					},
					dataIndex : 'transfer_date'
				}],
				collection : collection,
				renderTo:this.$el
			});
		}
	});
});
