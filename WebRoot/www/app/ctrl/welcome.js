define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateWelcome','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,templateWelcome,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 
		},
		next:function(){
			
			
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(templateWelcome), 
            	self=this;  
       		self.$el.html(tplYulu());  
       		
        },
        onCreate:function(){
        
       	    this.render();
	       	this.header.set({
	   			title:"xxx",
	   			view:false,
	   			back:false,
	   			home:true
	   			
	   		});
        },
        onShow:function(){
        	setTimeout(function(){
        		if(UC.isLogin()){
            		UC.go('home',{anim:true});
            	}else{
            		UC.go('login',{anim:true});
            	}
        		
        	},2000);
         
        	
       	   
        }
	});
	return myView;
	
});