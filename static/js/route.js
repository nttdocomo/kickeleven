/**
 * @author nttdocomo
 */
define(function(require) {
	//var site = require('./admin/admin').site,
	//patterns = require('./admin/admin').patterns,
	var Backbone = require('backbone'),
	route = Backbone.Router.prototype.route;
	return Backbone.Router.extend({
		container : taurus.$body.find('>.container-fluid'),
		initialize : function() {
			this.routeMethods = {};
			this.bind('all', this._trackPageview);
			$(document).on('click', 'a',function(e){
				var me = this,referer_url = location.pathname,
				href = $(this).attr('href'),
				protocol = this.protocol + '//';
				if (href.slice(protocol.length) !== protocol) {
					e.preventDefault();
					Backbone.history.navigate(href.replace(/\/Voucher/,''), true);
			    }
				return false;
			})
		},
		_trackPageview : function() {
			var url = Backbone.history.getFragment();
			if(typeof(ga) !== 'undefined'){
				return ga('send', 'pageview', '/' + url);
			}
		},
		routes : /*$.extend(patterns('admin',site.get_urls()),*/{
			"" : "home", // #home
			"home" : "home", // #home
			"player" : "player",
			"club" : "club",
			"club/:id/" : "club",
			"team/:id/" : "team",
			"player/:id/" : "player",
			"match/:id/" : "match",
			"nation" : "nation",
			"nation/:id/" : "nation",
			"competition/:id/" : "competition",
			":page/" : "page", // #playerlist
			":page/:id/" : "overview" // #contractlist
		}/*)*/,
		route : function(route, name, callback) {
			if (!_.isRegExp(route))
				route = this._routeToRegExp(route);
			if (_.isFunction(name)) {
				callback = name;
				name = '';
			}
			if (!callback)
				callback = this[name];
			var router = this;
			Backbone.history.route(route, function(fragment) {
				var args = router._extractParameters(route, fragment);
				callback && callback.apply(router, args);
				//router.trigger.apply(router, ['route:' + name].concat(args));
				router.trigger('route', name, args);
				Backbone.history.trigger('route', router, name, args);
				var active = $('[href="#'+name+'"]');
				if(active.length){
					active.parent().addClass('active').siblings().removeClass('active');
				}
				//router.currentPage && router.currentPage.remove();
				//router.currentPage = null;
			});
			return this;
		},
		home : function() {
			var me = this;
			//var d = taurus.app.switchToPage(Array.prototype.shift.call(arguments),arguments);
			//Backbone.history.navigate("player", true);
			require.async("./page/home", function(Page) {
				me.currentPage = new Page({
					renderTo : me.container.empty()
				});
			});
		},
		player:function(id){
			var me = this,
			page = id ? "./page/player/index" : "./page/player",
			options = {
				renderTo : me.container.empty()
			};
			if(id){
				$.extend(options,{
					id:id
				});
			}
			require.async(page, function(Page) {
				new Page(options);
			});
		},
		match:function(id){
			var me = this,
			page = id ? "./page/match/index" : "./page/match",
			options = {
				renderTo : me.container.empty()
			};
			if(id){
				$.extend(options,{
					id:id
				});
			}
			require.async(page, function(Page) {
				new Page(options);
			});
		},
		club:function(id){
			var me = this,
			page = id ? "./page/club/index" : "./page/club",
			options = {
				renderTo : me.container.empty()
			};
			if(id){
				$.extend(options,{
					id:id
				});
			}
			require.async(page, function(Page) {
				new Page(options);
			});
		},
		team:function(id){
			var me = this,
			page = id ? "./page/team/index" : "./page/team",
			options = {
				renderTo : me.container.empty()
			};
			if(id){
				$.extend(options,{
					id:id
				});
			}
			require.async(page, function(Page) {
				new Page(options);
			});
		},
		nation:function(id){
			var me = this,
			page = id ? "./page/nation/index" : "./page/nation",
			options = {
				renderTo : me.container.empty()
			};
			if(id){
				$.extend(options,{
					id:id
				});
			}
			require.async(page, function(Page) {
				new Page(options);
			});
		},
		competition:function(id){
			var me = this,
			page = id ? "./page/competition/index" : "./page/competition",
			options = {
				renderTo : me.container.empty()
			};
			if(id){
				$.extend(options,{
					id:id
				});
			}
			require.async(page, function(Page) {
				new Page(options);
			});
		},
		page : function(pageName) {
			var me = this,key = _.toArray(arguments).join('');
			//var d = taurus.app.switchToPage(Array.prototype.shift.call(arguments),arguments);
			require.async("./page/" + pageName, function(Page) {
				new Page({
					renderTo : me.container.empty()
				});
			});
			//d.send('new', Array.prototype.slice.apply(arguments))
		},
		overview : function(page, id) {
			var me = this, id = Array.prototype.splice.call(arguments,1,1);
			if(arguments.length == 1){
				Array.prototype.push.call(arguments,"index");
			}
			var path = "./page/"+ Array.prototype.slice.call(arguments,0).join("/");
			require.async(path, function(Page) {
				new Page({
					id : id,
					/*model:new Model({
					 id:id
					 }),*/
					renderTo : me.container.empty()
				});
			});
		}
	});
});