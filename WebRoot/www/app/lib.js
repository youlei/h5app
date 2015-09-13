define(['jquery','underscore','backbone'],function($,_,Backbone){
	var UC={
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
		
		showAnim:function(name,param){
			//if(param.anim){}
		},
		
		show:function(name){
			var self=this,
				duration=UC.animate.duration,
				easing='linear';
			if(!$.isEmptyObject(self.goParam)){
				
				if(self.goParam.anim){
					duration=self.goParam.duration;
				}else{
					duration=0;
				}
				easing=self.goParam.easing||"linear";
			}
			if(this.PageViewMgr.mapping[name]){
				var screenWidth=$(document).width(),
					currentPageView=this.PageViewMgr.getCurrentShow();
				if(self.PageViewMgr.isFront(currentPageView,this.PageViewMgr.mapping[name])){
					self.PageViewMgr.mapping[name].$el.css({
						left:"0px",
						opacity:1
						
					});
					self.PageViewMgr.mapping[name].show();
					self.PageViewMgr.mapping[name].onShow();
					this.PageViewMgr.getCurrentShow().$el.animate({
						left:screenWidth+'px',
						opacity:0
						
					},duration,easing,function(){ 
						currentPageView.status=false;
						self.PageViewMgr.mapping[name].status=true;
						currentPageView.hide();
					});
				}else{
					this.PageViewMgr.mapping[name].$el.css({
						opacity:1,
					});
					this.PageViewMgr.mapping[name].show();
					self.PageViewMgr.mapping[name].onShow();
					this.PageViewMgr.mapping[name].$el.animate({
						left:'0px'
					},duration,easing,function(){ 
						currentPageView.status=false;
						self.PageViewMgr.mapping[name].status=true;
						for(var p in self.PageViewMgr.mapping){
							if(p!=name){
								self.PageViewMgr.mapping[p].hide();
							}
						}
					});
				}
				//this.PageViewMgr.mapping[name].goParam=goParam;
				
				return;
			}
			require([name],function(pageView){ 
				 var pv=new pageView();
				 self.PageViewMgr.mapping[name].$el.animate({
						left:'0px'
				 },duration,easing,function(){
					//console.log(this);
					 for(var p in self.PageViewMgr.mapping){
						 if(pv.name!=p){
							 self.PageViewMgr.mapping[p].status=false;
							 self.PageViewMgr.mapping[p].hide();
						 }
						 
					 }
					 pv.status=true;
				 });
			});
		},
		// 单页模式下页面跳转
		/**
		 * param.anmi
		 * */
		go:function(name,param){
			this.goParam=param||{};
			window.location.hash="#"+name; 
			//this.show(name);
		},
		//
		jump:function(){
			
			
		},
		back:function(){
			
		},
		forward:function(){
			
		},
		// 跳转参数
		goParam:{
			
		},
		animate:{
			anim:true,
			duration:300,
			easing:'linear'
		},
		actionUrl:'http://192.168.1.106:8090/'
			
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