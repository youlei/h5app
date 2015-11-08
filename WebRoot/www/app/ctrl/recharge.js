define(['jquery','underscore','backbone','text!TemplateRecharge','basePageView','userModel'],function(jquery,_,Backbone,TemplateRecharge,basePageView,userModel){
	
	var loginView=basePageView.extend({
	   events:{
		   'click #gotoRecharge':"gotoRecharge", 
		   
	   },
	   gotoRecharge:function(){ 
		   window.Native.gotoRecharge(localStorage.getItem("username"),$("#price").val());
	   },
	   initTemplate: function () {
            return _.template(TemplateRecharge);
       },
       render: function (data) {
           var tpl = this.initTemplate(),
           	   self=this;  
       	   self.$el.html(tpl({ "data": data })); 
       	
       },
       onCreate:function(){
        
       		this.render();
       		this.header.set({
       			title:'支付订单',
       			view:true,
       			back:true,
       			home:true,
       			events:{
       				returnHandler:function(){
       					UC.go('home');
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