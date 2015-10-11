define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateMy','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateMy,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			
			"click #modifyPassword":"gotoModifyPassword",
			"click #myInfo":"gotoMyInfo",
			"click #loginOut":"loginOut"
			
			
		},
		loginOut:function(){
			UC.go("login");
		},
		gotoModifyPassword:function(){
			UC.go("modifyPassword",{anim:true});
		},
		gotoMyInfo:function(){ 
			UC.go('myInfo',{anim:true});
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateMy), 
            	self=this;  
       		self.$el.html(tplYulu());  
       		
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:"我的",
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