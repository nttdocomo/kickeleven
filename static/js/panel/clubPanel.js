/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/panel/panel'),
	Profile = require('../view/clubMiniProfile');
	return Base.extend({
		className:'panel panel-default table-panel club-panel',
		html:function(){
			Base.prototype.html.apply(this,arguments);
		},
		getTplData:function(){
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				title:this.model.get('club_name'),
				content: (new Profile({
					model:this.model,
					renderTo:this.$el.find('.panel-body')
				})).html(),
				id:this.model.id
			});
		}
	});
});
