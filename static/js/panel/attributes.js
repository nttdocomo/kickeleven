/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	var TechnicalAttribute = require('../view/technicalAttribute');
	var MentalAttribute = require('../view/mentalAttribute');
	var PhysicalAttribute = require('../view/physicalAttribute');
	taurus.augmentString('taurus.templates.panel.attributes', '<%=technical_attribute%><%=mental_attribute%><%=physical_attribute%>');
	var technical = []
	return taurus.view('taurus.panel.Attributes',Base.extend({
		className:'row-fluid',
		initialize:function(){
			var me = this;
			Base.prototype.initialize.apply(this,arguments);
			this.model.on('change',function(){
				me.html()
			},this)
		},
		html:function(){
			var attributes = this.model.get('attributes'),technical_attributes = {};
			/*for (var k in attributes){
				if ($.inArray(k,technical)){
					technical_attributes[k] = attributes[k]
				}
			}*/
			if(attributes){
				return Base.prototype.html.call(this,{
					'technical_attribute':(new TechnicalAttribute()).html(attributes),
					'mental_attribute':(new MentalAttribute()).html(attributes),
					'physical_attribute':(new PhysicalAttribute()).html(attributes)
				})
			}
			return "";
		}
	}))
})
