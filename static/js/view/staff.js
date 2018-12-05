 /**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	taurus.augmentString('taurus.templates.views.staff', ['<div class="media"><span class="pull-left"><img data-src="holder.js/260x180" alt="260x180" style="width:112px; height:112px;" src="'+taurus.BLANK_IMAGE_URL+'"></span>',
	'<div class="media-body"><div class="row-fluid"><div class="span6"><div class="stat-block"><h6>出生日期</h6><h3><%=date_of_birth%></h3></div></div>',
	'<div class="span6"><div class="stat-block"><h6>国籍</h6><h3><%=nation.nickname%></h3></div></div></div>',
	'</div></div>'].join(''));
	return taurus.view('taurus.views.Staff',Base.extend({
		className:'profile',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.model.on('change',function(){
				me.html()
			},this)
		},
		toJSON:function(){
			var data = Base.prototype.toJSON.apply(this,arguments);
			data.date_of_birth = taurus.Date.formatDate(data.date_of_birth,'yyyy-mm-dd');
			return data;
		}
	}))
})
