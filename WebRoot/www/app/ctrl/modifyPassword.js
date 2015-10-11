define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateModifyPassword','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateModifyPassword,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			"click #submitUser":"submitUser"
		},
		submitUser:function(){
			
			var self=this,
				umodel=new userModel(),
				phoneNumber="18602922416",
				password=self.$el.find("#password").val();
				newPassword=self.$el.find("#newPassword").val();
			umodel.fetch({
				url:UC.actionUrl+"appRegister/modifyPassword",
				params:{
					phoneNumber:phoneNumber,
					oldPassword:password,
					newPassword:newPassword
				},
				success:function(data){
					//console.log(data);
					if(data.attributes.flag){
						UC.go("yulu");
					}
				},
				error:function(){
					
				}
			});
		
		},
	 
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateModifyPassword), 
           		self=this;  
       		self.$el.html(tplYulu()); 
       		
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'修改密码',
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('my');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
        },
        onShow:function(){
        	
       	  
        }
	});
	return myView;
	
});