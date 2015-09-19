define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateContainerDetail','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateContainerDetail,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 
			 
		},
		
		 
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateContainerDetail), 
           		self=this;  
       		self.$el.html(tplYulu({data:UC.goParam.electronPacking})); 
       		 
        },
        onCreate:function(){
        
       	 
	       	this.header.set({
	   			title:'123123123',
	   			view:true,
	   			back:true,
	   			home:true,
	   			
	   			events:{
	   				returnHandler:function(){
	   					UC.go('containerQuery',{
	   						
	   					});
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
	return myView;
	
});