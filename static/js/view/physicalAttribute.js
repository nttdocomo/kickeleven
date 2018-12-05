/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./attribute');
	taurus.augmentString('taurus.templates.views.physicalattribute', ['<table class="table table-bordered"><caption>Physical Attributes</caption><tbody>',
	'<tr><th>acceleration</th><td><%=acceleration%></td></tr>',
	'<tr><th>agility</th><td><%=agility%></td></tr>',
	'<tr><th>balance</th><td><%=balance%></td></tr>',
	'<tr><th>jumping</th><td><%=jumping%></td></tr>',
	'<tr><th>natural_fitness</th><td><%=natural_fitness%></td></tr>',
	'<tr><th>pace</th><td><%=pace%></td></tr>',
	'<tr><th>stamina</th><td><%=stamina%></td></tr>',
	'<tr><th>strength</th><td><%=strength%></td></tr>',
	'</tbody></table>'].join(''));
	return taurus.view('taurus.views.PhysicalAttribute',Base.extend())
})
