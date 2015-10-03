define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateFind','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateFind,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 'click #tel':'goToTelList',
			 'click #violations':'goToViolationsSelect',
			 "click #containerQuery":"goContainerQuery",
			 'click #validateContainerCode':'goToValidateContainerCode',
		},
		goContainerQuery:function(){
			UC.go('containerQuery',{anim:true});
		},
		goToViolationsSelect:function(){
			
			UC.go('violations',{anim:true});
		},
		goToTelList:function(){
			UC.go('telList',{anim:true});
		},
		goToValidateContainerCode:function(){
			UC.go('validateContainerCode',{anim:true});
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
	   			title:'今日物流',
	   			view:true,
	   			back:false,
	   			home:true 
	   			
	   		});
	       	 
        },
        onShow:function(){
        	
       	  
        }
	});
	return myView;
	
});