define(['lib','jquery','underscore','backbone','text!TemplateHeader'],function(lib,$,_,Backbone,TemplateHeader){
	var Header=function(param){
		this.title=param.title||"";
		this.back=param.back||false;
		this.home=param.back||false;
		this.view=param.back||false;
		this.pageView=param.pageView;
		this.$headerEl=null;
		this.events={
			returnHandler:function(){
				
			},
			homeHandler:function(){
				
			}
				
		};
		
		Header.prototype.set=function(param){
			if(param.events){
				if(param.events.returnHandler){
					this.events.returnHandler=param.events.returnHandler;
				}
				if(param.events.homeHandler){
					this.events.homeHandler=param.events.homeHandler;
				}
			}
			this.render(param);
		};
		Header.prototype.initTemplate=function(){
			 return _.template(TemplateHeader);
		};
		Header.prototype.render=function(param){
			 var tpl = this.initTemplate();
	         this.$headerEl=$(tpl({ "data": param })).prependTo(this.pageView.$el);   
	         this.eventSetUp();
	       	 //this.pageView.$el.html(tpl({ "data": param })); 
		};
		Header.prototype.eventSetUp=function(){
			this.$headerEl.find("#headerBack").on("click",this.events.returnHandler);
			this.$headerEl.find("#headerHome").on("click",this.events.homeHandler);
			
		};
		
	}
	var BasePageView=Backbone.View.extend({
		$el:null,
		name:null,
		timestap:null,
		events:{},
		status:true,
		header:null, 
		 
		//eventNameArr:"blur change click dblclick error focus focusin focusout keydown keypress keyup mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll submit unload ready hover".split(","),
		initialize:function(){
			var self=this,
				$el,
				name=window.location.hash.substring(1),
				id=new Date().getTime();
			self.name=name;
			self.timestap=id;
			
			if(!UC.PageViewMgr.mapping[name]){ 
				var left= $(document).width();
				$el= $("<div id='client_id_viewport_"+id+"' style='display:block;position:absolute;width:100%;left:"+left+"px;height: 100%; background-color: #999;'page-url='"+name+"' data-view-name='"+name+"' ></div>").appendTo($("body"));
				self.$el=$el;
				
				self.onCreate(); 
				//UC.PageViewMgr.mapping[name]=self;
				//self._handleBindEvent(self.events);
			}else{
				
				
			}
			//UC.PageViewMgr.mapping[name].show();
			UC.PageViewMgr.add(self);
			var header=new Header({pageView:self,title:'',back:false,home:false,view:false});
			self.header=header;
			self.onShow();
			
		},
		 
		show:function(){ 
			this.$el.show();
			
		},
		hide:function(){
			
			this.$el.hide();
		},
		onCreate:function(){
			
		},
		onShow:function(){
			console.log("show...............");
		}
	});
	return BasePageView;
});