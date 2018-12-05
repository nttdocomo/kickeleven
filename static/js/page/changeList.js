/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base'),
	i18n = require('../i18n/zh-cn'),
	Breadcrumbs = require('../breadcrumbs'),
	LiveSearchGridPanel = require('../panel/liveSearchGridPanel'),
	Table = require('../taurus/panel/table');
	return Base.extend({
		tpl:'<div class="col-lg-12 flex-height"><a class="btn btn-primary" href="/admin/#<%=model%>/add/">' + i18n.__("Add") + '</a></div>',
		uiClass:'change-list',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var opts = {
				uiClass:'flex-height',
				title:this.title,
				columns : this.columns,
				collection : this.collection,
				renderTo:this.$el.find('.col-lg-12'),
				operation:'prepend',
				events:this.events,
				pager:true
			};
			if(this.search_fields){
				new LiveSearchGridPanel($.extend(opts,{
					search_fields:this.search_fields,
				}));
			} else {
				new Table(opts);
			}
			new Breadcrumbs({
				breadcrumbs:[{
					text:'Home',
					href:'/admin/#home'
				},{
					text:this.title,
					active:true
				}],
				renderTo:this.$el.find('.col-lg-12'),
				operation:'prepend'
			});
		},
		getTplData:function(){
			return {
				model:this.title.toLowerCase()
			};
		}
	});
});
