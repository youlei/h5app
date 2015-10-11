define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateMyInfo','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateMyInfo,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			"click [name='tab']":"switchTab",
			"click #modifyPassword":"modifyPassword"
			
			
		},
		modifyPassword:function(){
			UC.go("modifyPassword");
		},
	 
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateMyInfo), 
            	self=this;  
       		self.$el.html(tplYulu());  
       		
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:"我的",
	   			view:true,
	   			back:true,
	   			home:true, 
	   			events:{
	   				returnHandler:function(){
	   					UC.go('my');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   		});
        },
        onShow:function(){
        	
       	  
        }
	});
	return myView;
	
});