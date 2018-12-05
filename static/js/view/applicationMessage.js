/**
 * @author nttdocomo
 */

define(function(require) {
	var Base = require('./message');
	return taurus.view("taurus.view.ApplicationMessage", Base.extend({
		tpl:'<div class="stream-item-header"><%=title%><%=status%></div><div class="stream-item-footer"><%=button%></div>',
		initialize:function(){
			var me = this;
			Base.prototype.initialize.apply(this,arguments);
			this.listenTo(this.model.get('application'), 'change', function(){
				me.html()
			})
		},
		toJSON:function(){
			var data = Base.prototype.toJSON.apply(this,arguments)
			var button = '<ul class="tweet-actions js-actions">';
			switch(this.model.get('type')){
				case 1:
					if(!this.model.get('status')){
						if(!this.model.get('application').get('accept_admin').contains(taurus.currentPlayer) && !this.model.get('application').get('reject_admin').contains(taurus.currentPlayer)){
							//button = '<div class="btn-group"><button class="btn btn-primary">允许</button><button class="btn">拒绝</button></div>';
							button += '<li class="js-action-accept"><a href="#"><i class="icon-ok"></i> 允许</a></li><li class="js-action-reject"><a href="#"><i class="icon-remove"></i> 拒绝</a></li>';
						}
					}
			};
			button += '<li class="js-action-reject"><a href="#"><i class="icon-info-sign"></i> 更多信息</a></li></ul>'
			data.button = button;
			data.status = '';
			if(this.model.get('application').get('reject_admin').contains(taurus.currentPlayer)){
				data.status = '<small>（您已经决绝了他的请求）</small>'
			}
			if(this.model.get('application').get('accept_admin').contains(taurus.currentPlayer)){
				data.status = '<small>（您已经同意了他的请求）</small>'
			}
			return data;
		},
		delegateEvents:function(events){
			switch(this.model.get('type')){
				case 1:
					if(!this.model.get('status')){
						if(!this.model.get('application').get('accept_admin').contains(taurus.currentPlayer) && !this.model.get('application').get('reject_admin').contains(taurus.currentPlayer)){
							events = {
								'click .js-action-accept > a':function(e){
									this.model.get('application').accept();
									return false;
								},
								'click .js-action-reject > a':function(e){
									this.model.get('application').reject();
									return false;
								}
							}
						}
					}
			};
			Base.prototype.delegateEvents.call(this,events)
		}
	}))
})