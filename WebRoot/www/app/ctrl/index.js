define(['jquery','underscore','backbone','text!TemplateIndex','basePageView'],function(jquery,_,Backbone,TemplateIndex,basePageView){
	
	 var LoginView=basePageView.extend({
   		 
   		initTemplate: function () {
              return _.template(TemplateIndex);
        },
         render: function (data) {
             var tpl = this.initTemplate(); 
         	 var self=this;
         	 self.$el.html(tpl({ "data": data }));
         	
         },
         onCreate:function(){
        	 this.render();
        	 this.header.set({
        		title:'duleinfo sys',
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
  
	return LoginView;
});