define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateRoadStatus','basePageView','selectCategoryModel','iscroll'],function(jquery,_,Backbone,TemplateBottomNav,TemplateRoadStatus,basePageView,selectCategoryModel,iscroll){
	
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
    		var tpl = self.initTemplate(TemplateRoadStatus);
    		UC.goParam.height=$(document).height();
			$list.html(tpl({data:{
				httpUrl:"http://map.baidu.com/mobile/webapp/index/index#index/index/foo=bar/vt=map",
				height:$(document).height()
			}})); 
			self.ifream=$list;
			//$list.find("iframe").attr("src",UC.goParam.httpUrl).attr("height",height);
			//self.showLoading();
			$list.find("iframe").eq(0).ready(function(){
				
			});
			
       		
        },
        onCreate:function(){
        	
        	var self=this;
	       	this.header.set({
	   			title:"道路状况",
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('find');
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