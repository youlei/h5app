define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateMy','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateMy,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			"click [name='tab']":"switchTab",
			
			
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