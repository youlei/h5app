define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateMy','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateMy,basePageView,userModel){
	var umodel=new userModel();
	var myView=basePageView.extend({
		events:{
			
			"click #modifyPassword":"gotoModifyPassword",
			"click #myInfo":"gotoMyInfo",
			"click #loginOut":"loginOut",
			"click #myYQM":"clickYQM"
			
			
		},
		clickYQM:function(e){
			var $this=$(e.currentTarget);
			var text= $("#yqm").text();
			window.Native.ctrlC(text);
		},
		loginOut:function(){
			localStorage.clear();
			//localStorage.removeItem("username");
			//localStorage.removeItem("password");
			UC.go("login");
		},
		gotoModifyPassword:function(){
			UC.go("modifyPassword",{anim:true});
		},
		gotoMyInfo:function(){ 
			UC.go('myInfo',{anim:true});
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateMy), 
            	self=this;  
       		self.$el.html(tplYulu());  
       		
        },
        onCreate:function(){
        
       	   this.render();
       	   var version=window.Native.getAppVersion();
       	   $("#currentVersionSpan").text(version);
	       this.header.set({
	   			title:"我的",
	   			view:true,
	   			back:false,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('home');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
        },
        onShow:function(){
        	var self=this;
        	if(!UC.isLogin()){
        		UC.go('login');
        	}
       	  	
       	 umodel.fetch({
				url:UC.actionUrl+"appAccountInfo/myAccountInfo",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){ 
					var myAccountInfo;
					if(obj.attributes){
					 
						myAccountInfo= obj.attributes.myAccountInfo[0];
					}else{
						myAccountInfo= obj.myAccountInfo[0];
					}
					 
					self.$el.find("#username").html(myAccountInfo.accountName);
		       	  	self.$el.find("#company").html(myAccountInfo.theFleet);
		       	  	self.$el.find("#integral").html(myAccountInfo.integral);
		       	  	self.$el.find("#accountMoney").html(myAccountInfo.accountMoney);
		        	self.$el.find("#yqm").html(myAccountInfo.accountName);
		        
		       	  	localStorage.setItem("username",myAccountInfo.accountName);
		       	  	localStorage.setItem("email",myAccountInfo.email);
		       	  	localStorage.setItem("theFleet",myAccountInfo.theFleet);
		       	  	localStorage.setItem("yqm",myAccountInfo.invitationCode);
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
        }
	});
	return myView;
	
});