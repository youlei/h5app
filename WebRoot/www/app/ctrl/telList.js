define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateTelList','basePageView','selectCategoryModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateTelList,basePageView,selectCategoryModel){
	
	var myView=basePageView.extend({
		events:{
			 'click li':'gotoTelDetailList'
		},
		
		gotoTelDetailList:function(e){
			//console.log(e.currentTarget);
			var $e=$(e.currentTarget);
			UC.go('telDetailList',{id:$e.attr("id")});
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
        	
        	var model=new selectCategoryModel(),
        		self=this;
         
    		var $list=$("<div></div>").appendTo( self.$el);  
        	model.fetch({
        		success:function(me,data){
        			var tplYulu = self.initTemplate(TemplateTelList);
        			$list.html(tplYulu({data:data}));
        			 
        		},
        		error:function(data){
        			
        		}
        	});
        },
        onCreate:function(){
       	    var self= this,
       	    	height=$(document).height();
       	   
       	    this.render();
       	    self.$el.find(".index_body").eq(0).css("height",height);
	       	this.header.set({
	       		title:'今日物流',
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