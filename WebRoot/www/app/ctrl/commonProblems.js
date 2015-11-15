define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateViolations','basePageView','userModel','shippingDateQuery','text!TemplateCommonProblems'],function(jquery,_,Backbone,TemplateBottomNav,TemplateViolations,basePageView,userModel,shippingDateQuery,TemplateCommonProblems){
	var model=new userModel();
	var myView=basePageView.extend({
		events:{
			 'click #search':'search'
		},
		currentPage:0,
		selectPar:'',
		hasDate:true,
		initTemplate: function (template) {
            return _.template(template);
        },
        search:function(){
        	var self=this;  
        	 
    		var $list=$("<div></div>").appendTo( self.$el);
    		self.currentPage=1;
    		self.showLoading();
    		self.selectPar=self.$el.find("#searchTxt").val();
        	model.fetch({
        		url:UC.actionUrl+"appCommonProblem/view",
        		params:{
        			selectPar:self.$el.find("#searchTxt").val(), 
        			limit:10,
        			start:0
        		},
        		success:function(me,data){
        			self.hideLoading()
        			
        			var html="";
        			if(data.attributes){
        				if(data.attributes.rows.length>0){
        					self.hasDate=true;
            				self.currentPage++;
            			}else{
            				self.hasDate=false;
            				return;
            			}
        				for(var i=0;i<data.attributes.rows.length;i++){
        					var str="	<li>"
								 +"<div class='duix_box'>"
								 +"<div class='duix_box_1' style='text-align: center;'>"+data.rows[i].title+"</div>"
								 +"<div class='duix_box_2'>"
								 +" <div class='duix_box_2_l'></div>"
								 +" <div class='duix_box_2_r'>"+data.rows[i].content+"</div>"
								 +"</div>" 
								 
								 +"</div>"
								 +"<li> ";
		        				html+=str;
            			}
        				
        			}else{
        				if(data.rows.length>0){
        					self.hasDate=true;
            				self.currentPage++;
            			}else{
            				self.hasDate=false;
            				return;
            			}
        				for(var i=0;i<data.rows.length;i++){
        					var str="	<li>"
								 +"<div class='duix_box'>"
								 +"<div class='duix_box_1' style='text-align: center;'>"+data.rows[i].title+"</div>"
								 +"<div class='duix_box_2'>"
								 +" <div class='duix_box_2_l'></div>"
								 +" <div class='duix_box_2_r'>"+data.rows[i].content+"</div>"
								 +"</div>" 
								 
								 +"</div>"
								 +"<li> ";
		        				html+=str;
            			}
        			}
        			
        			$("#shippingDateQueryListUl").empty();
        			$(html).appendTo($("#shippingDateQueryListUl"));
        						
        			//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        		},
        		error:function(data){
        			self.hideLoading();
        		}
        	});
        	
        },
        render: function (data) {
        	var	self=this;
    		var $list=$("<div></div>").appendTo( self.$el);  
        	model.fetch({
        		url:UC.actionUrl+"appCommonProblem/view",
        		params:{
        			start:0,
        			limit:UC.pageInfo.limit 
        		},
        		success:function(me,data){
        			var tpl = self.initTemplate(TemplateCommonProblems);
        			if(data.rows.length=0){ 
        				self.hasDate=false;
        			}
        			$list.html(tpl({data:data.rows}));
        			 
        		},
        		error:function(data){
        			
        		}
        	}); 
       		
        },
        onCreate:function(){
        	var self=this;
       	    this.render();
	       	this.header.set({
	   			title:'常见问题列表',
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('find');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
	       	
	    	$(window).scroll(function () {
			    if ($(document).scrollTop() + $(window).height() >= $(document).height()) { 
			    	if(	!self.hasDate){
			    		return;
			    	}
			    	self.showLoading();
			    	model.fetch({
		        		url:UC.actionUrl+"appCommonProblem/view",
		        		params:{
		        			selectPar:self.selectPar,
		        			limit:UC.pageInfo.limit, 
		        			start:self.currentPage*UC.pageInfo.limit
		        		},
		        		success:function(me,data){
		        			//var tpl = self.initTemplate(TemplateTelDetailList);
		        			self.hideLoading();
		        			var html="";
		        			if(data.attributes){
		        				
		        				if(data.attributes.rows.length==0){
			        				self.currentPage++;
			        				self.hasDate=false;
			        			}
			        			
			        			for(var i=0;i<data.attributes.rows.length;i++){
			        				var str="	<li>"
									 +"<div class='duix_box'>"
									 +"<div class='duix_box_1' style='text-align: center;'>"+data.attributes.rows[i].title+"</div>"
									 +"<div class='duix_box_2'>"
									 +" <div class='duix_box_2_l'></div>"
									 +" <div class='duix_box_2_r'>"+data.attributes.rows[i].content+"</div>"
									 +"</div>" 
									 
									 +"</div>"
									 +"<li> ";
			        				html+=str;
			        			}
		        			}else{
		        				if(data.rows.length==0){
			        				self.currentPage++;
			        				self.hasDate=false;
			        			}
			        			
			        			for(var i=0;i<data.rows.length;i++){
			        				var str="	<li>"
									 +"<div class='duix_box'>"
									 +"<div class='duix_box_1' style='text-align: center;'>"+data.rows[i].title+"</div>"
									 +"<div class='duix_box_2'>"
									 +" <div class='duix_box_2_l'></div>"
									 +" <div class='duix_box_2_r'>"+data.rows[i].content+"</div>"
									 +"</div>" 
									 
									 +"</div>"
									 +"<li> ";
			        				html+=str;
			        			}
		        			}
		        			
		        			$(html).appendTo(self.$el.find("#shippingDateQueryListUl"));
		        		},
		        		error:function(data){
		        			self.hideLoading();
		        		}
		        	});
			    }
			});
        },
        onHide:function(){
        	$(window).unbind("scroll");
        	 
        	
        },
        onShow:function(){
        	
       	  
        }
	});
	return myView;
	
});