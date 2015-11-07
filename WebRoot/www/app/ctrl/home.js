define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateHome','basePageView','userModel','unslider','move','swipe'],function(jquery,_,Backbone,TemplateBottomNav,TemplateHome,basePageView,userModel,unslider,move,swipe){
	umodel=new userModel();
	var myView=basePageView.extend({
		events:{
			"click #yulu":"yulu",
			"click #chongzhi":"chongzhi",
			"click #xhyz":"xhyz",
			"click #jgcx":"jgcx",
			"click #smyl":"smyl",
			"click li [name='ad']":"gotoAdPerview"
		},
		gotoAdPerview:function(e){
			var $this=$(e.currentTarget);
			var url=$this.data('actionurl');
			UC.go('adPerview',{anim:true,url:url,height:$(document).height()});
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
			UC.go('shippingDateQuery',{anim:true});
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
	       	umodel.fetch({
				url:UC.actionUrl+"appAdvertisement/getAdvertisement",
				success:function(obj){ 
					
					if(obj.attributes){
						for(var i=0;i<obj.attributes.rows.length;i++){
							$(" <li><img name='ad' data-actionurl='"+obj.attributes.rows[i].hrefUrl+"' src='"+obj.attributes.rows[i].imageUrl+"'></li>").appendTo($("#adBanner"));
						}
						 
					}else{
						for(var i=0;i<obj.rows.length;i++){
							$(" <li><img name='ad data-actionurl='"+obj.rows[i].hrefUrl+"' src='"+obj.rows[i].imageUrl+"'></li>").appendTo($("#adBanner"));
						}
						
					} 
				 
		       	    $('.banner').unslider({
		       	    	//arrows: true,
		       	    	height:130,
						fluid: true,
						dots: true
		       	    });
		       	    //$('.banner').eq(0).attr("style","height:155px;");
			        
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			}); 
	       	
        },
        onHide:function(){
        	
        },
        onShow:function(){
        	
        	if(!UC.isLogin()){
        		UC.go('login');
        	}
       	  
        }
	});
	return myView;
	
});