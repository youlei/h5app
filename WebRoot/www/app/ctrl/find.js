define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateFind','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateFind,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 'click #tel':'gotoTelList',
			 'click #violations':'gotoViolationsSelect',
			 "click #containerQuery":"gotoContainerQuery",
			 'click #validateContainerCode':'gotoValidateContainerCode',
			 'click #shippingDateQuery':'gotoShippingDateQuery',
			 'click #roadStatus':"gotoRoadStatus",
			 'click #electronicZxd':"gotoElectronicZxd" 
		},
		gotoRoadStatus:function(){
			UC.go('roadStatus',{anim:true});
		},
		gotoElectronicZxd:function(){
			UC.go('electronicZxd',{anim:true});
		},
		gotoShippingDateQuery:function(){
			UC.go('shippingDateQuery',{anim:true});
		},
		gotoContainerQuery:function(){
			UC.go('containerQuery',{anim:true});
		},
		gotoViolationsSelect:function(){ 
			UC.go('violations',{anim:true});
		},
		gotoTelList:function(){
			UC.go('telList',{anim:true});
		},
		gotoValidateContainerCode:function(){
			UC.go('validateContainerCode',{anim:true});
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var self=this,
            	tplYulu = this.initTemplate(TemplateFind);
           	
       		self.$el.html(tplYulu()); 
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