/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	require('../taurus/lang/date');
	return taurus.view('taurus.views.Player',Base.extend({
		/*tpl:['<div class="media"><span class="pull-left"><img data-src="holder.js/260x180" alt="260x180" style="width:112px; height:112px;" src="'+taurus.BLANK_IMAGE_URL+'"></span>',
		'<div class="media-body"><ul class="table-ul"><%=list%></ul></div></div>'].join(''),*/
		tpl:['<div class="row"><div class="col-lg-3">号码<br/><%=number.number%></div><div class="col-lg-6"><img data-src="holder.js/140x180" alt="260x180" src="/image/<%=avatar%>/"><br/><a href="/#club/<%=club.id%>/"><%=club.club_name%></a><br/><img src="/image/72/44/<%=nation_flag%>/"/></div><div class="col-lg-3">年龄<br/><%=age%><br/><%=date_of_birth%></div></div>',
		'<div class="row"><div class="col-lg-4"><%=contract.wage%><br/>周薪</div><div class="col-lg-4"><%=expires%><br/>到期</div><div class="col-lg-4">身价</div></div>',
		'<div class="row"><div class="col-lg-4"><%=height%><br/>身高</div><div class="col-lg-4"><%=weight%><br/>体重</div><div class="col-lg-4"><%=prefered_foot%><br/>惯用脚</div></div>'].join(''),
		className:'profile',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			//this.listenTo(this.model,'change:year_founded',this.update)
			//this.listenTo(this.model,'change:nation',this.html)
		},
		getTplData:function(){
			var json = this.model.toJSON();
			json.age = taurus.Date.getAge(json.date_of_birth, 'yyyy-mm-dd')
			json.date_of_birth = taurus.Date.formatDate(json.date_of_birth,'yyyy-mm-dd')
			json.nation_flag = json.nation[0].flag
			json.expires = taurus.Date.formatDate(json.contract.expires,'yyyy-mm-dd')
			var prefered_foot = json.prefered_foot
			json.prefered_foot = '右脚'
			if(prefered_foot[0] > prefered_foot[1]){
				json.prefered_foot = '左脚'
				if(prefered_foot[1] > 14){
					json.prefered_foot = '左右开弓'
				}
			}
			return json
		}
	}))
})
