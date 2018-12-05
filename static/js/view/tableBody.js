/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/tableBody');
	return Base.extend({
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.scrollbar.once('bottom',function(){
				this.collection.requestNextPage();
			})
			this.collection.on('add',function(model){
			})
			this.collection.requestNextPage();
		}
	})
})
