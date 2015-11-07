define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateAdPerview','basePageView','userModel','unslider','move','swipe'],function(jquery,_,Backbone,TemplateBottomNav,TemplateAdPerview,basePageView,userModel,unslider,move,swipe){
	umodel=new userModel();
	var myView=basePageView.extend({
		events:{
		 
		},
		  
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateAdPerview),
           		self=this;  
       		self.$el.html(tplYulu({data:UC.goParam}));  
        },
        onCreate:function(){
        
       	    this.render();
	       	this.header.set({
	   			title:"广告",
	   			view:true,
	   			back:true,
	   			home:true ,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('home');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
	        
	       	
        },
        onHide:function(){
        	var self=this;
        	UC.PageViewMgr.destroyPageView(self); 
        },
        onShow:function(){
        	 
        }
	});
	return myView;
	
});