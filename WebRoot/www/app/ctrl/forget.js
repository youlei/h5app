define(['jquery','underscore','backbone','text!TemplateForget','basePageView','userModel'],function(jquery,_,Backbone,TemplateForget,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #getCode":"getCode"
			
		},
		getCode:function(){
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