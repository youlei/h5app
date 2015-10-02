define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateYulu','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateYulu,basePageView,userModel){
	
	var yuluView=basePageView.extend({
		events:{
		 
			'click #selectYuluByCamear':'getImageFormCamera',
			'click #selectYuluByAlbum':'getImageFormAlbum',
			'click #h5Album':'h5Album',
			'change #h5file':'',
			'click #subYulu':'submitYulu',
			"click [name='tab']":"switchTab",
			"click #photograph":"photograph",
			"click #yl2 img":"previewImg",
			"click #yl3 img":"previewImg",
			"click #yl4 img":"previewImg",
			"click #yl2 [name='cancel']":"cancelYulu",
			"click #yl2 [name='jiaji']":"jiajiYulu",
			
			
		},
		$canvas:null,
		$perview:null,
		$tmpview:null,
		
		switchTab:function(e){
			
			$("[name='tab']").removeClass("hover");
			$(e.srcElement).addClass("hover");
			if($(e.srcElement).text()=="预录"){
				$("[name='tabContent']").hide();
				$("#yl1").show();
				
				//$("#yiwancheng").hide();
			}else if($(e.srcElement).text()=="待预录"){
				$("[name='tabContent']").hide();
				$("#yl2").show();
			}else if($(e.srcElement).text()=="待处理"){
				$("[name='tabContent']").hide();
				$("#yl3").show();
			}else if($(e.srcElement).text()=="已完成"){
				$("[name='tabContent']").hide();
				$("#yl4").show();
			}
		},
	    getBase64Image:function(img) {
	    	  
		      var self=this, 
		      	  canvas = document.createElement("canvas");
		      canvas.width = img.width;
		      canvas.height = img.height; 
		       
		      var ctx = canvas.getContext("2d");
		      ctx.drawImage(img, 0, 0, img.width, img.height);
		      self.$canvas= $(canvas).appendTo(this.$el);
		      var dataURL;
		      try{
		    	 dataURL = canvas.toDataURL("image/jpeg");
		      }catch(e){
		    	  alert('exception...........');
		    	  
		      }
		       
		      return dataURL; 
		},
		jiajiYulu:function(e){
			var $this=$(e.srcElement),
				id=$this.data("id");
			
		},
		cancelYulu:function(e){
			var $this=$(e.srcElement),
				id=$this.data("id"); 
		},
		previewImg:function(e){
			var $this=$(e.srcElement); 
			window.Native.gotoPreviewImage($this.attr("name"));
		},
		submitYulu:function(){
			//var image=$("#previewImg");
			var self=this;
			if($("#photograph").data("url")){
				if(self.img==$("#photograph").data("url")){
					self.showAlert("不能重复提交同一张图片");
					return;
				}
				self.showLoading("提交图片请等候......"); 
				setTimeout(function(){ 
					//var serverUrl="http://192.168.1.106:8080/UCAPPService/UCService?accountName=youlei&password=123456&fileName="+$("#photograph").data("url");
					var serverUrl="http://192.168.1.109:8090/appAppPrerecordInfo/savePrerecordInfo?accountName=18602922416&password=123456&fileName="+$("#photograph").data("url");
					self.img=$("#photograph").data("url");  
					window.Native.uploadFile(serverUrl,$("#photograph").data("url")); 
				},1000);
				setTimeout(function(){ 
					umodel=new userModel();
			       	umodel.fetch({
						url:UC.actionUrl+"appAppPrerecordInfo/queryPendingByAccountName",
						params:{
							accountName:'18602922416'
						},
						success:function(obj){   
							var resultArray= obj.attributes; 
							self.refreshGrid(resultArray);
						},
						error:function(){
							self.showToast("请求错误.....");
						}
					});
				},20000);
				
				
			}else{
				self.showAlert("请先拍照");
			}
			
			
		},
		selectChange:function(e){
			
		},
		h5Album:function(){
			
			$('h5file').trigger("click");
			
			//canvas.width=
		},
		photograph:function(){
			var self=this;
			self.showConfirm({
				title:'请选择',
				sure:'拍照',
				cancel:'相册',
				sureCallback:function(){
					self.getImageFormCamera();
				},
				cancelCallback:function(){
					self.getImageFormAlbum();
				}
				
			});
			
		}, 
		refreshGrid:function(result){
			var self=this;   
			self.refreshDYL(result.DYL);
			self.refreshDCL(result.DCL);
			self.refreshYWC(result.YWC);
			 
			
		},
		refreshDYL:function(data){
			 
			var self=this,
				html=""; 
		    for(var i=0;i<data.length;i++){
		    	 
		    	var bakFile=data[i].fileName+".bak"; 
		    	html+=" <li id='"+data[i].id+"'><div class='daiyulu_li'  name='dyl' style=''>"
		              +"<div class='daiyulu_button'> <a href='javascript:void(0);' class='daiyulu_jiaji' data-id='"+data[i].id+"' name='jiaji'>加急</a> <a href='javascript:void(0);' class='daiyulu_quxiao' "+data[i].id+" name='cancel'>取消</a> </div>"
		              +"<div class='daiyulu_img'><img style='width:150px;height:150px;border:0;' name='"+data[i].fileName+"'  src='"+bakFile+"' alt=''></div>"
		              +"</div>"
		              +"<div class='daiyulu_line'></div> </li>";
		    } 
		    //$("#dylUl").empty(); 
		    $(html).appendTo(self.$el.find("#dylUl")); 
		    
		},
		refreshDCL:function(data){
			var self=this,
				html=""; 
		    for(var i=0;i<data.length;i++){
		    	 
		    	var bakFile=data[i].fileName+".bak"; 
		    	html+="	<li>"
					    +"<div class='daiyulu_li' name='dcl'>"
					    +"		  <div class='daiyulu_button'> 申请时间:9-24  15:32:32<br>完成时间:9-24  15:32:32</div>"
					    +"		  <div class='daiyulu_img'><img style='width:150px;height:150px;border:0;' src='"+bakFile+"' alt=''></div>"
					    +"		</div>"
					    +"		<div class='login_page_user_button table_div'>确认预录</div>"
					    +"		<div class='daiyulu_line'></div>"
					    +"	  </li>";
		    	
			    } 
		    //$("#dylUl").empty(); 
		    $(html).appendTo(self.$el.find("#dclUl")); 
		
		},
		refreshYWC:function(data){
			
			var self=this,
			html=""; 
	    for(var i=0;i<data.length;i++){
	    	 
	    	var bakFile=data[i].fileName+".bak"; 
	    	html+="	<li>"
				    +"<div class='daiyulu_li' name='ywc'>"
				    +"		  <div class='daiyulu_button'> 申请时间:9-24  15:32:32<br>完成时间:9-24  15:32:32</div>"
				    +"		  <div class='daiyulu_img'><img style='width:150px;height:150px;border:0;' src='"+bakFile+"' alt=''></div>"
				    +"		</div>"
				
				    +"		<div class='daiyulu_line'></div>"
				    +"	  </li>";
	    	
		    } 
	    //$("#dylUl").empty(); 
	    $(html).appendTo(self.$el.find("#ywcUl")); 
		},
		getImageFormCamera:function(){ 
			 
			window.Native.getImageFromCamera();
		},
		getImageFormAlbum:function(){
			 
			window.Native.getImageFromAlbum();
			
		},
		 
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateYulu),
            	tplBottomNav=this.initTemplate(TemplateBottomNav);
           	self=this;  
       		self.$el.html(tplYulu()); 
       		//$(tplBottomNav()).appendTo(self.$el);
       		 
       		
        },
        showObject:function(obj){  
            
            var self=this,
            	arr=new Array();
            
            for(i in obj){  
                  if(typeof(obj[i])=='object')  
                  {  
                    arr.push(i+'={'+self.showObject(obj[i])+'}');  
                  }else{  
                    arr.push(i+'='+obj[i]+'\n');  
                  }  
            }  
      
            return arr.join('');  
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
	       	//
	        
	       	umodel=new userModel();
	       	umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryPendingByAccountName",
				params:{
					accountName:'18602922416'
				},
				success:function(obj){   
					var resultArray= obj.attributes; 
					self.refreshGrid(resultArray);
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
	        
	       	 
	    	umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryPrerecordCount",
				params:{
					accountName:'18602922416'
				},
				success:function(obj){ 
					var prerecordCount= obj.attributes.prerecordCount;
					self.$el.find("#prerecordCount").text(prerecordCount);
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
			 
		 
        },
        onShow:function(){
        	
       	  
        }
	});
	return yuluView;
	
});