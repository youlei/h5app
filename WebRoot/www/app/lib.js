define(['jquery','underscore','backbone'],function($,_,Backbone){
	
	var Animate={
			Attention:"bounce flash pulse rubberBand shake swing tada wobble".split(" "),
			BouncingEntrances:"bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp".split(" "),
			BouncingExits:"bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp".split(" "),
			FadingEntrances:"fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig".split(" "),
			FadingExits:"fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig".split(" ")
			
			
			
	};
	
	var UC={
			
		actionUrl:'http://192.168.1.109:8090/',
		isLogin:function(){ 
			if(localStorage.getItem("username")&&localStorage.getItem("password")){ 
				return true;
			}
			return false;
		},
		getUser:function(){
			if(this.isLogin()){
				return {
					username:localStorage.getItem("username"),
					password:localStorage.getItem("password")
				};
			}
			return null;
		},
		PageViewMgr:{
			mapping:{},
			pageViewStack:[],
			add:function(pageView){
				if(!this.mapping[pageView.name]){
					this.mapping[pageView.name]=pageView; 
					this.pageViewStack.push(pageView);
				} 
			},
			isFront:function(currentPage,targetPage){
				var cindex,tindex;
				for(var i=0;i<this.pageViewStack.length;i++){
					if(this.pageViewStack[i].name==currentPage.name){
						cindex=i;
					}
					if(this.pageViewStack[i].name==targetPage.name){
						tindex=i;
					}
				}
				return cindex>tindex;
			},
			get:function(name){
				return this.mapping[name];
			},
			getCurrentShow:function(){
				var page;
				for(var pv in this.mapping){
					if(this.mapping[pv].status){
						page=this.mapping[pv];
					}
				}
				return page;
			}
			
			
		}, 
		
		// 获取页面切换是前进还是后退
		getDirection:function(currentPage,targetPage){
			var cindex,tindex,
				pageViewStack=UC.PageViewMgr.pageViewStack;
			for(var i=0;i<pageViewStack.length;i++){
				if(pageViewStack[i].name==currentPage.name){
					cindex=i;
				}
				if(pageViewStack[i].name==targetPage.name){
					tindex=i;
				}
			}
			if(cindex>tindex){
				return "back";
			}else{
				return "forward";
			}
		},
		
		show:function(name){
			var self=this;
			 			
			if(this.PageViewMgr.mapping[name]){
				var currentPageView=this.PageViewMgr.getCurrentShow(),
					targetPageView=this.PageViewMgr.mapping[name];
				if(self.getDirection(currentPageView,targetPageView)==="back"){
					self.back(currentPageView,targetPageView);
				}else if(self.getDirection(currentPageView,targetPageView)==="forward"){
					self.forward(currentPageView,targetPageView);
				}
				//this.PageViewMgr.mapping[name].goParam=goParam;
				
				return;
			}else{
				this.load(name);
			}
			
		},
		// 单页模式下页面跳转
		/**
		 * param.anmi
		 * */
		go:function(name,param){
			//this.goParam=param||this.goParam;
			if(!$.isEmptyObject(param)){
				$.extend(this.goParam,param);
			}else{
				param={
					anim:false,
					duration:300,
					easing:'linear'
				};
			}
			if(!this.duration){
				window.location.hash="#"+name;
			}
			 
			//this.show(name);
		},
		//
		jump:function(){
			
			
		},
		//
		back:function(currentPageView,targetPageView){
			var self=this;
			if(self.goParam.anim){
				if(!self.duration){
					self.duration=true;
					targetPageView.show();
					targetPageView.onShow();
					targetPageView.status=true; 
					currentPageView.$pageEl.addClass("animated").addClass(self.animate.animateOut).show().one("webkitAnimationEnd", function(){
						self.duration=false;
						currentPageView.$pageEl.removeClass("animated").removeClass(self.animate.animateOut);
						currentPageView.hide();
						currentPageView.status=false; 
						
					});
				}
					
				
			}else{
				if(!self.duration){
					self.duration=true;
					targetPageView.onShow();
					targetPageView.show();
					currentPageView.$pageEl.addClass("animated").addClass(self.animate.animateOut).show().one("webkitAnimationEnd", function(){
						self.duration=false;
						currentPageView.$pageEl.removeClass("animated").removeClass(self.animate.animateOut);
						currentPageView.hide();
						currentPageView.status=false; 
						targetPageView.status=true;
						
					});
				}
			}
			
		},
		//
		forward:function(currentPageView,targetPageView){
			var self=this;
			if(self.goParam.anim){
				if(!self.duration){
					self.duration=true;
					targetPageView.onShow();
					targetPageView.$pageEl.addClass("animated").addClass(self.animate.animateIn).show().one("webkitAnimationEnd", function(){
						self.duration=false;
						targetPageView.$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
						targetPageView.status=true;
						currentPageView.statue=false;
						currentPageView.hide();
						
					});	
				}
					
			}else{
				if(!self.duration){
					self.duration=true;
					targetPageView.onShow();
					targetPageView.$pageEl.addClass("animated").addClass(self.animate.animateIn).show().one("webkitAnimationEnd", function(){
						self.duration=false;
						targetPageView.$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
						targetPageView.status=true;
						currentPageView.hide();
						currentPageView.statue=false;
						
					});
				}
								
			}
			
		},
		load:function(pageViewName){
			var self=this,
			    currentPageView=this.PageViewMgr.getCurrentShow();
			require([pageViewName],function(pageView){ 
				 var pv=new pageView();
				 if(self.goParam.anim){
					 /**
					 pv.$pageEl.animate({
							left:'0px'
					 },self.goParam.anim,self.goParam.easing,function(){
						//console.log(this); 
						 pv.status=true;
						 currentPageView.hide();
						 currentPageView.status=false;
						
					 });
					 */
					 if(!self.duration){
						 self.duration=true;
						 pv.$pageEl.addClass("animated").addClass("fadeInRight").one("webkitAnimationEnd", function(){
							 self.duration=false;
							 pv.status=true;
							 currentPageView.hide();
							 currentPageView.status=false;
							 currentPageView.$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
							 pv.$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
						 });
					 }
					 
				 }else{
					 if(!self.duration){
						 self.duration=true;
						 self.PageViewMgr.mapping[pageViewName].$pageEl.addClass("animated").addClass(self.animate.animateIn).one("webkitAnimationEnd", function(){
							 self.duration=false;
							 if(currentPageView){
								 currentPageView.$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
								 currentPageView.hide();
								 currentPageView.status=false;
							 }
							 self.PageViewMgr.mapping[pageViewName].$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
						 });
					 }
					 
					
					 //alert(123);
					 /**
					 self.PageViewMgr.mapping[pageViewName].$pageEl.css({
						 left:'0px'
					 });
					 self.PageViewMgr.mapping[pageViewName].$pageEl.show();
					 if(currentPageView){
						 currentPageView.hide();
						 currentPageView.status=false;
					 }
					 */
					
				 }
			
			});
		},
		// 每次跳转使用跳转参数
		goParam:{
			anim:false,
			duration:300,
			easing:'linear'
		},
		// 全局使用
		animate:{
			anim:true,
			duration:300,
			//easing:'linear'
			animateIn:Animate.FadingEntrances[5],
			animateOut:Animate.FadingExits[5]
			
		},
		// 是否有特效进行
		duration:false,
		// 主要解决android back 按钮
	    hybridBack:function(){
	    	var currentPage= UC.PageViewMgr.getCurrentShow();
	    	currentPage.triggerBack();
	    	
	    }
			
	};
	
	var Main=Backbone.Router.extend({
		
		routes: { 
			"*actions" : "defaultRoute"

			},

		defaultRoute : function(actions){
		   var name;
		   if(window.location.hash){
			   name=window.location.hash.substring(1);
		   }  
		   if(!name){
			   window.location.hash="login";
			   return;
		   }
		   UC.show(name);
		   

		}
	});
	window.UC=UC;
	var main=new Main();
	Backbone.history.start();
});