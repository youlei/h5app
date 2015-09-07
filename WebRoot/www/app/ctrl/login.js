define(['jquery','underscore','backbone','text!TemplateLogin','basePageView','userModel'],function(jquery,_,Backbone,TemplateLogin,basePageView,userModel){
		
	  
  	var LoginView=basePageView.extend({
  		events:{
  			"click #login":"login",
  			"click #register":"register",
  			"click #forget":"forget"
  		},
  		login:function(e){
  			var self=this,
  				umodel=new userModel();
  				username=self.$el.find("#username"),
  				password=self.$el.find("password");
  				umodel.fetch({
  					url:'',
  					success:function(){
  						
  					},
  					error:function(){
  						
  					}
  				});
  			UC.go("index");
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
        	
        },
        onCreate:function(){
         
        	this.render();
        },
        onShow:function(){
        	
        	 
        }
       
  	});
  	 
  	return  LoginView;
      	 
});