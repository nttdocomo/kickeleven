/**
 * @author nttdocomo
 */
define(function(require) {
	return taurus.klass('taurus.model.Message', Backbone.Model.extend({
		parse:function(resp){
			if(resp.rv){
				return resp.rv.message
			}
			return resp
		},
		set_readed:function(options){
			if(!this.get('is_readed')){
				this.save({'is_readed':true},$.extend({
					emulateJSON:true,
					url:'/api?method=message.readed',
					type:'POST',
					data:{
						id:this.get('id')
					},
					wait: true
				},options))
			}
		}
	}));
})