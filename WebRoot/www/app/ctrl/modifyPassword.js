define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateModifyPassword','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateModifyPassword,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			"click #submitUser":"submitUser"
		},
		submitUser:function(){
			
			var self=this,
				umodel=new userModel(),
				phoneNumber=localStorage.getItem("username"),
				password=self.$el.find("#password").val(),
				newPassword=self.$el.find("#newPassword").val(),
				reNewPassword=self.$el.find("#reNewPassword").val();
			if(newPassword!==reNewPassword){
				self.showAlert("密码不一致");
				return ;
			}
				
			umodel.fetch({
				url:UC.actionUrl+"appRegister/modifyPassword",
				params:{
					phoneNumber:phoneNumber,
					oldPassword:password,
					newPassword:newPassword
				},
				success:function(data){
					//console.log(data);
					if(data.attributes){
						if(data.attributes.flag){
							self.showAlert("修改成功");
							UC.go("my");
						}else{
							self.showAlert("原密码错误");
						}
					}else{
						if(data.flag){
							self.showAlert("修改成功");
							UC.go("my");
						}else{
							self.showAlert("原密码错误");
						}
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