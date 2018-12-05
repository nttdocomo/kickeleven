/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	var Profile = require('../view/club');
	var Table = require('../taurus/view/table');
	return taurus.view('taurus.panel.SquadPanel',Base.extend({
		className:'section section-small club-profile',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var player = this.model.get('squad');
			this.listenTo(this.model, 'change:club_name', function(){
				this.$el.find('.section-header > h3').text(arguments[1] + '的阵容');
			});
			//this.listenTo(player,'change',this.html)
			player.fetch({
				url:'/api?method=club.get.squad'
			});
		},
		afterRender:function(){
			var player = this.model.get('squad'),me = this,columns=[];
			if(_.contains(this.model.get('administrator'), taurus.currentPlayer.id)){
				columns = [{
					text : '',
					width:15,
					sortable : false,
					renderer : function(value) {
						return '<input type="checkbox" />';
					}
				}];
			}
			Array.prototype.push.apply(columns,[{
				text : '姓名',
				flex : 1,
				sortable : false,
				width:100,
				renderer : function(value,data) {
					if(data.club.founder && data.club.founder.id == me.model.id){
						 'data-toggle="tooltip" title="最多可以设置3个管理员"'
					}
					return value + (_.contains(data.administrator, data.id) ? ' <i class="icon-user" data-toggle="tooltip" title="'+(data.club.founder && data.founder.id == me.model.id?"创建者":"管理员")+'"></i>':'');
				},
				dataIndex : 'full_name'
			}, {
				text : '国籍',
				sortable : false,
				width:100,
				renderer : function(value) {
					var result = [];
					if(value){
						if(value.length === 1){
							return value[0].nation.nation_name
						} else {
							_.each(value,function(item){
								result.push(item.nation.nation_name)
							})
							return result.join('/')
						}
					} else {
						return '-'
					}
					
				},
				dataIndex : 'nationality'
			}, {
				text : '身高',
				sortable : false,
				width:100,
				dataIndex : 'height'
			}, {
				text : '体重',
				sortable : false,
				width:100,
				dataIndex : 'weight'
			}, {
				text : '年龄',
				sortable : false,
				width:100,
				renderer : function(value) {
					return taurus.Date.getAge(value, 'yyyy-mm-dd')
				},
				dataIndex : 'date_of_birth'
			}]);
			this.squadTable = new Table({
				columns : columns,
				collection : player,
				height:300,
				renderTo : this.$el.find('.panel-body')
			});
			this.initButtonGroup();
		},
		delegateEvents:function(events){
			events = {
				'click .js-quit-club':'quit',
				'click .js-delete-player':'deletePlayer',
				'click input:checkbox':'onCheckBoxClick',
				'click .js-join-club':'requestToJoinClub'
			};
			//必须是管理员才绑定管理员事件
			if(taurus.currentPlayer.is_founder(this.model)){
				$.extend(events,{
					'click .js-add-admin':'addAdmin',
					'click .js-delete-admin':'deleteAdmin'
				});
			}
			Base.prototype.delegateEvents.call(this,events);
		},
		quit:function(){
			var player, seletedToDelete = this.squadTable.$el.find('.selected');
			if(seletedToDelete.length){
				player = $.map($.makeArray(this.squadTable.$el.find('.selected')),function(item,i){
					return $(item).attr('data-item-id');
				});
			}
			if(this.model.get('player').contains(taurus.currentPlayer)){
				this.model.remove(taurus.currentPlayer);
			}
		},
		deletePlayer:function(){
			var player = $.map($.makeArray(this.squadTable.$el.find('.selected')),function(item,i){
				return Backbone.Relational.store.find(taurus.model.Player,$(item).attr('data-item-id'));
			});
			this.model.remove(player);
		},
		onCheckBoxClick:function(e){
			var $target = $(e.currentTarget),me=this;
			if($target.is(':checked')){
				$target.parents('tr').addClass('selected');
			} else {
				$target.parents('tr').removeClass('selected');
			}
			var player = $.map($.makeArray(this.squadTable.$el.find('.selected')),function(item,i){
				return $(item).attr('data-item-id');
			});
			var id = $target.parents('tr').attr('data-item-id');
			if(_.some(player,function(id){
				return taurus.currentPlayer.id == id;
			})){
				this.$el.find('.js-admin-action').attr('disabled','disabled');
				return true
			} else{
				this.$el.find('.js-admin-action').removeAttr('disabled');
			}
			if(_.some(player,function(id){
				return _.contains(me.model.get('administrator'),parseInt(id));
			})){
				if(!taurus.currentPlayer.is_founder(this.model)){
					this.$el.find('.js-admin-action').attr('disabled','disabled');
				} else {
					this.$el.find('.js-add-admin').attr('disabled','disabled');
				}
			} else{
				this.$el.find('.js-admin-action').removeAttr('disabled');
			}
			if(_.some(player,function(id){
				return !_.contains(me.model.get('administrator'),parseInt(id));
			})){
				this.$el.find('.js-delete-admin').attr('disabled','disabled');
			} else{
				this.$el.find('.js-delete-admin').removeAttr('disabled');
			}
		},
		deleteAdmin:function(){
			
		},
		addAdmin:function(){
			var player = $.map($.makeArray(this.squadTable.$el.find('.selected')),function(item,i){
				return Backbone.Relational.store.find(taurus.model.Player,$(item).attr('data-item-id'));
			});
			if(this.model.get('administrator').length + player.length > 3){
				alert('最多只允许有3个管理员');
			} else {
				this.model.addAdmin(player);
			}
		},
		initButtonGroup:function(){
			var buttonGroup = '<div class="btn-group pull-right">';
			if(this.model.get('squad').contains(taurus.currentPlayer)){
				buttonGroup += '<button class="btn btn-mini js-quit-club">退出球队</button>';
			} else {
				if(this.model.get('administrator') && this.model.get('administrator').length){
					buttonGroup += '<button class="btn btn-mini js-join-club">申请加入球队</button>';
				}
			}
			if(taurus.currentPlayer.is_founder(this.model)){
				buttonGroup += '<button class="btn btn-mini js-add-admin js-admin-action" title="最多可以设置3个管理员">设置管理员</button><button class="btn btn-mini js-delete-admin js-admin-action" title="最多可以设置3个管理员">移除管理员</button>';
			}
			if(taurus.currentPlayer.is_club_admin(this.model)){
				buttonGroup += '<button class="btn btn-mini js-delete-player js-admin-action">删除球员</button>';
			}
			buttonGroup += '</div>';
			this.$el.find('.section-header').prepend(buttonGroup);
		},
		html:function(){
			return Base.prototype.html.call(this,{
				'title':this.model.get('club_name') + '的阵容',
				'content': ''
			});
		}
	}));
});
