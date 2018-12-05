/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("./taurus/form/field/text"),
		$body = $(".container"),
		Panel = require("./taurus/form/panel"),
		i18n = require('./i18n/{locale}');
	new Panel({
		renderTo : $body,
		title:i18n.__('Create New Account') + '<a href="/login/">('+i18n.__('Login')+')</a>',
		width:350,
		collapsible: true,
		cls:'center-block',
		items:[{
			cls:Text,
			labelAlign:'top',
			name : 'username',
			allowBlank:false,
			fieldLabel : i18n.__('Username')+':'
		},{
			cls:Text,
			labelAlign:'top',
			name : 'email',
			regex:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
			regexText : 'Please input a valid email address',
			fieldLabel : i18n.__('Email')+':'
		},{
			cls:Text,
			id:'id_password',
			labelAlign:'top',
			inputType:'password',
			name : 'password',
			minLength:6,
			fieldLabel : i18n.__('Password')+':'
		},{
			cls:Text,
			labelAlign:'top',
			inputType:'password',
			name : 'password2',
			validator:function(value){
				return value === $('#id_password').data('component').getValue() || 'The confirm password must be the same as password';
			},
			fieldLabel : i18n.__('Repeat password')+':'
		}],
		buttons: [{
            text: i18n.__('Save'),
            className:'btn-primary',
            handler: function() {
            	var me = this;
                if(this.getForm().isValid()){
                	$.ajax({
                		url:'/register/',
                		type:'POST',
                		dataType:'json',
                		data:this.getForm().getValues(),
                		success:function(resp){
                			require.async('./taurus/tip/alert',function(Alert){
                				new Alert({
                					type:'success',
                					text:'The email has been sent to your email, please check your email and active your account',
                					dismissable:true,
                					renderTo:me.$el.find('.panel-body'),
                					operation:'prepend'
                				});
                			});
                		}
                	});
                };
            }
        },{
            text: i18n.__('Cancel'),
            className:'btn-default',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]
	});
});