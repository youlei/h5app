define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateImageView','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateImageView,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 'click #allTel':'goToTelList',
			 'click #detailList':'goToViolationsSelect',
			 "click #containerQuery":"goContainerQuery",
			 'click #validateContainerCode':'goToValidateContainerCode',
		},
		goContainerQuery:function(){
			UC.go('containerQuery');
		},
		goToViolationsSelect:function(){
			
			UC.go('violations');
		},
		goToTelList:function(){
			UC.go('telList');
		},
		goToValidateContainerCode:function(){
			UC.go('validateContainerCode');
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
        	var tplYulu = this.initTemplate(TemplateImageView);
           	self=this; 
       		self.$el.html(tplYulu({data:{url:UC.goParam.url}})); 
       		self.$el.find("#preview").attr("src",UC.goParam.url);
       		       		
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
	   					UC.go('yulu');
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