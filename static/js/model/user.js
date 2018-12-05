/**
 * @author nttdocomo
 */
define(function(require) {
	require('../taurus/lang/date');
	require('../collection/statistic');
	return taurus.klass('taurus.model.User', Backbone.RelationalModel.extend({
		relations: [{
			type: Backbone.HasOne,
			key: 'player',
			relatedModel: 'taurus.model.Player',
			reverseRelation: {
				type: Backbone.HasOne,
				key: 'user'
				// 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
			}
		}],
		url:function(){
			return '/api/get/user/?id='+this.id;
		},
		save:function(key, val, options){
			var attrs, current, done;
			// Handle both `"key", value` and `{key: value}` -style arguments.
			if (key == null || _.isObject(key)) {
				attrs = key;
				options = val;
			} else if (key != null) {
				(attrs = {})[key] = val;
			}
			Backbone.Model.prototype.save.apply(this,[attrs, $.extend(options,{
				emulateJSON:true,
				url:'/user/edit/'
			})])
		}
	}));
})