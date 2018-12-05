/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	i18n = require('../i18n/{locale}');
	return Base.extend({
		tpl:['<div class="row"><div class="col-lg-3">no.</div><div class="col-lg-6"><img class="js-action-profile-avatar" src="/images/players/<%=id%>.png" alt=""></div><div class="col-lg-3 text-right">age<h3><%=age%></h3><%=date_of_birth%></div></div>',
		'<div class="row"><div class="col-lg-12 text-center"><%=team%></div></div>',
		'<div class="row"><div class="col-lg-4"></div><div class="col-lg-4 text-center"><%=nation_flag%></div><div class="col-lg-4"></div></div>',
		'<div class="row"><div class="col-lg-4">weight</div><div class="col-lg-4 text-center"><h4><%=height%>cm</h4>height</div><div class="col-lg-4 text-center"><h4><%=foot%></h4>footed</div></div>'].join(''),
        className:'profile-details',
        initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.model.on('sync',function(){
				this.html();
			},this);
		},
		getTplData:function(){
			var data = this.model.toJSON();
			data.age = taurus.Date.getAge(data.date_of_birth, 'yyyy-mm-dd');
			data.date_of_birth = moment(data.date_of_birth).format('D/M/YYYY');
			data.nation_flag = data.nation ? '<img class="js-action-profile-avatar" src="/images/nations/'+data.nation.id+'.png" alt="">':'';
			data.height = data.height ? data.height:'';
			data.foot = data.foot ? data.foot:'';
			data.team = data.team ? '<a href="/team/'+data.team.id+'/">Contacted to '+data.team.team_name+'</a>':'';
			return $.extend(Base.prototype.getTplData.apply(this,arguments),data);
		}
	});
});
