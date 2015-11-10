define(['jquery','underscore','backbone'],function($,_,Backbone){
	
	var Animate={
			Attention:"bounce flash pulse rubberBand shake swing tada wobble".split(" "),
			BouncingEntrances:"bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp".split(" "),
			BouncingExits:"bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp".split(" "),
			FadingEntrances:"fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig".split(" "),
			FadingExits:"fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig".split(" ")
			
	};
	
	var UC={
		params:[],//���ÿ��hash ��תʱ����еĲ���	
		
		// ȫ��
		pageInfo:{
			limit:20
			
		},
		//actionUrl:'http://192.168.1.104:8090/',
		actionUrl:'http://jinriwuliu.cn:8080/',
		 
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
			}, 
		    //销毁指定的pageView
		    destroyPageView:function(pageView){
		    	var index=-1;
		    	delete this.mapping[pageView.name];
		    	for(var i=0;i<this.pageViewStack.length;i++){
					if(this.pageViewStack[i].name==pageView.name){
						index=i;
					}
					 
				}
		    	if(index!=-1){
		    		this.pageViewStack.splice(index,1);
		    	}
		    	
		    	pageView.$pageEl.remove();
		    	
		    },
			
			
		}, 
		
		// ��ȡҳ���л���ǰ���Ǻ���
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
				currentPageView.hideTips();
				targetPageView.hideTips();
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
		// ��ҳģʽ��ҳ����ת
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
						currentPageView.onHide();
						currentPageView.status=false; 
						
					});
				}
					
				
			}else{
				if(!self.duration){ 
					targetPageView.onShow();
					targetPageView.show();
					currentPageView.hide();
					currentPageView.status=false; 
					currentPageView.onHide();
					targetPageView.status=true; 

					
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
						currentPageView.status=false;
						currentPageView.hide();
						currentPageView.onHide();
					});	
				}
					
			}else{
				if(!self.duration){ 
					targetPageView.onShow();
					targetPageView.show();
					targetPageView.status=true;
					currentPageView.hide();
					currentPageView.status=false;
					currentPageView.onHide();
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
							 if(currentPageView){
								 currentPageView.hide();
								 currentPageView.status=false;
								 currentPageView.onHide();
								 currentPageView.$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
							 }
							 
							 pv.$pageEl.removeClass("animated").removeClass(self.animate.animateIn);
						 });
					 }
					 
				 }else{
					 if(!self.duration){
						 if(currentPageView){ 
							 currentPageView.hide();
							 currentPageView.onHide();
							 currentPageView.status=false;
						 }
						 self.PageViewMgr.mapping[pageViewName].show(); 
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
		// ÿ����תʹ����ת����
		goParam:{
			anim:false,
			duration:300,
			easing:'linear'
		},
		// ȫ��ʹ��
		animate:{
			anim:true,
			duration:300,
			//easing:'linear'
			animateIn:Animate.FadingEntrances[5],
			animateOut:Animate.FadingExits[5]
			
		},
		// �Ƿ�����Ч����
		duration:false,
		// ��Ҫ���android back ��ť
	    hybridBack:function(){
	    	var currentPage= UC.PageViewMgr.getCurrentShow();
	    	currentPage.triggerBack();
	    	
	    },
	    previewImage:function(url,bakUrl){   
	    	$("#photograph").find("img").eq(0).attr("src",bakUrl);
	    	$("#photographIcon").hide();
	    	$("#photograph").data("url",url); 
	    	$("#photograph").data("bakUrl",bakUrl); 
	    	//UC.go('imageView',{url:url});
	    	window.Native.gotoPreviewImage(url); 
	    	//this.addYL(123, url);
	    },
	    hideLoading:function(id,url){
	    	
	    	/**
	    	var ylArray=JSON.parse(localStorage.getItem("ylArray"));  
	    	if(!ylArray){
	    		alert(123);
	    		ylArray=[];
	    	} 
	    	var ylObj={
    	    		id:id,
    	    		url:url
    	    	};
	    	 
	    	ylArray.push(ylObj);  
	    	localStorage.setItem("ylArray",JSON.stringfy(ylArray)); 
	    	UC.PageViewMgr.mapping["yulu"].refreshDaiYuLu();
	    	**/
	    	//alert(UC.PageViewMgr.mapping["yulu"]);
	    	//alert(UC.PageViewMgr.mapping["yulu"].hideLoading);
	    	var pg=UC.PageViewMgr.mapping["yulu"];
	    	pg.hideLoading("");
	    	var count= parseInt( pg.$el.find("#prerecordCount").val())-1;
	    	pg.$el.find("#prerecordCount").val("count");
	    	$("#photograph").find("img").eq(0).attr("src","");
	    	$("#photographIcon").show();
	    	$("#photograph").data("url",""); 
	    	$("#photograph").data("bakUrl",""); 
	    	pg.showAlert("上传成功.....");
	    	return;
	    },
	    removeYL:function(id){
	    	
	    },
	    hide:function(){
	    	
	    }
			
	};
	
	var Main=Backbone.Router.extend({
		
		routes: { 
			"*actions" : "defaultRoute"

			},

		defaultRoute : function(actions){
		   var name,
		   	   params=!actions?[]:actions.split("/");
		   //console.log(actions);
		  
		   if(window.location.hash){
			   name=params[0];
		   }  
		   if(!name){
			   window.location.hash="login";
			   return;
		   }
		   UC.params=params;
		   UC.show(name);
		   

		},
		//处理开机画面
		procStartPage:function(){
			
		}
	});
	window.UC=UC;
	var main=new Main();
	Backbone.history.start();
});