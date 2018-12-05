/**
 * @author nttdocomo
 */
define(function(require){
	var Dialog = require('../taurus/widget/dialog');
	ProfileHeader = require('../view/profileHeader');
	TransferHistory = require('../view/transferHistory');
	return Dialog.extend({
		initialize:function(){
			Dialog.prototype.initialize.apply(this,arguments);
			new ProfileHeader({
				model:this.model,
				renderTo:this.$el.find('.modal-body')
			});
			new TransferHistory({
				model:this.model,
				renderTo:this.$el.find('.modal-body')
			})
			this.$el.addClass('profile-popup-container')
			this.model.get('transfer').on('sync',this.position,this)
		}
	});
});
