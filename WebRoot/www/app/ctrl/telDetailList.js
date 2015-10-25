define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateTelDetailList','basePageView','userModel','iscroll'],function(jquery,_,Backbone,TemplateBottomNav,TemplateTelDetailList,basePageView,userModel,iScroll){
	var model=new userModel();
	var myView=basePageView.extend({
		events:{
			 //'click li':'gotoTelDetail'
			"click #search":"search"
		},
		currentPage:1,
		gotoTelDetail:function(){ 
			UC.go('telDetail');
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        search:function(){
        	var self=this;  
        	 
    		var $list=$("<div></div>").appendTo( self.$el);
    		self.currentPage=1;
    		self.showLoading();
        	model.fetch({
        		url:UC.actionUrl+'appariticle/getAriticleByCategoryId', 
        		params:{
        			title:encodeURI(encodeURI(self.$el.find("#searchTxt").val())),
        			cid:UC.goParam.id,
        			limit:10,
        			start:0
        		},
        		success:function(me,data){
        			self.hideLoading()
        		 
        			var html="";
        			if(data.attributes){
        				if(data.attributes.rows.length>0){
        					self.currentPage++;
        				}
        				for(var i=0;i<data.attributes.rows.length;i++){
            				var str="	<li>"
    						 +"<div class='duix_box'>"
    						 +"<div class='duix_box_1'>"+data.attributes.rows[i].title+"</div>"
    						 +"<div class='duix_box_2'>"
    						 +" <div class='duix_box_2_l'>范围：</div>"
    						 +" <div class='duix_box_2_r'>"+data.attributes.rows[i].content+"</div>"
    						 +"</div>" 
    						 +"<div class='duix_box_2'>"
    						 +" <div class='duix_box_2_l'>地址：</div>"
    						 +" <div class='duix_box_2_r'>"+data.attributes.rows[i].address+"</div>"
    						 +"</div>" 
    						 +"<div class='duix_box_2'>"
    						 +" <div class='duix_box_2_l'>电话：</div>"
    						 +" <div class='duix_box_2_r '>"+data.attributes.rows[i].lxfs+"</div>"
    						 +"</div>"
    						 +"</div>"
    						 +"<li> ";
            				html+=str;
            			}
        			}else{
        				if(data.rows.length>0){
        					self.currentPage++;
        				}
        				for(var i=0;i<data.rows.length;i++){
            				var str="	<li>"
    						 +"<div class='duix_box'>"
    						 +"<div class='duix_box_1'>"+data.rows[i].title+"</div>"
    						 +"<div class='duix_box_2'>"
    						 +" <div class='duix_box_2_l'>范围：</div>"
    						 +" <div class='duix_box_2_r'>"+data.rows[i].content+"</div>"
    						 +"</div>" 
    						 +"<div class='duix_box_2'>"
    						 +" <div class='duix_box_2_l'>地址：</div>"
    						 +" <div class='duix_box_2_r'>"+data.rows[i].address+"</div>"
    						 +"</div>" 
    						 +"<div class='duix_box_2'>"
    						 +" <div class='duix_box_2_l'>电话：</div>"
    						 +" <div class='duix_box_2_r '>"+data.rows[i].lxfs+"</div>"
    						 +"</div>"
    						 +"</div>"
    						 +"<li> ";
            				html+=str;
            			}
        			}
        			
        			self.$el.find("#telDetailListUl").empty();
        			$(html).appendTo($("#telDetailListUl"));
        						
        			//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        		},
        		error:function(data){
        			self.hideLoading();
        		}
        	});
        	
        },
        render: function (data) {
        	var self=this;   
    		var $list=$("<div></div>").appendTo( self.$el);   
    		self.showLoading();
        	model.fetch({
        		url:UC.actionUrl+'appariticle/getAriticleByCategoryId',
        		params:{
        			cid:UC.goParam.id,
        			limit:10,
        			start:0
        		},
        		success:function(me,data){
        			self.hideLoading();
        			var tpl = self.initTemplate(TemplateTelDetailList);
        			$list.html(tpl({data:data.rows}));
        			
        			//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        		},
        		error:function(data){
        			self.hideLoading()
        		}
        	});
        	
        },
        onCreate:function(){
        	var self=this; 
	       	this.header.set({
	       		title:'电话大全',
	   			view:true,
	   			back:true,
	   			home:true,
	   			events:{
	   				returnHandler:function(){ 
	   					UC.go('telList');
	   				},
	   				homeHandler:function(){ 
	   					
	   				}
	   			}
	   			
	   		});
	       	$(window).scroll(function () {
			    if ($(document).scrollTop() + $(window).height() >= $(document).height()) { 
			    	self.showLoading();
			    	model.fetch({
		        		url:UC.actionUrl+'appariticle/getAriticleByCategoryId',
		        		params:{
		        			limit:10,
		        			cid:UC.goParam.id,
		        			start:self.currentPage*10
		        		},
		        		success:function(me,data){
		        			//var tpl = self.initTemplate(TemplateTelDetailList);
		        			self.hideLoading();
		        			self.currentPage++;
		        			var html="";
		        			for(var i=0;i<data.rows.length;i++){
		        				var str="	<li>"
								 +"<div class='duix_box'>"
								 +"<div class='duix_box_1'>"+data.rows[i].title+"</div>"
								 +"<div class='duix_box_2'>"
								 +" <div class='duix_box_2_l'>范围：</div>"
								 +" <div class='duix_box_2_r'>"+data.rows[i].content+"</div>"
								 +"</div>" 
								 +"<div class='duix_box_2'>"
								 +" <div class='duix_box_2_l'>地址：</div>"
								 +" <div class='duix_box_2_r'>"+data.rows[i].address+"</div>"
								 +"</div>" 
								 +"<div class='duix_box_2'>"
								 +" <div class='duix_box_2_l'>电话：</div>"
								 +" <div class='duix_box_2_r '>"+data.rows[i].lxfs+"</div>"
								 +"</div>"
								 +"</div>"
								 +"<li> ";
		        				html+=str;
		        			}
		        			$(html).appendTo($("#telDetailListUl"));
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
        	   this.render();
        	   
        }
	});
	return myView;
	
});