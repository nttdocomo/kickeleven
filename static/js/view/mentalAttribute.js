/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./attribute');
	taurus.augmentString('taurus.templates.views.mentalattribute', ['<table class="table table-bordered"><caption>Metal Attributes</caption><tbody>',
	'<tr><th>aggression</th><td><%=aggression%></td></tr>',
	'<tr><th>anticipation</th><td><%=anticipation%></td></tr>',
	'<tr><th>bravery</th><td><%=bravery%></td></tr>',
	'<tr><th>composure</th><td><%=composure%></td></tr>',
	'<tr><th>concentration</th><td><%=concentration%></td></tr>',
	'<tr><th>creativity</th><td><%=creativity%></td></tr>',
	'<tr><th>decisions</th><td><%=decisions%></td></tr>',
	'<tr><th>determination</th><td><%=determination%></td></tr>',
	'<tr><th>flair</th><td><%=flair%></td></tr>',
	'<tr><th>influence</th><td><%=influence%></td></tr>',
	'<tr><th>off_the_ball</th><td><%=off_the_ball%></td></tr>',
	'<tr><th>positioning</th><td><%=positioning%></td></tr>',
	'<tr><th>teamwork</th><td><%=teamwork%></td></tr>',
	'<tr><th>work_rate</th><td><%=work_rate%></td></tr>',
	'</tbody></table>'].join(''));
	return taurus.view('taurus.views.MentalAttribute',Base.extend())
})
