/**
 * @author nttdocomo
 */
define(function(require, exports) {
	require('../class');
	require('taurus/moment');
	var TextProperty = require('../taurus/form/field/text'),
	SelectProprty = require('../taurus/form/field/comboBox'),
	NumberProperty = require('../taurus/form/field/number'),
	DateTime = require('../taurus/form/field/datetime'),
	FileProprty = require('../taurus/form/field/file'),
	DateProprty = require('../taurus/form/field/date'),
	RadioGroup = require('../taurus/form/radioGroup'),
	Table = require('../taurus/panel/table'),
	Continent = require('../collection/continent'),
	Nation = require('../collection/nation'),
	NationTranslation = require('../collection/nationTranslation'),
	City = require('../collection/city'),
	Team = require('../collection/team'),
	TeamPlayer = require('../collection/team2Player'),
	Match = require('../collection/match'),
	Position = require('../collection/position'),
	Club = require('../collection/club'),
	ClubTranslation = require('../collection/clubTranslation'),
	Player = require('../collection/player'),
	PlayerTranslation = require('../collection/playerTranslation'),
	i18n = require('../i18n/zh-cn'),
	vsprintf = require('../taurus/util/sprintf').vsprintf;
	var patterns = function(prefix, urls){
		_.each(urls,function(fn,url){
			delete urls[url];
			urls[prefix + '/' + url] = fn;
		});
		return urls;
	};
	var AdminSite = Class.extend({
		container : taurus.$body.find('>.container-fluid'),
		init:function(){
			this._registry = [];
		},
		register:function(model_or_iterable, admin_class){
			var me = this;
			if(!admin_class){
				admin_class = ModelAdmin;
			}
			if(model_or_iterable instanceof Backbone.Model){
				model_or_iterable = [model_or_iterable];
			}
			_.each(model_or_iterable,function(model){
				me._registry.push(new admin_class(model, self));
			});
		},
		get_urls:function(){
			var urlpatterns = {
				'':_.bind(this.index,this),
				'home':_.bind(this.index,this)
			};
			_.each(k11.admin,function(model_admin,key){
				$.extend(urlpatterns,patterns(vsprintf('%s', [key.toLowerCase()]),model_admin.get_urls()));
			});
			return urlpatterns;
		},
		index:function(){
			var me = this, model_list = [];
			_.each(k11.admin,function(model_admin,model_name){
				model_list.push({
					'name':model_name,
					'admin_url':'/admin/#' + model_name.toLowerCase() + '/'
				});
			});
			context = {
	            'title': i18n.__('Site administration'),
	            'model_list': model_list
	       };
	        require.async('../page/admin/index',function(Page){
				new Page($.extend(context,{
					renderTo:me.container.empty()
				}));
			});
		}
	});
	var ModelAdmin = Class.extend({
		container : taurus.$body.find('>.container-fluid'),
		init:function(){
			this.model = this.collection.prototype.model;
		},
		changelist_view:function(){
			var me = this;
			require.async('../page/changeList',function(Page){
				var collection = new me.collection();
				collection.isAdmin = true;
				new Page({
					search_fields:me.search_fields,
					title:me.model_name,
					columns : me.columns,
					events:me.events,
					collection : collection,
					renderTo:me.container.empty()
				});
				collection.pager();
			});
		},
		add_view:function(){
			var me = this;
			require.async('../page/addView',function(Page){
				new Page({
					fields:me.fields,
					model_name:me.model_name,
					model : new me.collection.prototype.model,
					renderTo:me.container.empty()
				});
			});
		},
		change_view:function(id){
			var me = this;
			require.async('../page/changeView',function(Page){
				var model = new me.collection.prototype.model({
					id:id
				});
				model.isAdmin = true;
				new Page({
					fields:me.fields,
					model_name:me.model_name,
					model : model,
					renderTo:me.container.empty()
				});
				model.fetch();
			});
		},
		get_urls:function(){
			return {
				"":_.bind(this.changelist_view,this),
				"add/":_.bind(this.add_view,this),
				":id/":_.bind(this.change_view,this)
			};
		}
	});
	var ContinentAdmin = ModelAdmin.extend({
		model_name : 'Continent',
		collection : Continent,
		events:{
			'click .trash':function(e){
				var me = this;
				this.collection.get($(e.target).attr('data-item-id')).destroy({
					success:function(model){
						me.collection.remove(model);
					}
				});
				return false;
			}
		},
		columns : [{
			text : i18n.__('Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#continent/'+data.id+'/">'+value+'</a>';
			},
			dataIndex : 'name'
		},{
			text : i18n.__('Action'),
			sortable : false,
			width:100,
			renderer : function(value,data) {
				return '<a href="" class="halflings trash" data-name="trash" data-type="" data-prefix="halflings" data-utf="E020" data-item-id="'+data.id+'"></a>';
			},
			dataIndex : 'name'
		}],
		fields:[
			{
				cls:TextProperty,
				name : 'name',
				fieldLabel : i18n.__('Name'),
				emptyText:'11111',
				allowBlank:false
			}
		]
	});
	var NationAdmin = ModelAdmin.extend({
		model_name : 'Nation',
		collection : Nation,
		columns : [{
			text : i18n.__('Short Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#nation/'+data.id+'/">'+value+'</a>';
			},
			dataIndex : 'short_name'
		},{
			text : i18n.__('Full Name'),
			flex : 1,
			sortable : false,
			dataIndex : 'full_name'
		},{
			text : i18n.__('Nationality'),
			flex : 1,
			sortable : false,
			dataIndex : 'nationality'
		},{
			text : i18n.__('Normal Flag'),
			flex : 1,
			sortable : false,
			dataIndex : 'normal_flag'
		},{
			text : i18n.__('Small Flag'),
			flex : 1,
			sortable : false,
			dataIndex : 'small_flag'
		}],
		fields:[{
			cls:TextProperty,
			name : 'full_name',
			fieldLabel : i18n.__('Full Name'),
			emptyText:i18n.__('Full Name'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'short_name',
			fieldLabel : i18n.__('Short Name'),
			emptyText:i18n.__('Short Name'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'nationality',
			fieldLabel : i18n.__('Nationality'),
			emptyText:i18n.__('Nationality'),
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'continent_id',
			collection:Continent,
			displayField : 'name',
			valueField:"id",
			fieldLabel : i18n.__('Continent'),
			emptyText:i18n.__('Continent'),
			allowBlank:false
		},{
			cls:FileProprty,
			name : 'normal_flag',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Normal Flag')
		},{
			cls:FileProprty,
			name : 'small_flag',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Small Flag')
		},{
			cls:FileProprty,
			name : 'logo',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Logo')
		}]
	});
	var NationTranslationAdmin = ModelAdmin.extend({
		model_name : 'NationTranslation',
		collection : NationTranslation,
		columns : [{
			text : i18n.__('Language Code'),
			flex : 1,
			sortable : false,
			dataIndex : 'language_code'
		},{
			text : i18n.__('Full Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#nationtranslation/'+data.id+'/">'+value+'</a>';;
			},
			dataIndex : 'full_name'
		},{
			text : i18n.__('Short Name'),
			flex : 1,
			sortable : false,
			dataIndex : 'short_name'
		},{
			text:i18n.__('Capital City'),
			flex : 1,
			sortable : false,
			dataIndex : 'capital_city'
		}],
		fields:[{
			cls:SelectProprty,
			name : 'nation_id',
			displayField : 'full_name',
			valueField: "id",
			collection: Nation,
			fieldLabel : i18n.__('Nation'),
			emptyText:i18n.__('Nation'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'language_code',
			fieldLabel : i18n.__('Language Code'),
			emptyText:i18n.__('Language Code'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'full_name',
			fieldLabel : i18n.__('Full Name'),
			emptyText:i18n.__('Full Name'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'short_name',
			fieldLabel : i18n.__('Short Name'),
			emptyText:i18n.__('Short Name'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'nationality',
			fieldLabel : i18n.__('Nationality'),
			emptyText:i18n.__('Nationality'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'capital_city',
			fieldLabel : i18n.__('Capital City'),
			emptyText:i18n.__('Capital City'),
			allowBlank:false
		}]
	});
	
	var CityAdmin = ModelAdmin.extend({
		model_name : 'City',
		collection : City,
		columns : [{
			text : i18n.__('City Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#city/'+data.id+'/">'+value+'</a>';
			},
			dataIndex : 'city_name'
		},{
			text : i18n.__('Nation'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return value.short_name;
			},
			dataIndex : 'nation'
		}],
		fields:[{
			cls:TextProperty,
			name : 'city_name',
			fieldLabel : i18n.__('City Name'),
			emptyText:i18n.__('City Name'),
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'nation_id',
			collection:Nation,
			displayField : 'full_name',
			valueField:"id",
			fieldLabel : i18n.__('Nation'),
			emptyText:i18n.__('Nation'),
			allowBlank:false
		},{
			cls:RadioGroup,
			name : 'capital',
			fieldLabel : i18n.__('Capital'),
			value:0,
			fields:[{
				inputValue:1,
				boxLabel:i18n.__('Capital City')
			},{
				inputValue:0,
				boxLabel:i18n.__('None Capital City')
			}],
			allowBlank:false
		}]
	});
	var PositionAdmin = ModelAdmin.extend({
		model_name : 'Position',
		collection : Position,
		columns : [{
			text : i18n.__('Position Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#position/'+data.id+'/">'+ _.find(k11.POSITION,function(item){
					return item.value == value;
				}).text + '</a>';
			},
			dataIndex : 'position_name'
		},{
			text : i18n.__('Side'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return _.find(k11.SIDE,function(item){
					return item.value == value;
				}).text;
			},
			dataIndex : 'side'
		},{
			text : i18n.__('Score'),
			flex : 1,
			sortable : false,
			dataIndex : 'score'
		}],
		fields:[{
			cls:SelectProprty,
			name : 'position_name',
			fieldLabel : i18n.__('Position Name'),
			emptyText:'11111',
			displayField : 'text',
			valueField:"value",
			collection:new Backbone.Collection(_.toArray(k11.POSITION)),
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'side',
			fieldLabel : i18n.__('Side'),
			emptyText:'11111',
			displayField : 'text',
			valueField:"value",
			collection:new Backbone.Collection(_.toArray(k11.SIDE)),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'score',
			fieldLabel : i18n.__('Score'),
			emptyText:'11111',
			allowBlank:false
		}]
	});
	var PlayerAdmin = ModelAdmin.extend({
		model_name : 'Player',
		collection : Player,
		search_fields : ['full_name'],
		columns : [{
			text : i18n.__('Full Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#player/'+data.id+'/">'+value+'</a>';;
			},
			dataIndex : 'full_name'
		},{
			text : i18n.__('Short Name'),
			flex : 1,
			sortable : false,
			dataIndex : 'short_name'
		},{
			text : i18n.__('Date Of Birth'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return moment(value).format('YYYY-MM-DD');
			},
			dataIndex : 'date_of_birth'
		}],
		fields:[{
			cls:TextProperty,
			name : 'full_name',
			fieldLabel : i18n.__('Full Name'),
			emptyText:i18n.__('Full Name'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'short_name',
			fieldLabel : i18n.__('Short Name'),
			emptyText:i18n.__('Short Name'),
			allowBlank:false
		},{
			cls:DateProprty,
			name : 'date_of_birth',
			fieldLabel : i18n.__('Date Of Birth'),
			emptyText:i18n.__('Date Of Birth'),
			format:'YYYY-MM-DD',
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'nation_id',
			collection:Nation,
			displayField : 'short_name',
			valueField:"id",
			fieldLabel : i18n.__('Nation'),
			emptyText:i18n.__('Nation'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'height',
			fieldLabel : i18n.__('Height'),
			emptyText:i18n.__('Height'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'weight',
			fieldLabel : i18n.__('Weight'),
			emptyText:i18n.__('Weight'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'left_foot',
			fieldLabel : i18n.__('Left Foot'),
			emptyText:i18n.__('Left Foot'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'right_foot',
			fieldLabel : i18n.__('Right Foot'),
			emptyText:i18n.__('Right Foot'),
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'position',
			collection:Position.extend({
				server_api : {}
			}),
			displayField : 'position_name',
			valueField:"id",
			fieldLabel : i18n.__('Position'),
			emptyText:i18n.__('Position'),
			multiSelect:true,
			displayTpl:'<%_.each(value,function(item,index){%><%=_.find(k11.POSITION,function(position){return position.value == item.position_name}).text%><%if(index < value.length - 1){%>,<%}%><%})%>',
			listConfig:{
				getInnerTpl:function(){
					return '<a href="#" class="boundlist-item"><%=_.find(k11.POSITION,function(position){return position.value == item.position_name}).text%>(<%=_.find(k11.SIDE,function(position){return position.value == item.side}).text%>) - <%=item.score%></a>';
				}
			},
			allowBlank:false
		},{
			cls:FileProprty,
			name : 'avatar',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Avatar')
		}]
	});
	var PlayerTranslationAdmin = ModelAdmin.extend({
		model_name : 'PlayerTranslation',
		collection : PlayerTranslation,
		columns : [{
			text : i18n.__('Full Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#playertranslation/'+data.id+'/">'+value+'</a>';;
			},
			dataIndex : 'full_name'
		},{
			text : i18n.__('Language Code'),
			flex : 1,
			sortable : false,
			dataIndex : 'language_code'
		},{
			text : i18n.__('Short Name'),
			flex : 1,
			sortable : false,
			dataIndex : 'short_name'
		}],
		fields:[{
			cls:SelectProprty,
			name : 'player',
			displayField : 'full_name',
			valueField:"id",
			collection:new Player,
			fieldLabel : i18n.__('Player'),
			emptyText:i18n.__('Player'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'language_code',
			fieldLabel : i18n.__('Language Code'),
			emptyText:i18n.__('Language Code'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'full_name',
			fieldLabel : i18n.__('Full Name'),
			emptyText:i18n.__('Full Name'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'short_name',
			fieldLabel : i18n.__('Short Name'),
			emptyText:i18n.__('Short Name'),
			allowBlank:false
		}]
	});
	var ClubAdmin = ModelAdmin.extend({
		model_name : 'Club',
		collection : Club,
		columns : [{
			text : i18n.__('Club Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#club/'+data.id+'/">'+value+'</a>';;
			},
			dataIndex : 'club_name'
		},{
			text : i18n.__('NickName'),
			flex : 1,
			sortable : false,
			dataIndex : 'nickname'
		},{
			text : i18n.__('Year Founded'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return moment(value).format('YYYY-MM-DD');
			},
			dataIndex : 'year_founded'
		}],
		fields:[{
			cls:TextProperty,
			name : 'club_name',
			fieldLabel : i18n.__('Club Name'),
			emptyText:'11111',
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'nickname',
			fieldLabel : i18n.__('Nickname'),
			emptyText:'11111',
			allowBlank:false
		},{
			cls:DateProprty,
			name : 'year_founded',
			fieldLabel : i18n.__('Year Founded'),
			emptyText:'11111',
			format:'YYYY-MM-DD',
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'nation_id',
			collection:Nation,
			displayField : 'short_name',
			valueField:"id",
			fieldLabel : i18n.__('Nation'),
			emptyText:i18n.__('Nation'),
			allowBlank:false
		},{
			cls:FileProprty,
			name : 'normal_logo',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Normal Logo')
		},{
			cls:FileProprty,
			name : 'small_logo',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Small Logo')
		},{
			cls:FileProprty,
			name : 'home_kit',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Home Kit')
		},{
			cls:FileProprty,
			name : 'away_kit',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Away Kit')
		},{
			cls:FileProprty,
			name : 'third_kit',
			request:{
				endpoint:'/api/upload'
			},
			onComplete:function(id, name, result, xhr){
				this.setValue(result.filename);
			},
			fieldLabel : i18n.__('Third Kit')
		}]
	});
	var ClubTranslationAdmin = ModelAdmin.extend({
		model_name : 'ClubTranslation',
		collection : ClubTranslation,
		columns : [{
			text : i18n.__('Club Name'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#clubtranslation/'+data.id+'/">'+value+'</a>';;
			},
			dataIndex : 'club_name'
		},{
			text : i18n.__('Language Code'),
			flex : 1,
			sortable : false,
			dataIndex : 'language_code'
		},{
			text : i18n.__('NickName'),
			flex : 1,
			sortable : false,
			dataIndex : 'nickname'
		}],
		fields:[{
			cls:SelectProprty,
			name : 'club',
			displayField : 'club_name',
			valueField:"id",
			collection:new Club,
			fieldLabel : i18n.__('Club'),
			emptyText:i18n.__('Club'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'language_code',
			fieldLabel : i18n.__('Language Code'),
			emptyText:i18n.__('Language Code'),
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'club_name',
			fieldLabel : i18n.__('Club Name'),
			emptyText:'11111',
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'nickname',
			fieldLabel : i18n.__('Nickname'),
			emptyText:'11111',
			allowBlank:false
		}]
	});
	var TeamAdmin = ModelAdmin.extend({
		model_name : 'Team',
		collection : Team,
		columns : [{
			text : i18n.__('Nation') + '/' + i18n.__('Club'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				if(data.type == 2){
					return '<a data-item-id="'+data.id+'" href="/admin/#team/'+data.id+'/">'+value.club_name+'</a>';
				}
				return '<a data-item-id="'+data.id+'" href="/admin/#team/'+data.id+'/">'+value.full_name+'</a>';
			},
			dataIndex : 'owner'
		},{
			text : i18n.__('Team Name'),
			flex : 1,
			sortable : false,
			dataIndex : 'team_name'
		}],
		fields:[{
			cls:SelectProprty,
			name : 'owner_id',
			id:'owner_id',
			displayField : 'full_name',
			valueField:"id",
			collection:Nation,
			beforeInitField:function(){
				if(this.model && this.model.get('type') == 2){
					this.collection = Club;
					this.displayField = 'club_name';
				}
			},
			fieldLabel : i18n.__('Nation'),
			emptyText:i18n.__('Nation'),
			allowBlank:false
		},{
			cls:RadioGroup,
			name : 'type',
			fieldLabel : i18n.__('Type'),
			value:1,
			fields:[{
				inputValue:1,
				boxLabel:i18n.__('Nation Team')
			},{
				inputValue:2,
				boxLabel:i18n.__('Club Team')
			}],
			listeners:{
				'change':function(newValue, oldValue){
					var owner = $('#owner_id').data('component');
					if(newValue == "1"){
						owner.clearValue();
						owner.collection = new Nation;
						owner.picker = undefined;
						owner.displayField = 'full_name';
					} else {
						owner.clearValue();
						owner.collection = new Club;
						owner.picker = undefined;
						owner.displayField = 'club_name';
					}
				}
			},
			emptyText:'11111',
			allowBlank:false
		},{
			cls:TextProperty,
			name : 'team_name',
			fieldLabel : i18n.__('Team Name'),
			emptyText:'11111',
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'player',
			collection:Player.extend({
				server_api : {}
			}),
			displayField : 'short_name',
			valueField:"id",
			multiSelect:true,
			fieldLabel : i18n.__('Player'),
			emptyText:i18n.__('Player'),
			displayTpl:'<%_.each(value,function(item,index){%><%=item.short_name%><%if(index < value.length - 1){%>,<%}%><%})%>'
		},{
			cls:NumberProperty,
			name : 'level',
			fieldLabel : i18n.__('Level'),
			emptyText:'请输入数字',
			value:1
		}]
	}),
	MatchAdmin = ModelAdmin.extend({
		model_name : 'Match',
		collection : Match,
		columns : [{
			text : i18n.__('Home'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				if(value.type == 2){
					return '<a data-item-id="'+data.id+'" href="/admin/#match/'+data.id+'/">'+value.owner.club_name+'</a>';
				}
				return '<a data-item-id="'+data.id+'" href="/admin/#match/'+data.id+'/">'+value.owner.full_name+'</a>';
			},
			dataIndex : 'home_team'
		},{
			text : i18n.__('Away'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				if(data.type == 2){
					return '<a data-item-id="'+data.id+'" href="/admin/#match/'+data.id+'/">'+value.owner.club_name+'</a>';
				}
				return '<a data-item-id="'+data.id+'" href="/admin/#match/'+data.id+'/">'+value.owner.full_name+'</a>';
			},
			dataIndex : 'away_team'
		},{
			text : i18n.__('Match Date'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return moment(value).format('YYYY-MM-DD HH:mm:ss');
			},
			dataIndex : 'match_date'
		}],
		fields:[{
			cls:SelectProprty,
			name : 'home_id',
			displayField : 'team_name',
			valueField:"id",
			collection:Team,
			fieldLabel : i18n.__('Home'),
			emptyText:i18n.__('Home'),
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'away_id',
			displayField : 'team_name',
			valueField:"id",
			collection:Team,
			fieldLabel : i18n.__('Away'),
			emptyText:i18n.__('Away'),
			allowBlank:false
		},{
			cls:DateTime,
			name : 'match_date',
			fieldLabel : i18n.__('Match Date'),
			emptyText:i18n.__('Match Date'),
			format:'YYYY-MM-DD HH:mm:ss',
			allowBlank:false
		},{
			cls:SelectProprty,
			name : 'city_id',
			displayField : 'city_name',
			valueField:"id",
			collection:City,
			fieldLabel : i18n.__('City'),
			emptyText:i18n.__('City'),
			allowBlank:false
		},{
			cls:NumberProperty,
			name : 'home_score',
			fieldLabel : i18n.__('Home Score'),
			emptyText:'请输入数字',
			value:0,
            minValue: 0,
            maxValue: 100
		},{
			cls:NumberProperty,
			name : 'away_score',
			fieldLabel : i18n.__('Away Score'),
			emptyText:'请输入数字',
			value:0,
            minValue: 0,
            maxValue: 100
		}]
	}),
	TeamPlayerAdmin = ModelAdmin.extend({
		model_name : 'TeamPlayer',
		collection : TeamPlayer,
		columns : [{
			text : i18n.__('Team'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				if(value.type == 2){
					return '<a data-item-id="'+data.id+'" href="/admin/#teamplayer/'+data.id+'/">'+value.owner.club_name+'</a>';
				}
				return '<a data-item-id="'+data.id+'" href="/admin/#teamplayer/'+data.id+'/">'+value.owner.full_name+'</a>';
			},
			dataIndex : 'team'
		},{
			text : i18n.__('Player'),
			flex : 1,
			sortable : false,
			renderer : function(value,data) {
				return '<a data-item-id="'+data.id+'" href="/admin/#team/'+data.id+'/">'+value.full_name+'</a>';
			},
			dataIndex : 'player'
		}],
		fields:[{
			cls:SelectProprty,
			name : 'team_id',
			displayField : 'team_name',
			valueField:"id",
			collection:Team,
			fieldLabel : i18n.__('Team'),
			emptyText:i18n.__('Team')
		},{
			cls:SelectProprty,
			name : 'player_id',
			displayField : 'full_name',
			valueField:"id",
			collection:Player,
			fieldLabel : i18n.__('Player'),
			emptyText:i18n.__('Player')
		}]
	});
	var site = new AdminSite;
	taurus.klass('k11.admin.continent',new ContinentAdmin);
	taurus.klass('k11.admin.nation',new NationAdmin);
	taurus.klass('k11.admin.nationtranslation',new NationTranslationAdmin);
	taurus.klass('k11.admin.city',new CityAdmin);
	taurus.klass('k11.admin.position',new PositionAdmin);
	taurus.klass('k11.admin.player',new PlayerAdmin);
	taurus.klass('k11.admin.playertranslation',new PlayerTranslationAdmin);
	taurus.klass('k11.admin.club',new ClubAdmin);
	taurus.klass('k11.admin.clubtranslation',new ClubTranslationAdmin);
	//taurus.klass('k11.admin.clubteam',new ClubTeamAdmin);
	taurus.klass('k11.admin.team',new TeamAdmin);
	taurus.klass('k11.admin.teamplayer',new TeamPlayerAdmin);
	taurus.klass('k11.admin.match',new MatchAdmin);
	//taurus.klass('k11.admin.clubteam2player',new ClubTeam2PlayerAdmin);
	exports.site = site;
	exports.continent = ContinentAdmin;
	exports.nation = NationAdmin;
	exports.patterns = patterns;
});
