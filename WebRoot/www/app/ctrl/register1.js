define(['jquery','underscore','backbone','text!TemplateRegister1','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister1,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #getCode":"getCode",
			"click #gotoNext":"gotoNext"
			
		},
		flag:false,
		next:false,
		phoneReg : /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
		gotoNext:function(){
			
			var self=this,
			umodel=new userModel(),
			phoneNumber=self.$el.find("#phoneNumber").val(),
			code=self.$el.find("#code").val();
			if(!self.next){
				 self.showAlert("验证没有通过");
				return ;
			}
			self.showLoading();
			umodel.fetch({
				url:UC.actionUrl+"appRegister/validateCode",
				params:{
					validateCode:code,
					phoneNumber:phoneNumber
				},
				success:function(data){
					//console.log(data);
					self.hideLoading();
					if(data.attributes){
						if(data.attributes.flag){
							UC.go("register2",{
								phoneNumber:phoneNumber,
								code:code
							});
							
						}else{
							self.showAlert("验证码有误！！");
							
						}
						
					}else{
						
						if(data.flag){
							UC.go("register2",{
								phoneNumber:phoneNumber,
								code:code
							});
							
						}else{
							self.showAlert("验证码有误！！");
							
						}
					}
					
				},
				error:function(){
					
				}
			});
			
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
	   			title:'用户注册',
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