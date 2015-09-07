define(['jquery','underscore','backbone','text!TemplateRegister1','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister1,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #getCode":"getCode"
			
		},
		getCode:function(){
			UC.go("register2");
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
        },
        onShow:function(){
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
       	  
        }
	});
	return loginView;
	
});