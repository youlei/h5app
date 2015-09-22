define(['lib','jquery','underscore','backbone','text!TemplateHeader','alert'],function(lib,$,_,Backbone,TemplateHeader,alert){
	var Header=function(param){
		this.title=param.title||"";
		this.back=param.back||false;
		this.home=param.back||false;
		this.view=param.back||false;
		this.pageView=param.pageView;
		this.$headerEl=null;
		this.$backBt=null;
		this.$homeBt=null;
		this.events={
			returnHandler:function(){
			 
			},
			homeHandler:function(){
				 
			}
				
		};
		
		Header.prototype.set=function(param){
			 
			
		   if(param.view){
				this.$headerEl.show();
			}else{
				this.$headerEl.hide();
			}
			this.$headerEl.find("#title").html(param.title);
			if(param.events){
				if(param.events.returnHandler){
					this.events.returnHandler=param.events.returnHandler;
				}
				if(param.events.homeHandler){
					this.events.homeHandler=param.events.homeHandler;
				}
			}
		 
			//this.render(param);
			this.eventSetUp();
		};
		Header.prototype.initTemplate=function(){
			 return _.template(TemplateHeader);
		};
		Header.prototype.render=function(param){
			 var self=this;
			 var data=param||{
				 title:self.title,
				 back:self.back,
				 home:self.home,
				 view:self.view
			 };
			 var tpl = this.initTemplate();
	         this.$headerEl=$(tpl({ "data": data })).prependTo(this.pageView.$pageEl);   
	         //this.eventSetUp();
	       	 //this.pageView.$el.html(tpl({ "data": param })); 
		};
		
		Header.prototype.eventSetUp=function(){
			 
			this.$backBt=this.$headerEl.find("#headerBack").on("click",this.events.returnHandler);
			this.$homeBt=this.$headerEl.find("#headerHome").on("click",this.events.homeHandler); 
		};
		
	}
	var BasePageView=Backbone.View.extend({
		// 存放页面的内容 不包括title 
		$el:null,
		// 整个页面
		$pageEl:null,
		name:null,
		timestap:null,
		events:{},
		status:true,
		header:null, 
		alert:null, 
		initialize:function(){
			var self=this,
				$el,
				name=window.location.hash.substring(1),
				id=new Date().getTime();
			self.name=name;
			self.timestap=id;
			self.alert=new alert();
		
			var left= $(document).width();
			self.$pageEl= $("<div id='client_id_viewport_"+id+"' style='display:block;position:absolute;width:100%;left:"+left+"px;height: 100%;background:#E9ECF1 'page-url='"+name+"' data-view-name='"+name+"' ></div>").appendTo($("body"));
			
			self.$el=$("<div id='main'></div>").appendTo(self.$pageEl);
			var header=new Header({pageView:self,title:'',back:false,home:false,view:false});
			header.render();
			self.header=header;
			self.onCreate();
				
					
			UC.PageViewMgr.add(self);
			self.onShow();
			
		},
		// 触发header 的back 按钮
		triggerBack:function(){
			this.header.$backBt.trigger("click");
		},
		show:function(){ 
			this.$pageEl.show();
			
		},
		hide:function(){
			
			this.$pageEl.hide();
		},
		onCreate:function(){
			
		},
		onShow:function(){
			console.log("show...............");
		},
		
		showAlert:function(param){
			this.alert.alert(param);
		},
		
		showConfirm:function(param){
			
			this.alert.confirm(param);
		},
		
		showToast:function(param){
			
			this.alert.toast(param);
		},
		showLoading:function(param){
			
			this.alert.loading(param);
		}
		
	});
	return BasePageView;
});