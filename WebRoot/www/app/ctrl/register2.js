define(['jquery','underscore','backbone','text!TemplateRegister2','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister2,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #submit":"submit",
			
		},
		flag:false,
		validate:function(){
			var self=this,
			 	password=$.trim(self.$el.find("#password").val()),
			 	repassword=$.trim(self.$el.find("#repassword").val());
			if(password!==repassword){
				self.showAlert("ÃÜÂë²»Ò»ÖÂ");
				return false;
			}
			return true;
		},
		submit:function(){ 
		   
		   var self=this, 
		   	   umodel=new userModel(),
	   	       data={
			   	   accountName:this.$el.find("#userName").val(),
				   password:this.$el.find("#password").val(),
				   email:this.$el.find("#email").val(),
				   theFleet:this.$el.find("#theFleet").val(),
				   userName:this.$el.find("#userName").val(),
				   invitationCode:this.$el.find("#invitationCode").val()
		   	   };
	   		
		   if(!self.validate()){
			   return;
		   }	  
		   self.showLoading();
		   self.flag=true;
		   umodel.fetch({
				url:UC.actionUrl+"appRegister/register",
				params:data,
				success:function(data){
					//console.log(data);
					self.hideLoading();
					self.flag=false;
					if(data.attributes.flag){
						self.showAlert("×¢²á³É¹¦");
						UC.go("index");
					}else{
						self.showAlert("×¢²áÊ§°ÜÇëÖØÐÂ×¢²á");
					}
				},
				error:function(){
					self.hideLoading();
					self.flag=false;
					self.showAlert("×¢²áÊ§°ÜÇëÖØÐÂ×¢²á");
				}
			});
		},
		initTemplate: function () {
            return _.template(TemplateRegister2);
        },
        render: function (data) {
            var tpl = this.initTemplate(),
           	self=this;  
       		self.$el.html(tpl({ "data": data })); 
       	
        },
        onCreate:function(){
        
       	 this.render();
       	 this.$el.find("#userName").val(UC.goParam.phoneNumber);
       	 this.header.set({
    			title:'ç”¨æˆ·æ³¨å†Œ',
    			view:true,
    			back:true,
    			home:true,
    			events:{
    				returnHandler:function(){
    					UC.go('register1');
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