define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateYulu','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateYulu,basePageView,userModel){
	var umodel=new userModel();
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
			"click #dclUl button":"confirmDCL"
			
			
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
			}else if($(e.srcElement).text()=="待确认"){
				$("[name='tabContent']").hide();
				$("#yl3").show();
			}else if($(e.srcElement).text()=="已完成"){
				$("[name='tabContent']").hide();
				$("#yl4").show();
			}
			self.refresh();
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
		confirmDCL:function(e){
			var self=this,
				$this=$(e.srcElement),
				id=$this.data("id"); 
			self.showLoading();  
	       	umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/confirmPrerecordCount",
				params:{
					id:id,
					accountName:localStorage.getItem("username")
				},
				success:function(obj){   
					self.hideLoading();
					self.showAlert("确认成功"); 
					self.refresh();
					 
				},
				error:function(){
					self.showToast("确认失败");
				}
			});
		},
		cancelYulu:function(e){
			var self=this,
				$this=$(e.srcElement),
				id=$this.data("id"); 
			self.showLoading(); 
			 
	       	umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/cancelPrerecordCount",
				params:{
					id:id,
					accountName:localStorage.getItem("username")
				},
				success:function(obj){   
					self.hideLoading();
					self.showAlert("取消成功"); 
					self.refresh();
					 
				},
				error:function(){
					self.showToast("取消失败");
				}
			});
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
					var serverUrl=UC.actionUrl+"appAppPrerecordInfo/savePrerecordInfo?accountName="+localStorage.getItem('username')+"&password="+localStorage.getItem("password")+"&fileName="+$("#photograph").data("url")+"&fileBak="+$("#photograph").data("bakUrl");
					self.img=$("#photograph").data("url");  
					window.Native.uploadFile(serverUrl,$("#photograph").data("url"),$("#photograph").data("bakUrl")); 
				},1000);
				setInterval(function(){ 
					 
			       	umodel.fetch({
						url:UC.actionUrl+"appAppPrerecordInfo/queryPendingByAccountName",
						params:{
							accountName:localStorage.getItem('username')
						},
						success:function(obj){   
							if(obj.attributes){
								var resultArray= obj.attributes; 
								self.refreshGrid(resultArray);
							}else{
								var resultArray= obj; 
								self.refreshGrid(resultArray);
							}
							
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
		refresh:function(){
		 
			umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryPendingByAccountName",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){   
					if(obj.attributes){
						var resultArray= obj.attributes; 
						self.refreshGrid(resultArray);
					}else{
						var resultArray= obj; 
						self.refreshGrid(resultArray);
					}
					umodel.fetch({
						url:UC.actionUrl+"appAppPrerecordInfo/queryPrerecordCount",
						params:{
							accountName:localStorage.getItem("username")
						},
						success:function(obj){ 
							var prerecordCount;
							if(obj.attributes){
								prerecordCount= obj.attributes.prerecordCount;
							}else{
								prerecordCount= obj.prerecordCount;
							}
							 
							self.$el.find("#prerecordCount").text(prerecordCount);
						},
						error:function(){
							self.showToast("请求错误.....");
						}
					});
				},
				error:function(){
					self.showToast("请求错误.....");
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
		    	var bakFile=data[i].fileBak; 
		    	html+=" <li id='"+data[i].id+"'><div class='daiyulu_li'  name='dyl' style=''>"
		              +"<div class='daiyulu_button'> <a href='javascript:void(0);' class='daiyulu_jiaji' data-id='"+data[i].id+"' name='jiaji'>加急</a> <a href='javascript:void(0);' class='daiyulu_quxiao' data-id="+data[i].id+" name='cancel'>取消</a> </div>"
		              +"<div class='daiyulu_img'><img style='width: 130px;height: 110px;border:0;' name='"+data[i].fileName+"'  src='"+bakFile+"' alt=''></div>"
		              +"</div>"
		              +"<div class='daiyulu_line'></div> </li>";
		    } 
		    $("#dylUl").empty(); 
		    $(html).appendTo(self.$el.find("#dylUl")); 
		    
		},
		refreshDCL:function(data){
			var self=this,
				html=""; 
		    for(var i=0;i<data.length;i++){ 
		    	var bakFile=data[i].fileBak; 
		    	html+="<li>"
		            +"<div class='yiwancheng_button'>"
		            +"<ul>"
		            +"  <li><img style='width:160px;height:120px;' name='"+data[i].fileName+"' src='"+bakFile+"' alt=''></li>"
		            +"  <li><img style='width:160px;height:120px;' name='"+data[i].xpImageUrl+"' src='"+data[i].xpImageUrl+"' alt=''></li>"
		            +"</ul>"
		            +"</div>"
		            +"<div class='yiwancheng_button'>"
		            +"<button data-id='"+data[i].id+"' style=' width: 100%;height: 30px;border-radius: 100; border-radius: 4px;opacity: 0.7;background: #93e246;'>预录确认</button>"
		            +"</div>"
		            +"<div class='yiwancheng_line'></div>"
		            +"</li>";
		    	
			    } 
		    $("#dclUl").empty(); 
		    $(html).appendTo(self.$el.find("#dclUl")); 
		
		},
		refreshYWC:function(data){
			
			var self=this,
			html=""; 
		    for(var i=0;i<data.length;i++){
		    	 
		    	var bakFile=data[i].fileBak; 
			    	html+="<li>"
		            +"<div class='yiwancheng_button'>"
		            +"<ul>"
		            +"  <li><img style='width:160px;height:120px;' name='"+data[i].fileName+"' src='"+bakFile+"' alt=''></li>"
		            +"  <li><img style='width:160px;height:120px;' name='"+data[i].xpImageUrl+"' src='"+data[i].xpImageUrl+"' alt=''></li>"
		            +"</ul>"
		            +"</div>"
		            +"<div class='yiwancheng_button'>"
		            +"<ul>"
		            +"  <li>申请:"+data[i].createDate+"</li>"
		            +"  <li>完成:"+data[i].wcDate+"</li>"
		            +"</ul>"
		            +"</div>"
		            +"<div class='yiwancheng_line'></div>"
		            +"</li>";
		    	
			    } 
	    	$("#ywcUl").empty(); 
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
	   			title:'今日物流',
	   			view:true,
	   			back:false,
	   			home:true,
	   			events:{
	   				returnHandler:function(){
	   					UC.go('home');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
	       	//
	        
	      
	       	umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryPendingByAccountName",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){   
					if(obj.attributes){
						var resultArray= obj.attributes; 
						self.refreshGrid(resultArray);
					}else{
						var resultArray= obj; 
						self.refreshGrid(resultArray);
					}
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
	        
	       	 
	    	umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryPrerecordCount",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){ 
					
					var prerecordCount;
					if(obj.attributes){
						prerecordCount= obj.attributes.prerecordCount;
					}else{
						prerecordCount= obj.prerecordCount;
					}
					 
					self.$el.find("#prerecordCount").text(prerecordCount);
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
	    	umodel.fetch({
				url:UC.actionUrl+"appAccountInfo/myAccountInfo",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){ 
					var myAccountInfo;
					if(obj.attributes){
					 
						myAccountInfo= obj.attributes.myAccountInfo[0];
					}else{
						myAccountInfo= obj.myAccountInfo[0];
					}
					 
					self.$el.find(".yulu_kefu").eq(0).html("客服电话："+myAccountInfo.customerPhone);
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
	    	setInterval(function(){
	    		umodel.fetch({
					url:UC.actionUrl+"appAppPrerecordInfo/queryRechargeRecords",
					params:{
						accountName:localStorage.getItem("username")
					},
					success:function(obj){ 
						//var prerecordCount= obj.attributes.prerecordCount;
						//self.$el.find("#prerecordCount").text(prerecordCount);
						var str="";
						if(obj.attributes.rows){
							 
							for(var i=0;i<obj.attributes.rows.length;i++){
								str=str+"<li><span class='yulu_gundong_right'>"+obj.attributes.rows[i].recordDate+"</span>用户"+obj.attributes.rows[i].phone+"充值了"+obj.attributes.rows[i].recordMoney+"元</li>";
							}
						}else{
							
							for(var i=0;i<obj.rows.length;i++){
								str=str+"<li><span class='yulu_gundong_right'>"+obj.rows[i].recordDate+"</span>用户"+obj.rows[i].phone+"充值了"+obj.rows[i].recordMoney+"元</li>";
							}
						}
						self.$el.find("#yuluSrcoll").html(str);
					},
					error:function(){
						self.showToast("请求错误.....");
					}
				});
	    		
	    	},2000);
	    
		 
        },
        onShow:function(){
        	
        	if(!UC.isLogin()){
        		UC.go('login');
        	}
        	
        	
			 
        }
	});
	return yuluView;
	
});