/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./attribute');
	taurus.augmentString('taurus.templates.views.technicalattribute', ['<table class="table table-bordered"><caption>Technical</caption><tbody>',
	'<tr><th>corners</th><td><%=corners%></td></tr>',
	'<tr><th>crossing</th><td><%=crossing%></td></tr>',
	'<tr><th>dribbling</th><td><%=dribbling%></td></tr>',
	'<tr><th>finishing</th><td><%=finishing%></td></tr>',
	'<tr><th>first_touch</th><td><%=first_touch%></td></tr>',
	'<tr><th>free_kicks</th><td><%=free_kicks%></td></tr>',
	'<tr><th>heading</th><td><%=heading%></td></tr>',
	'<tr><th>long_shots</th><td><%=long_shots%></td></tr>',
	'<tr><th>long_throws</th><td><%=long_throws%></td></tr>',
	'<tr><th>marking</th><td><%=marking%></td></tr>',
	'<tr><th>passing</th><td><%=passing%></td></tr>',
	'<tr><th>penalty_taking</th><td><%=penalty_taking%></td></tr>',
	'<tr><th>tackling</th><td><%=tackling%></td></tr>',
	'<tr><th>technique</th><td><%=technique%></td></tr>',
	'</tbody></table>'].join(''));
	return taurus.view('taurus.views.TechnicalAttribute',Base.extend())
})
