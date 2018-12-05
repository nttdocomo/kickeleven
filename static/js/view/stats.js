/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		tpl:['<ul class="stat-list"><%_.each(stats,function(stat){%><li class="stat"><span class="stat-label"><%=stat.label%></span><span class="stat-value"><%=stat.value%></span></li><%})%></ul>'].join(''),
        className:'stats pull-left',
		getTplData:function(){
			return {
				stats:[{
					label:i18n.__('Age'),
					value:taurus.Date.getAge(this.model.get('date_of_birth'), 'yyyy-mm-dd')
				},{
					label:i18n.__('Height'),
					value:this.model.get('height')
				},{
					label:i18n.__('Nation'),
					value:this.model.get('nation').full_name
				}]
			}
		}
	});
});
