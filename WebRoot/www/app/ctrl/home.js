define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateHome','basePageView','userModel','unslider','move','swipe'],function(jquery,_,Backbone,TemplateBottomNav,TemplateHome,basePageView,userModel,unslider,move,swipe){
	
	var myView=basePageView.extend({
		events:{
			"click #yulu":"yulu",
			"click #chongzhi":"chongzhi",
			"click #xhyz":"xhyz",
			"click #jgcx":"jgcx",
			"click #smyl":"smyl"
		},
		yulu:function(e){
			 var $this=$(e.currentTarget);
			 $this.addClass("click-scale").on("webkitTransitionEnd",function(e){
				 var i = $(e.currentTarget);
				 $this.removeClass("click-scale").css({
			            "-webkit-transition": "all 0.3s ease-out"
			     }) .on("webkitTransitionEnd",function(e){
			    	 
			    	 UC.go('yulu',{anim:false});
			     });
				 
				 /**
				 i.hasClass("click-scale") ? i.removeClass("click-scale").css({
			            "-webkit-transition": "all 0.2s ease-out"
			        }) : (t && clearTimeout(t), a(i.find("a").attr("data-href"), !0));
				 */
			 });
			
			//UC.go('yulu',{anim:false});
		},
		chongzhi:function(e){
			var $this=$(e.currentTarget);
			 $this.addClass("click-scale").on("webkitTransitionEnd",function(e){
				 var i = $(e.currentTarget);
				 $this.removeClass("click-scale").css({
			            "-webkit-transition": "all 0.2s ease-out"
			     }) .on("webkitTransitionEnd",function(e){
			    	 
			    	 UC.go('yulu',{anim:false});
			     });
				 
			 });
		},
		xhyz:function(e){
			 var $this=$(e.currentTarget);
			 $this.addClass("click-scale").on("webkitTransitionEnd",function(e){
				 var i = $(e.currentTarget);
				 $this.removeClass("click-scale").css({
			            "-webkit-transition": "all 0.2s ease-out"
			     }) .on("webkitTransitionEnd",function(e){ 
			    	 UC.go('validateContainerCode/from/home',{anim:true});
			     });
				  
			 });
			
		},
		jgcx:function(e){
			UC.go('yulu',{anim:true});
		},
		smyl:function(){
			//UC.go('yulu',{anim:true});
			var self=this;
			self.showAlert("敬请期待...");
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateHome),
           		self=this;  
       		self.$el.html(tplYulu());  
        },
        onCreate:function(){
        
       	    this.render();
	       	this.header.set({
	   			title:"首页",
	   			view:true,
	   			back:false,
	   			home:true 
	   			
	   		});
	       	$(function() {
	       	    $('.banner').unslider({
	       	    	//arrows: true,
					fluid: true,
					dots: true
	       	    });
	       	});
        },
        onShow:function(){
        	
       	  
        }
	});
	return myView;
	
});