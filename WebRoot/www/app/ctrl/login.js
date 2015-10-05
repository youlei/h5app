define(['jquery','underscore','backbone','text!TemplateLogin','basePageView','userModel'],function(jquery,_,Backbone,TemplateLogin,basePageView,userModel){
		
	  
  	var LoginView=basePageView.extend({
  		events:{
  			"click #login":"login",
  			"click #register":"register",
  			"click #forget":"forget"
  		},
  		login:function(e){
  			UC.go("home",{anim:true});
  			this.showLoading("请求服务器...");
  			var self=this,
  				umodel=new userModel();
  				username=self.$el.find("#username").val(),
  				password=self.$el.find("#password").val();
  				umodel.fetch({
  					url:UC.actionUrl+"appLogin/login",
  					params:{
  						username:username,
  						password:password
  					},
  					success:function(data){
  						self.hideLoading();
  						if(data.attributes.flag){
  							localStorage.setItem("username",username);
  							localStorage.setItem("password",password);
  							UC.go("yulu",{anim:false});
  						}else{
  							self.showAlert("用户名密码错误"); 
  						}
  						
  			  			
  					},
  					error:function(){
  						
  					}
  				});
  			
  			//this.showLoading();
  		},
  		forget:function(){
  			UC.go("forget");
  		},
  		register:function(){
  			UC.go('register1');
  		},
  		initTemplate: function () {
             return _.template(TemplateLogin);
        },
        render: function (data) {
            var tpl = this.initTemplate(),
            	self=this; 
        	self.$el.html(tpl({ "data": data })); 
        	//self.$el.addClass("app_user_bg");
        	 
        	
        },
        onCreate:function(){
        	 
        	this.render();
        	/**
        	if(UC.isLogin()){
        		UC.go("yulu");
        	}else{
        		this.render();
        		
        	}
        	*/
        	
        },
        onShow:function(){
        	
        	 
        }
       
  	});
  	 
  	return  LoginView;
      	 
});