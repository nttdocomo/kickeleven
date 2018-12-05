/**
 * @author nttdocomo
 */
define(function(require){
	var Menu = require('taurus/classic/menu/navbar'),
	kick11 = require('./kick11'),
	Router = require('./route'),
	Backbone = require('backbone'),
	panel,
	clubCreatePanel,
	messageDialog,
	taurus = require('./taurus/taurus'),
	Event = require('./collection/event');
	taurus.augmentObject('taurus',{
		POSITION:['Striker','Attack Midfielder','Midfielder','Defensive Midfielder','Wing Back','Defender','Sweeper','Goalkeeper']
	});
	taurus.itemPathPrefix = '';
	$(document).on('click','.btn-logout',function(){
		var form = document.createElement('form'), input = document.createElement('inpu')
		form.action = '/logout/';
		form.method = 'POST';
		form.innerHTML = '<input type="text" value="'+location.pathname + location.hash+'" name="redirect" />';
		document.body.appendChild(form);
		form.submit();
		return false;
	});
	(new Event()).fetch({
		success:function(collection){
			console.log(collection);
			var items = collection.map(function(model,i,array){
				var item = {
					text:model.get('competition').name,
					href:'/competition/'+model.id+'/'
				}
				return item;
			})
			new Menu({
				renderTo:$('.navbar-collapse'),
				items:[{
					text:'Home',
					href:'/'
				},{
					text:'Player'
				},{
					text:'Competition',
					menuAlign:{
						"my" : "left top",
						"at" : "left bottom",
						"collision" : "none none"
					},
					menu:items
				}]
			});
		}
	})
	new Router;
	var modelFetch = Backbone.Model.prototype.fetch;
    Backbone.Model.prototype.fetch = function(options){
    	options = options ? _.clone(options) : {};
    	var model = this;
    	var error = options.error;
    	options.error = function(resp){
    		require.async('./taurus/widget/prompt',function(Prompt){
    			(new Prompt({
    				'title':'Error',
    				'content':'You got an error, try again?',
	            })).on('confirm',function(){
    				model.fetch(options);
	            }).show();
	        });
	        if (error) error(model, resp, options);
        };
        modelFetch.call(this,options);
    };
	var collectionFetch = Backbone.Collection.prototype.fetch;
    Backbone.Collection.prototype.fetch = function(options){
    	options = options ? _.clone(options) : {};
    	var collection = this;
    	var error = options.error;
    	options.error = function(resp){
    		require.async('./taurus/widget/prompt',function(Prompt){
    			(new Prompt({
    				'title':'Error',
    				'content':'You got an error, try again?',
	            })).on('confirm',function(){
    				collection.fetch(options);
	            }).show();
	        });
	        if (error) error(collection, resp, options);
        };
        collectionFetch.call(this,options);
    }
	Backbone.history.start({pushState: true});
});
