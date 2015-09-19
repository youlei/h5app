define(['jquery','underscore','backbone','text!TemplateForget','basePageView','userModel'],function(jquery,_,Backbone,TemplateForget,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #getCode":"getCode"
			
		},
		getCode:function(){
			 var self=this, 
			     umodel=new userModel(),
		   	     data={
				   phoneNumber:self.$el.find("#phoneNumber")
				   
		   	     };
	   	
	   	  
		    umodel.fetch({
				url:UC.actionUrl+"appRegister/validateRegisterPhone",
				params:data,
				success:function(data){
					//console.log(data);
					if(data.attributes.flag){
						UC.go("register2");
					}
				},
				error:function(){
					
				}
			});
			UC.go("register2");
		},
		initTemplate: function () {
            return _.template(TemplateForget);
        },
        render: function (data) {
            var tpl = this.initTemplate(),
           	self=this;  
       		self.$el.html(tpl({ "data": data })); 
       	
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'找回密码',
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('login');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   		});
        },
        onShow:function(){
       	
        	
        }
	});
	return loginView;
	
});