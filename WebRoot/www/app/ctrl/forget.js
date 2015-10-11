define(['jquery','underscore','backbone','text!TemplateForget','basePageView','userModel'],function(jquery,_,Backbone,TemplateForget,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #getPassword":"getPassword"
			
		},
		getPassword:function(){
			 var self=this, 
			     umodel=new userModel(),
		   	     data={
				   phoneNumber:self.$el.find("#phoneNumber").val()
				   
		   	     };
	   	
	   	  
		    umodel.fetch({
				url:UC.actionUrl+"appRegister/backPassword",
				params:data,
				success:function(data){
					//console.log(data);
					if(data.attributes.flag){
						self.showAlert("新密码已经发送至手机");
						 
					}else{
						self.showAlert("不存在该账户！！");
					}
				},
				error:function(){
					self.showAlert("服务器错误！！");
				}
			});
			 
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