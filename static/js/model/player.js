/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	require('../taurus/lang/date');
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/player/' + (this.isAdmin ? '&admin=1':'');
			} else {
				return '/api/player/?id=' + this.id + (this.isAdmin ? '&admin=1':'');
			}
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
			Backbone.Model.prototype.save.apply(this,[attrs, options]);
		},
		toJSON:function(){
			var json = Backbone.Model.prototype.toJSON.apply(this,arguments);
			if(!json.club){
				json.club = undefined;
			}
			return json
		},
		isManager:function(){
			return this.has('manage_club');
		},
		isGk:function(){
			return _.find(this.get('position'),function(item){
				return item.position == 7;
			});
		},
		is_club_admin:function(club){
			return _.contains(club.get('administrator'),this.id);
		},
		is_me:function(){
			return this.id === taurus.currentPlayer.id;
		},
		is_founder:function(club){
			return club.get('founder') && club.get('founder').id == this.id;
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				resp = resp.rv.player;
			};
			if(resp.avatar){
				resp.avatar = '/static/tmp/' + resp.avatar;
			};
			return resp;
		}
	});
});