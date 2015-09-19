define(['jquery','underscore','backbone','text!TemplateRegister1','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister1,basePageView,userModel){
	
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
		 
		},
		initTemplate: function () {
            return _.template(TemplateRegister1);
        },
        render: function (data) {
            var tpl = this.initTemplate(),
           	self=this;  
       		self.$el.html(tpl({ "data": data })); 
       	
        },
        onCreate:function(){
        
       	    this.render();
	       	this.header.set({
	   			title:'dulei info sys',
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