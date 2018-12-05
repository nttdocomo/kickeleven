/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	require('../taurus/lang/date');
	require('../taurus/moment');
	return taurus.view('taurus.views.ClubMiniProfile',Base.extend({
		/*tpl:['<div class="media"><span class="pull-left"><img data-src="holder.js/260x180" alt="260x180" style="width:112px; height:112px;" src="'+taurus.BLANK_IMAGE_URL+'"></span>',
		'<div class="media-body"><ul class="table-ul"><%=list%></ul></div></div>'].join(''),*/
		tpl:['<img data-src="holder.js/300x200" alt="..." src="/static/tmp/<%=logo%>/"><div class="caption"><img data-src="holder.js/300x200" alt="..." src="/static/tmp/<%=nation_flag%>/" width="72" height="44">',
		'</div><div class="row profile-items"><%_.each(info,function(item,name){%><div class="col-lg-12 profile-item"><%=_.i18n.__(name.replace(/(^[a-z]|_[a-z])/ig,function($1){return $1.toUpperCase().replace("_"," ")}))%><h4><%=item%></h4></div><%})%></div>'].join(''),
        className:'player-mini-profile thumbnail',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			//this.listenTo(this.model,'change:year_founded',this.update)
			//this.listenTo(this.model,'change:nation',this.html)
		},
		getTplData:function(){
			var json = this.model.toJSON();
			json.logo = json.normal_logo;
			json.nation_flag = json.nation.normal_flag;
			json.year_founded = moment(json.year_founded).year();
			json.info = _.pick(json,'year_founded');
			/*json.age = taurus.Date.getAge(json.date_of_birth, 'yyyy-mm-dd')
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
			}*/
			return json;
		}
	}));
});
