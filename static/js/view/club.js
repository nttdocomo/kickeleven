/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base');
	return taurus.view('taurus.views.Club',Base.extend({
		tpl:['<p><img data-src="holder.js/120x120" alt="120x120" style="width:120px; height:120px;" src="<%if(typeof(logo) !== "undefined"){%>/image/120/120/<%=logo%>/<%}else{%>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAADHklEQVR4Xu3XQU7qYABGUR2xMZbNmpgz0mDSiKTQXi2VkvOG8kl99z9p4f14PH68+afAzALvwMwsZfZVABgQUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLGBgGUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLGBgGUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLGBgGUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLGBgGUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLGBgGUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLGBgGUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLGBgGUgFgUi5jYBhIBYBJuYyBYSAVACblMgaGgVQAmJTLePNgDofD1ynu9/vR0xx7ffjZ8Au3fnfsDde+3rMR3TSYy4MfO/Sx168PfArA5YGtfb1nw3L+ezYN5vwfuHXg55/vdru30+n04w70FzD/cb1nQwPMxSNtwHQJ7fpxtzZQYBYucO8zyvkxNXVHGXt97M40/NlLX2/hHA9/u5e+w1zXmwPo3mNn6pH02+s9/JQXvMDLgrl1R5hzx6l3mLEPxsOH8KnrLXiWq7zVpsHM+Xp875vS9dfqqc8wS19vlRNe+CKbBrNwC283owAwMyKZfBcAhoZUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TIGhoFUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TIGhoFUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TIGhoFUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TIGhoFUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TIGhoFUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TIGhoFUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TIGhoFUAJiUyxgYBlIBYFIuY2AYSAWASbmMgWEgFQAm5TL+BPn285fsB0YAAAAAAElFTkSuQmCC<%}%>"></p>',
	'<p><img data-src="holder.js/50x50" alt="50x50" style="width:50px; height:50px;" src="/image/50/50/<%=division.logo%>/"><br/><%=division.division_name%><br/><img data-src="holder.js/18x12" alt="18x12" style="width:18px; height:12px;" src="/image/18/12/<%=nation.flag%>/"> <%=nation.nation_name%></p>',
	'<p><span><%=year_founded%></span><br><small>创立时间</small></p>'].join(''),
		className:'profile',
		getTplData:function(){
			return {
				'club_name':this.model.get('club_name'),
				'division':this.model.get('division'),
				'nation':this.model.get('nation'),
				'year_founded':(new Date(this.model.get('year_founded'))).getFullYear(),
				'logo':this.model.get('logo')
			};
		}
	}))
})
