/**
 * @author nttdocomo
 */
define(function(require) {
	require('../collection/player');
	return taurus.klass('taurus.model.Application', Backbone.RelationalModel.extend({
		relations: [{
			type: Backbone.HasMany,
			key: 'accept_admin',
			relatedModel: 'taurus.model.Player',
			collectionType: 'taurus.collection.Player'
		},{
			type: Backbone.HasMany,
			key: 'reject_admin',
			relatedModel: 'taurus.model.Player',
			collectionType: 'taurus.collection.Player'
		}],
		url:'/api/application/',
		accept:function(){
			this.save({
				'id':this.id
			},{
				emulateJSON:true,
				url:'/api/application/accept/',
				type:'PUT',
				data:{
					'id':this.id
				}
			})
		},
		reject:function(){
			this.save({
				'id':this.id
			},{
				emulateJSON:true,
				url:'/api/application/reject/',
				type:'PUT',
				data:{
					'id':this.id
				}
			})
		}
	}));
})