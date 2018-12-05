/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base'),
	Panel = require('../taurus/form/panel'),
	Breadcrumbs = require('../breadcrumbs'),
	i18n = require('../i18n/zh-cn');
	return Base.extend({
		tpl:'<div class="col-lg-12"></div>',
		uiClass:'change-view',
		className:'row',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			new Breadcrumbs({
				breadcrumbs:[{
					text:'Home',
					href:'/admin/'
				},{
					text:this.model_name,
					href:'/admin/#'+this.model_name.toLowerCase()+'/'
				},{
					text:i18n.__('Update'),
					active:true
				}],
				renderTo:this.$el.find('.col-lg-12').empty()
			});
			var me = this;
			this.model.once('change',function(){
				new Panel({
					title:i18n.__('Update') + ' ' + me.model_name,
					items:_.map(me.fields,function(field){
						return $.extend(field,{
							value:me.model.get(field.name),
							model:me.model
						});
					}),
					renderTo:me.$el.find('.col-lg-12'),
					buttons:[{
						text:i18n.__('Update'),
						handler:function(){
							me.model.save(this.form.getValues(),{
								wait: true,
								patch: true,
								success:function(){
									Backbone.history.navigate("admin/"+me.model_name.toLowerCase() + '/', true);
								}
							});
						},
						className:'btn-primary',
						disabled:false
					},{
						text:i18n.__('Cancel'),
						handler:function(){
							Backbone.history.navigate("admin/"+me.model_name.toLowerCase() + '/', true);
						},
						className:'btn-default',
						disabled:false
					}]
				});
			});
		}
	});
});
