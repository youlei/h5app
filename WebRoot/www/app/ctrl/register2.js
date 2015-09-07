define(['jquery','underscore','backbone','text!TemplateRegister2','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister2,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #validate":"validate",
			
		},
		validate:function(){ 
			UC.go("register3");
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
        },
        onShow:function(){
        	this.header.set({
       			title:'用户注册',
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
       	 
        }
	});
	return loginView;
	
});