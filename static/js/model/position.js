/**
 * @author nttdocomo
 */
define(function(require) {
	taurus.augmentObject('k11.SIDE', [{
		value:0,
		text:'Left'
	},
	{
		value:1,
		text:'Center'
	},
	{
		value:2,
		text:'Right'
	}]);
	taurus.augmentObject('k11.POSITION',[{
		value:0,
		text:'Striker'
	},
	{
		value:1,
		text:'Attack Midfielder'
	},
	{
		value:2,
		text:'Midfielder'
	},
	{
		value:3,
		text:'Defensive Midfielder'
	},
	{
		value:4,
		text:'Wing Back'
	},
	{
		value:5,
		text:'Defender'
	},
	{
		value:6,
		text:'Sweeper'
	},
	{
		value:7,
		text:'Goalkeeper'
	}]);
	return taurus.klass('taurus.model.Position', Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/position/';
			} else {
				return '/api/position/?id=' + this.id;
			}
		},
		parse : function(resp) {
			if(resp.rv){
				return resp.rv.position;
			}
			return resp
		}
	}));
});