/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	i18n = require('../taurus/i18n'),
	moment = require('moment');
	return Base.extend({
		tpl:['<div class="row"><div class="col-lg-12"><%=datetime%></div></div><div class="row"><div class="col-lg-5 text-right"><a href="/team/<%=team1.id%>/"><img src="/images/team/<%=team1.id%>.png" alt="<%=team1.team_name%>"/></a></div><div class="col-lg-1 text-center"><h2><%=score1%></h2></div>',
		'<div class="col-lg-1 text-center"><h2><%=score2%></h2></div><div class="col-lg-5 text-left"><a href="/team/<%=team2.id%>/"><img src="/images/team/<%=team2.id%>.png" alt="<%=team2.name%>"/></a></div></div>',].join(''),
        className:'overview',
        initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.model.on('sync',function(){
				this.renderHtml();
			},this);
		},
		getTplData:function(){
			var data = this.model.toJSON();
			if(!data.team1 || !data.team2){
				return false;
			}
			data.datetime = moment(data.play_at).format('YYYY-MM-DD HH:mm:ss')
			return $.extend(Base.prototype.getTplData.apply(this,arguments),data);
		}
	});
});
