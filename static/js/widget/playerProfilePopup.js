/**
 * @author nttdocomo
 */
define(function(require){
	var Dialog = require('../taurus/widget/dialog');
	var Profile = require('../view/playerMiniProfile');
	return Dialog.extend({
		initialize:function(){
			Dialog.prototype.initialize.apply(this,arguments);
			new Profile({
				model:this.model,
				renderTo:this.$el.find('.modal-body')
			});
			this.model.on('sync', _.bind(this.position,this));
		}
	});
});
