define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateFind','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateFind,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 'click #allTel':'goToTelList',
			 'click #detailList':'goToViolationsSelect'
		},
		
		goToViolationsSelect:function(){
			
			UC.go('violations');
		},
		goToTelList:function(){
			UC.go('telList');
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateFind),
            	tplBottomNav=this.initTemplate(TemplateBottomNav);
           	self=this;  
       		self.$el.html(tplYulu()); 
       		$(tplBottomNav()).appendTo(self.$el);
       		self.$el.find(".n_b_2").css({
       			"background-position":"-80px top"
       		});
       		self.$el.find("#navbottom").find("span").eq(1).css({
       			color:"#299be4"
       		});
       		
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
	   					UC.go('login');
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