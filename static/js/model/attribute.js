/**
 * @author nttdocomo
 */
define(function(require) {
	var ATTRIBUTES = ["acceleration","aerial_ability","aggression","agility","anticipation","balance","bravery",
    "command_of_area","communication","composure","consentration","corners","creativity","crossing","desisions",
    "determination","dribbling","eccentricity","finishing","first_touch","flair","free_kicks","handling",
    "heading","influence","jumping","kicking","long_shots","long_throws","marking","natural_fitness",
    "off_the_ball","one_on_ones","pace","penalty_taking","passing","positioning","reflexes","rushing_out",
    "stamina","strength","tackling","teamwork","technique","tendency_to_punch","throwing","work_rate"];
	return taurus.klass('taurus.model.Attribute', Backbone.Model.extend({
		url:function(){
			return '/api?method=attribute.get&player='+this.get('player').id;
		},
		get_technical:function(){
			if(this.get('player').isGk()){
				return this.pick('aerial_ability','command_of_area','communication','eccentricity','first_touch','free_kicks','handling','kicking','one_on_ones','penalty_taking','reflexes','rushing_out','tendency_to_punch','throwing')
			}
			return this.pick('corners','dribbling','free_kicks','long_throws','long_shots','first_touch','crossing','finishing','heading','marking','passing','penalty_taking','tackling','technique')
		},
		get_mental:function(){
			return this.pick('aggression','anticipation','bravery','composure','consentration','creativity','desisions','determination','flair','influence','off_the_ball','positioning','teamwork','work_rate')
		},
		get_physical:function(){
			return Backbone.Model.prototype.pick.apply(this,['acceleration','agility','balance','jumping','natural_fitness','pace','stamina','strength'])
		},
		set:function(object){
			var o = _.object(ATTRIBUTES, object.attributes);
			o.player = object.player
			Backbone.Model.prototype.set.apply(this,[o])
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return _.object(ATTRIBUTES, resp.rv.attribute.attributes);
			}
			return resp
		},
		getAnalytics:function(){
			var sum = 0;
			_.each(Backbone.Model.prototype.pick.apply(this,arguments),function(value){
				sum += value
			})
			return sum/arguments.length
		}
	}));
})