define(['jquery','underscore','backbone','text!TemplateForget','basePageView','userModel'],function(jquery,_,Backbone,TemplateForget,basePageView,userModel){
	
	var loginView=basePageView.extend({
		flag:false,
		next:false,
		phoneReg : /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
		events:{
			"click #getPassword":"getPassword",
			"click #getCode":"getCode",
			"click #next":"next"
			
		},
		next:function(){
			UC.go('resetPassword',{anim:true});
		},
		getCode:function(){
			 
			 
			 var self=this, 
			     umodel=new userModel(),
			     timer=60,
		   	     data={
				   phoneNumber:self.$el.find("#phoneNumber").val()
				   
		   	     }; 
		   if(!self.phoneReg.test(self.$el.find("#phoneNumber").val())){
			   self.showAlert("请输入正确电话号码");
			   return;
		   }
		   if(!$.trim(self.$el.find("#phoneNumber").val())){
			   self.showAlert("请输入电话号码");
			   return;
		   }
		   if(self.flag){
			   return ;
		   }	
		  
		   $("#getCode").css("background","#EDECE8").html("正在获取"); 
		   var timerInterval= setInterval(function(){
			   if(timer>0){
				   timer--;
				   $("#getCode").html("等待"+timer); 
				 
			   }else{ 
				   clearInterval(timerInterval);
				   self.flag=false;
				   $("#getCode").css("background","#205975").html("获取验证码"); 
			   }
			 
		   },1000);
		   if(self.flag){
			   
			   return;
		   }
		   self.flag=true;
		   umodel.fetch({
				url:UC.actionUrl+"appRegister/sendCode",
				params:data,
				success:function(data){
					//console.log(data);
					
					//clearInterval(timerInterval);
					//  $("#getCode").css("background","#205975").html("获取验证码");
					if(data.attributes){
						if(data.attributes.flag){
							self.next=true;
						}else{
							self.next=false;
							self.flag=false;
							self.showAlert("电话已经被注册");
							clearInterval(timerInterval);
						    $("#getCode").css("background","#205975").html("获取验证码"); 
						}
						
					}else{
						
						if(data.flag){
							self.next=true;
						}else{
							self.next=false;
							self.flag=false;
							self.showAlert("电话已经被注册");
							clearInterval(timerInterval);
						    $("#getCode").css("background","#205975").html("获取验证码"); 
						}
						
					}
					
					
				},
				error:function(){
					
				}
			});
		 
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