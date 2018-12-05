/**
 * @author nttdocomo
 */

define(function(require) {
	var Base = require('../taurus/view/base');
	return taurus.view("taurus.view.MessageDialogContract", Base.extend({
		tpl:['<div class="form-group clearfix"><div class="col-lg-6"><div class="input-group"><span class="input-group-addon">$</span><input type="text" class="form-control" value="<%=wage%>"></div></div>',
		'<div class="col-lg-6"><input type="text" class="form-control" value="<%=type%>"></div></div>',
		'<div class="form-group clearfix"><div class="col-lg-6"><input type="text" class="form-control" value="<%=taurus.Date.formatDate(started,\"yyyy-mm-dd\")%>"></div>',
		'<div class="col-lg-6"><input type="text" class="form-control" value="<%=taurus.Date.formatDate(expires,\"yyyy-mm-dd\")%>"></div></div>',
		'<%if(status == 0){%><div class="btn-toolbar"><button class="btn btn-default">拒绝</button><button class="btn btn-primary">接受</button></div><%}%>'].join(''),
		tagName:'div',
		className:'message-contract',
		initialize : function(options) {
			Base.prototype.initialize.apply(this,arguments)
			this.model.on('change',function(){
				this.html()
			},this)
		},
		events:{
			'click .btn-primary':function(){
				this.model.accept()
			},
			'click .btn-default':function(){
				this.model.reject()
			}
		}
	}))
})