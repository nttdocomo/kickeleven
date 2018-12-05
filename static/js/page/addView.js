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
		uiClass:'ad-view',
		className:'row',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			new Breadcrumbs({
				breadcrumbs:[{
					text:'Home',
					href:'/admin/#home/'
				},{
					text:this.model_name,
					href:'/admin/#'+this.model_name.toLowerCase()+'/'
				},{
					text:i18n.__('Add'),
					active:true
				}],
				renderTo:this.$el.find('.col-lg-12').empty()
			});
			new Panel({
				title:i18n.__('Add') + this.model_name,
				items:this.fields,
				renderTo:me.$el.find('.col-lg-12'),
				buttons:[{
					text:i18n.__('Add'),
					handler:function(){
						if(this.form.isValid()){
							me.model.save(this.form.getValues(),{
								success:function(){
									Backbone.history.navigate(me.model_name.toLowerCase() + '/', true);
								}
							});
						}
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
		}
	});
});
