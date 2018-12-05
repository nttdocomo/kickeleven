/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../../taurus/view/base');
	taurus.augmentString('taurus.templates.views.title.player','<%=full_name%>(<%=club_name%>)');
	return taurus.view('taurus.views.title.Player',Base.extend({
		tagName:'h2',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.listenTo(this.model, 'change', this.reset);
		},
		reset:function(){
			this.html()
		},
		toJSON:function(){
			return {
				'full_name':this.model.get('full_name'),
				'club_name':this.model.get('club') != null ? this.model.get('club').get('club_name') : ''
			};
		}
	}))
})
