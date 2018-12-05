/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../taurus/view/base'),
	Transfer = require('../collection/transfer'),
	Table = require('../taurus/view/table'),
	i18n = require('../taurus/i18n'),
	moment = require('moment');
	return Base.extend({
		tpl:'<%_.each(transfers,function(transfer){%><div class="transfer-summary"><div class="content"><a class="js-player-profile-link user-thumb" href="/#player/<%=transfer.player_id%>/" data-player-id="<%=transfer.player_id%>"><img class="avatar js-action-profile-avatar" src="<%=transfer.player_img%>" alt="">\
      <span class="account-group-inner js-action-profile-name" data-player-id="<%=transfer.player_id%>">\
        <b class="fullname"><%=transfer.player.name%></b>\
      </span>\
    </a><div class="transfer-date"><%=transfer.transfer_date%></div></div></div><%})%>',
        className:'recent-trasfers',
        initialize:function(){
        	Base.prototype.initialize.apply(this,arguments);
        	this.collection.on('sync',function(){
        		this.renderHtml();
        	},this)
        },
		getTplData:function(){
			var transfers = this.collection.map(function(transfer){
				transfer.set('transfer_date',moment(transfer.get('transfer_date')).format(i18n.__("MMM DD, YYYY")))
				return $.extend(transfer.toJSON(),{
					player_img:taurus.getImagePath('player',transfer.get('player').id,48)
				})
			})
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				transfers:transfers
			});
		}
	});
});
