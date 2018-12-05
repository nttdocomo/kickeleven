/**
 * @author nttdocomo
 */
define(function(require) {
	var site = require('./admin').site;
	var NationAdmin = require('./admin').nation;
	var route = Backbone.Router.prototype.route;
	return taurus.klass('taurus.Router', Backbone.Router.extend({
		container : taurus.$body.find('>.container-fluid'),
		initialize : function() {
			this.routeMethods = {};
		},
		routes : site.get_urls(),
		_addRouteMethods : function(path, name) {
			var E = this.constructor.generatePathFunction(path), H = name + "Path";
			this[H] = E;
			return E
		},
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
				router.trigger.apply(router, ['route:' + name].concat(args));
				router.trigger('route', name, args);
				Backbone.history.trigger('route', router, name, args);
				//router.currentPage && router.currentPage.remove();
				//router.currentPage = null;
			});
			return this;
		}
	}, {
		generatePathFunction : function(path) {
			var self = this;
			return function(H) {
				var G = self.supplantPath(path, H);
				if (G === false && !taurus.isTestEnv) {
					console.error("Failed to generate a path", path, H)
				}
				return G
			}
		},
		supplantPath : function(J, L) {
			var F = J.split("#").join("/#").split("/"), E = [];
			for (var I = 0; I < F.length; I++) {
				var H = F[I], G = false;
				if (H.charAt(0) === "#") {
					H = H.slice(1);
					G = true
				}
				if (H.charAt(0) === ":") {
					var K = H.slice(1);
					if ( typeof L[K] === "undefined") {
						return false
					} else {
						H = L[K];
						if ( typeof H === "function") {
							H = H.call(L)
						}
						H = encodeURIComponent(H)
					}
				}
				if (G) {
					H = "#" + H
				}
				E.push(H)
			}
			return E.join("/").split("/#").join("#")
		}
	}));
});