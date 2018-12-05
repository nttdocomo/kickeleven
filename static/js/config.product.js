/**
 * @author nttdocomo
 */
var static = "http://localhost:8080/static/",
config = {
	base:"/static/js/",
	static:static,
	resource:static + "resources/",
	imgsuffix:".webp"
}
var WebP=new Image();
WebP.onload=WebP.onerror=function(){
	if(WebP.height!=2){
		//PNG
	}
};
WebP.src='data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
seajs.config({
	base : 'http://'+location.host+'/static/js/',
	alias : {
		"moment":"taurus/moment",
		"jquery" : "taurus/jquery",
		"backbone" : "taurus/backbone",
		"underscore" : "taurus/underscore",
		"backbone-pageable" : "taurus/backbone-pageable",
		"jquery.ui.position" : "taurus/jquery.ui.position"
	},
	map : [['http://www.kick11.us/static/js/taurus', 'http://taurus.kick11.us/src']],
	vars : {
		'locale' : (navigator.language || navigator.browserLanguage).toLowerCase()
	},
});
seajs.use("/static/js/main");