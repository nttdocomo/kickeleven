/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require('backbone');
	require('../collection/player');
	require('../collection/nation');
	return Backbone.Model.extend({
		url:function(){
			if(this.isNew()){
				return '/api/club/';
			} else {
				return '/api/club/?id=' + this.id;
			}
		},
		parse : function(resp) {
			//if(resp.results && resp.results)
			if(resp.rv){
				return resp.rv.club;
			}
			return resp
		},
		addAdmin:function(player){
			if(!_.isArray(player)){
				player = [player]
			}
			this.model.save({
				'player':$.map(player,function(player,i){
					return player.id
				})
			},{
				wait:true,
				emulateJSON:true,
				url:'/api/club/administrator/',
				type:'PUT',
				traditional:true,
				data:{
					'player':$.map(player,function(player,i){
						return player.id
					})
				}
			})
		},
		removeAdmin:function(player){
			if(!_.isArray(player)){
				player = [player]
			}
			this.model.save({
				'player':$.map(player,function(player,i){
					return player.id
				})
			},{
				wait:true,
				emulateJSON:true,
				url:'/api/club/administrator/',
				type:'DELETE',
				traditional:true,
				data:{
					'player':$.map(player,function(player,i){
						return player.id
					})
				}
			})
		},
		remove:function(player){
			var me = this;
			if(!_.isArray(player)){
				player = [player]
			}
			this.save({
				'club':this.id,
				'player':$.map(player,function(player,i){
					return player.id
				})
			},{
				wait:true,
				emulateJSON:true,
				url:'/api/club/player/delete/',
				type:'POST',
				traditional:true,
				data:{
					'club':this.id,
					'player':$.map(player,function(player,i){
						return player.id
					})
				}
			});
		}
	});
});