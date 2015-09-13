define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateTelDetailList','basePageView','appAriticleModel','iscroll'],function(jquery,_,Backbone,TemplateBottomNav,TemplateTelDetailList,basePageView,appAriticleModel,iScroll){
	
	var myView=basePageView.extend({
		events:{
			 'click li':'gotoTelDetail'
		},
		
		gotoTelDetail:function(){
			
			UC.go('telDetail');
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
         
       		
        	$("[name='detailList']").each(function(){
        		$(this).remove();
        	});
        	var model=new appAriticleModel(),
        		self=this;
        
        	
        	var tplBottomNav=self.initTemplate(TemplateBottomNav);
    		var $list=$("<div></div>").appendTo( self.$el);
    		var iscroll;
    		$(tplBottomNav()).appendTo(self.$el);
        	model.fetch({
        		url:UC.actionUrl+'appariticle/getAriticleByCategoryId?cid='+UC.goParam.id,
        		success:function(me,data){
        			var tpl = self.initTemplate(TemplateTelDetailList);
        			$list.html(tpl({data:data.rows}));
        			iscroll=new IScroll("#wrapper",{
        				 mouseWheel: true,
        				 onRefresh:function(){
        					 console.log('refresh.......');
        				 },
        				 onScrollMove:function(){
        					 console.log('move............');
        				 },
        				 scrollEnd:function(){
        					 console.log('end.............');
        				 }
        				 
        			});
        			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        		},
        		error:function(data){
        			
        		}
        	});
        },
        onCreate:function(){
        
       	
	       	this.header.set({
	   			title:'dulei info sys',
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('telList');
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