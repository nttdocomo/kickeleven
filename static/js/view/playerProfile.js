/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./profile');
	return taurus.view('taurus.view.PlayerProfile',Base.extend({
		getTplData : function() {
			var data = Base.prototype.getTplData.apply(this,arguments),json = {};
			json.items = [
				{
					name:'国籍',
					value:(function(){
						return _.map(data.nationality,function(nation){
							return nation.nation_name
						}).join('/')
					})()
				},{
					name:'年龄',
					value:data.date_of_birth ? taurus.Date.getAge(data.date_of_birth, 'yyyy-mm-dd') : '-'
				},{
					name:'生日',
					value:data.date_of_birth ? taurus.Date.formatDate(data.date_of_birth,'yyyy-mm-dd') : '-'
				},{
					name:'身高',
					value:data.height ? data.height : '-'
				},{
					name:'体重',
					value:data.weight ? data.weight : '-'
				}
			]
			return json
		}
	}))
})
