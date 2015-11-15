define(['jquery','underscore','backbone','text!TemplateRecharge','basePageView','userModel'],function(jquery,_,Backbone,TemplateRecharge,basePageView,userModel){
	
	var loginView=basePageView.extend({
	   events:{
		   'click #gotoRecharge':"gotoRecharge", 
		   "click #add":"add",
		   "click #remove":"remove",
		   "input #quantity":"inputNum",
	   },
	   
	   inputNum:function(e){
		   var $this=$(e.currentTarget);
		   var self=this;
		   var quantity=parseInt( self.$el.find("#quantity").val());
		   var price=parseInt( self.$el.find("#price").data("price"));
		   self.$el.find("#total").text(quantity*price+"元");
		   self.$el.find("#total").data("total",quantity*price);
	   },
	   add:function(){
		   var self=this;
		   if($.isNumeric(self.$el.find("#quantity").val())){
			   var quantity=parseInt( self.$el.find("#quantity").val()),
			   	   price=parseInt( self.$el.find("#price").data("price"));
			   quantity+=1;
			   self.$el.find("#quantity").val(quantity);
			   self.$el.find("#total").text(quantity*price+"元");
			   self.$el.find("#total").data("total",quantity*price);
		   }else{
			   var quantity=parseInt( self.$el.find("#quantity").val()),
		   	   	   price=parseInt( self.$el.find("#price").data("price"));
			   self.showAlert("请输入数字");
			   self.$el.find("#quantity").val("1");
			   self.$el.find("#total").text(quantity*price+"元");
			   self.$el.find("#total").data("total",quantity*price);
		   }
		   
		   
	   },
	   remove:function(){
		   var self=this;
		   if($.isNumeric(self.$el.find("#quantity").val())){
			   
			   var quantity=parseInt( self.$el.find("#quantity").val()),
			   	   price=parseInt( self.$el.find("#price").data("price"));
			   if(quantity>1){
				   quantity-=1;
				   self.$el.find("#quantity").val(quantity);   
				   self.$el.find("#total").text(quantity*price+"元");
				   self.$el.find("#total").data("total",quantity*price);
			   }
			   
		   }else{
			   var quantity=parseInt( self.$el.find("#quantity").val()),
	   	   	   price=parseInt( self.$el.find("#price").data("price"));
			   self.showAlert("请输入数字");
			   self.$el.find("#quantity").val("1");
			   self.$el.find("#total").text(quantity*price+"元");
			   self.$el.find("#total").data("total",quantity*price);
		   }
	   },
	   gotoRecharge:function(){ 
		   window.Native.gotoRecharge(localStorage.getItem("username"),$.trim($("#total").data("total")));
	   },
	   initTemplate: function () {
            return _.template(TemplateRecharge);
       },
       render: function (data) {
           var tpl = this.initTemplate(),
           	   self=this;  
       	   self.$el.html(tpl({ "data": data })); 
       	   self.$el.find("#tel").text(localStorage.getItem("username"));
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
    	   this.render();
       	 
       }
	});
	return loginView;
	
});