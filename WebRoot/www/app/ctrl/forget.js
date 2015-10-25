define(['jquery','underscore','backbone','text!TemplateForget','basePageView','userModel'],function(jquery,_,Backbone,TemplateForget,basePageView,userModel){
	
	var loginView=basePageView.extend({
		flag:false,
		events:{
			"click #getPassword":"getPassword"
			
		},
		getPassword:function(){
			 var self=this, 
			     umodel=new userModel(),
			     timer=60;
		   	     data={
				   phoneNumber:self.$el.find("#phoneNumber").val()
				   
		   	     };
			// $("#getPassword").css("background","#EDECE8")
		   	if(self.flag){
		   		return ;
		   	}
		   	$("#getPassword").css("background","#EDECE8").html("正在获取"); 
			var timerInterval=  setInterval(function(){
				if(timer>0){
					 timer--;
					   $("#getPassword").html("等待"+timer);  
					
				}else{
					  clearInterval(timerInterval);
					  self.flag=false;
					   $("#getPassword").css("background","#205975").html("获取密码"); 
					
				}
				
			},1000);
	   	  	if(!self.flag){
	   	  		self.flag=true;
		   	  	umodel.fetch({
					url:UC.actionUrl+"appRegister/backPassword",
					params:data,
					success:function(data){
						//console.log(data);
						if(data.attributes){
							if(data.attributes.flag){
								self.showAlert("新密码已经发送至手机");
								 
							}else{
								self.flag=false;
								clearInterval(timerInterval);
							    $("#getPassword").css("background","#93e246").html("获取密码"); 
								self.showAlert("不存在该账户！！");
							}
						}else{
							if(data.flag){ 
								self.showAlert("新密码已经发送至手机"); 
							}else{
								self.flag=false;
								clearInterval(timerInterval);
							    $("#getPassword").css("background","#93e246").html("获取密码"); 
								self.showAlert("不存在该账户！！");
							}
						}
						
					},
					error:function(){
						self.showAlert("服务器错误！！");
					}
				});
	   	  		
	   	  	}
		    
			 
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