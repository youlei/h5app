define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateElectronicZxdDetail','basePageView','selectCategoryModel','iscroll'],function(jquery,_,Backbone,TemplateBottomNav,TemplateElectronicZxdDetail,basePageView,selectCategoryModel,iscroll){
	
	var myView=basePageView.extend({
		events:{
			 
		},
		 
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) { 
        	var self=this; 
        	if(self.ifream){
        		self.ifream.remove();
        		self.ifream=null;
        	}
    		var $list=$("<div></div>").appendTo( self.$el);
    		var tpl = self.initTemplate(TemplateElectronicZxdDetail);
    		UC.goParam.height=$(document).height();
			$list.html(tpl({data:UC.goParam})); 
			self.ifream=$list;
			//$list.find("iframe").attr("src",UC.goParam.httpUrl).attr("height",height);
			//self.showLoading();
			$list.find("iframe").eq(0).ready(function(){
				
			});
			
       		
        },
        onCreate:function(){
        
        	
        },
        onShow:function(){
        	var self=this;
	       	this.header.set({
	   			title:UC.goParam.text,
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('electronicZxd');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
    	    this.render();
        }
	});
	return myView;
	
});