define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateViolationsDetail','basePageView','selectCategoryModel','iscroll'],function(jquery,_,Backbone,TemplateBottomNav,TemplateViolationsDetail,basePageView,selectCategoryModel,iscroll){
	
	var myView=basePageView.extend({
		events:{
			 'click li':'gotoViolationsDetail'
		},
		
		gotoViolationsDetail:function(e){
			//console.log(e.currentTarget);
			 
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
        	
       		
        	var model=new selectCategoryModel(),
        		self=this;
        
        	
        	if(self.ifream){
        		self.ifream.remove();
        		self.ifream=null;
        	}
    		var $list=$("<div></div>").appendTo( self.$el);
    		var tpl = self.initTemplate(TemplateViolationsDetail);
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
	   					UC.go('violations');
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