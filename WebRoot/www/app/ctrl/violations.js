define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateViolations','basePageView','selectCategoryModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateViolations,basePageView,selectCategoryModel){
	
	var myView=basePageView.extend({
		events:{
			 'click li':'gotoViolationsDetail'
		},
		
		gotoViolationsDetail:function(e){
			//console.log(e.currentTarget);
			var $e=$(e.currentTarget);
			UC.go('violationsDetail',{
				
				id:$e.attr("data-id"),
				httpUrl:$e.data("httpurl"),
				parid:$e.data("parid"),
				text:$e.data("text"),
				
			});
			 
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
        	
       		
        	var model=new selectCategoryModel(),
        		self=this;
         
    		var $list=$("<div></div>").appendTo( self.$el);  
        	model.fetch({
        		url:UC.actionUrl+"appariticle/getViolationsSelect",
        		success:function(me,data){
        			var tpl = self.initTemplate(TemplateViolations);
        			$list.html(tpl({data:data}));
        			 
        		},
        		error:function(data){
        			
        		}
        		});
         
        
       		
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'违章查询',
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
        	
       	  
        }
	});
	return myView;
	
});