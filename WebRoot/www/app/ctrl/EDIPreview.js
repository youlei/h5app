 define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateEDIPreview','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateEDIPreview,basePageView,userModel){
	var umodel=new userModel();
	var myView=basePageView.extend({
		events:{
			"click #ctrlC":"clickCtrlC"
		},
		clickCtrlC:function(){
			var content= $("#ediConent").text();
			window.Native.ctrlC(content);
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateEDIPreview), 
            	self=this;  
       		self.$el.html(tplYulu({content:UC.goParam.content}));  
       		
        },
        onHide:function(){
        	var self=this;
        	UC.PageViewMgr.destroyPageView(self);
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:"EDI小票预览",
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('yulu');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
        } 
	});
	return myView;
	
});