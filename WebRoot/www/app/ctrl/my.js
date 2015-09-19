define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateMy','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateMy,basePageView,userModel){
	
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
            var tplYulu = this.initTemplate(TemplateMy),
            	tplBottomNav=this.initTemplate(TemplateBottomNav);
           	self=this;  
       		self.$el.html(tplYulu()); 
       		$(tplBottomNav()).appendTo(self.$el);
       		self.$el.find(".n_b_3").css({
       			"background-position":"-129px top"
       		});
       		self.$el.find("#navbottom").find("span").eq(2).css({
       			color:"#299be4"
       		});
       		
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'dulei info sys',
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
	return myView;
	
});