define(['jquery','underscore','backbone'],function($,_,Backbone){
	var UC={
			
		actionUrl:'http://192.168.1.101:8090/',
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
			
			window.location.hash="#"+name; 
			//this.show(name);
		},
		//
		jump:function(){
			
			
		},
		//
		back:function(currentPageView,targetPageView){
			var self=this,
			 	screenWidth=$(document).width();
			if(self.goParam.anim){
				targetPageView.$pageEl.css({
					left:"0px",
					opacity:1
					
				});
				targetPageView.show();
				targetPageView.onShow();
				currentPageView.$pageEl.animate({
					left:screenWidth+'px',
					opacity:0
					
				},self.goParam.duration,self.goParam.easing,function(){ 
					currentPageView.status=false;
					targetPageView.status=true;
					currentPageView.hide();
				});
			}else{
				targetPageView.onShow();
				targetPageView.show();
				targetPageView.status=true;
				currentPageView.hide();
				currentPageView.status=false; 
			}
			
		},
		//
		forward:function(currentPageView,targetPageView){
			var self=this,
				screenWidth=$(document).width();
			if(self.goParam.anim){
				targetPageView.$pageEl.css({
					opacity:1,
				});
				targetPageView.show();
				targetPageView.onShow();
				targetPageView.$pageEl.animate({
					left:'0px'
				},self.goParam.duration,self.goParam.easing,function(){ 
					currentPageView.status=false;
					targetPageView.status=true;
					currentPageView.hide();
					 
				});
			}else{
				targetPageView.$pageEl.css({
					opacity:1,
					left:'0px'
				});
				targetPageView.onShow();
				targetPageView.$pageEl.show();
				targetPageView.status=true;
				currentPageView.hide();
				
			}
			
		},
		load:function(pageViewName){
			var self=this,
			    currentPageView=this.PageViewMgr.getCurrentShow();
			require([pageViewName],function(pageView){ 
				 var pv=new pageView();
				 if(self.goParam.anim){
					 pv.$pageEl.animate({
							left:'0px'
					 },self.goParam.anim,self.goParam.easing,function(){
						//console.log(this); 
						 pv.status=true;
						 currentPageView.hide();
						 currentPageView.status=false;
						
					 });
					 
				 }else{
					 
					 self.PageViewMgr.mapping[pageViewName].$pageEl.css({
						 left:'0px'
					 });
					 self.PageViewMgr.mapping[pageViewName].$pageEl.show();
					 if(currentPageView){
						 currentPageView.hide();
						 currentPageView.status=false;
					 }
					 
					
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
			easing:'linear'
			
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
		   }else{
			   name="login";
		   }
		   
		   if(name=="login"){
			   window.location.hash=name;
		   }
		   UC.show(name);
		   

		}
	});
	window.UC=UC;
	var main=new Main();
	Backbone.history.start();
});