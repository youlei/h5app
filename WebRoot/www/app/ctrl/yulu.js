define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateYulu','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateYulu,basePageView,userModel){
	
	var yuluView=basePageView.extend({
		events:{
			"click [name='tab']":"switchTab",
			
			
		},
		switchTab:function(e){
			console.log(e.srcElement);
			$("[name='tab']").removeClass("cur");
			$(e.srcElement).addClass("cur");
			if($(e.srcElement).text()=="预录"){
				$("#yulu").show();
				$("#daiyulu").hide();
				$("#yiwancheng").hide();
			}else if($(e.srcElement).text()=="待处理"){
				$("#yulu").hide();
				$("#daiyulu").show();
				$("#yiwancheng").hide();
			}else if($(e.srcElement).text()=="已完成"){
				$("#yulu").hide();
				$("#daiyulu").hide();
				$("#yiwancheng").show();
			}
		},
		 
		getCode:function(){
			UC.go("register2");
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateYulu),
            	tplBottomNav=this.initTemplate(TemplateBottomNav);
           	self=this;  
       		self.$el.html(tplYulu()); 
       		$(tplBottomNav()).appendTo(self.$el);
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'dulei info sys',
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('login');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
        },
        onShow:function(){
        	
       	  
        }
	});
	return yuluView;
	
});