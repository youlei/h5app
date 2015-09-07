define(['jquery','underscore','backbone','text!TemplateRegister3','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister3,basePageView,userModel){
	
	var loginView=basePageView.extend({
	   initTemplate: function () {
            return _.template(TemplateRegister3);
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
       					UC.go('register2');
       				},
       				homeHandler:function(){
       					
       					
       				}
       			}
       		});
       	 
       }
	});
	return loginView;
	
});