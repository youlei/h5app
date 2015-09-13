define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateTelDetail','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateTelDetail,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 'click #duichang':'gotoTelDetailList'
		},
		
		gotoTelDetailList:function(){
			
			UC.go('telDetailList');
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateTelDetail),
            	tplBottomNav=this.initTemplate(TemplateBottomNav);
           	self=this;  
       		self.$el.html(tplYulu());  
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
	   					UC.go('telDetailList');
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