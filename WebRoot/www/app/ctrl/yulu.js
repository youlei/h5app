define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateYulu','basePageView','userModel','scroll'],function(jquery,_,Backbone,TemplateBottomNav,TemplateYulu,basePageView,userModel,scroll){
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
			"click #yl3 img[name='edi']":"previewDqrTextImg",
			"click #yl3 img[name='image']":"previewImg",
			"click #yl4 img[name='edi']":"previewTextImg",
			"click #yl4 img[name='image']":"previewImg",
			"click #yl2 [name='cancel']":"cancelYulu",
			"click #yl2 [name='jiaji']":"jiajiYulu",
			"click #dclUl button":"confirmDCL",
			"click #dail":'dail'
			
			
		},
		$canvas:null,
		$perview:null,
		$tmpview:null,
		prerecordCount:0,
		currentPage:0,
		currentTab:0,
		switchTab:function(e){
			var self=this;
			$("[name='tab']").removeClass("hover");
			$(e.srcElement).addClass("hover");
			if($(e.srcElement).text()=="预录"){
				$("[name='tabContent']").hide();
				$("#yl1").show(); 
				self.currentTab=0;
				//$("#yiwancheng").hide();
			}else if($(e.srcElement).text()=="待预录"){
				$("[name='tabContent']").hide();
				self.refreshDYL();
				$("#yl2").show();
				self.currentTab=1;
			}else if($(e.srcElement).text()=="待确认"){
				$("[name='tabContent']").hide();
				self.refreshDCL();
				$("#yl3").show();
				self.currentTab=2;
			}else if($(e.srcElement).text()=="已完成"){
				$("[name='tabContent']").hide();
				self.refreshYWC();
				$("#yl4").show();
			}
			self.refresh();
		},
		
		dail:function(e){
			var $this=$(e.srcElement);
			 
			location='tel:'+$this.data('tel');
			//Native.call($this.data('tel'));
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
			var self=this,
				$this=$(e.srcElement),
				id=$this.data("id");
			
			self.showAlert("加急成功"); 
			$this.hide();
			localStorage.setItem(id,true); 
		},
		confirmDCL:function(e){
			var self=this,
				$this=$(e.srcElement),
				id=$this.data("id"); 
			self.showConfirm({
				title:'请再次仔细核对小票信息，一旦确认提交，概不负责',
				sure:'确认',
				cancel:'取消',
				sureCallback:function(){
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
							self.refreshDCL();
							 
						},
						error:function(){
							self.showToast("确认失败");
						}
					});
				},
				cancelCallback:function(){
					//self.getImageFormAlbum();
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
					if(obj.attributes){
						if(obj.attributes.flag){
							self.hideLoading();
							self.showAlert("取消成功"); 
							self.refreshDYL();
						}else{
							self.hideLoading();
							self.showAlert(obj.attributes.errorMessage); 
							self.refreshDYL();
						}
					}
					
					 
				},
				error:function(){
					self.showToast("取消失败");
				}
			});
		},
		previewDqrTextImg:function(e){
			$this=$(e.currentTarget);
			UC.go("EDIPreview",{anmi:true,content:$this.data("txt"),from:'dqr'});
		},
		previewTextImg:function(e){
			$this=$(e.currentTarget);
			UC.go("EDIPreview",{anmi:true,content:$this.data("txt")});
		},
		previewImg:function(e){
			var $this=$(e.srcElement); 
			window.Native.gotoPreviewImage($this.data("src"));
		},
		submitYulu:function(){
			//var image=$("#previewImg");
			var self=this;
			umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryPrerecordCount",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){ 
					 
					if(obj.attributes){
						if(obj.attributes.prerecordCount==0){
							self.showAlert("你已没有预录，请先充值");
							self.$el.find("#prerecordCount").text(obj.prerecordCount);
							return ;
						}
					
					}else{
						if(obj.prerecordCount==0){
							self.showAlert("你已没有预录，请先充值");
							self.$el.find("#prerecordCount").text(obj.prerecordCount);
							return ;
						}
					} 
					
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
				error:function(){
					self.showToast("请求错误.....");
				}
			});
			
			
			
			
		},
		selectChange:function(e){
			
		},
		h5Album:function(){
			
			$('h5file').trigger("click");
			
			//canvas.width=
		},
		photograph:function(){
			var self=this;
			if(self.prerecordCount>0){
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
			}else{
				self.showAlert("请先充值");
			}
			
			
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
			//self.refreshDYL(result.DYL);
			//self.refreshDCL(result.DCL);
			//self.refreshYWC(result.YWC);
			 
			
		},
		refreshDYL:function(){
			var self=this;
			umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryDylByAccountName",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){ 
					 
					if(obj.attributes){
						html=""; 
						if(obj.attributes.DYL.length==0){
							 $("#dylUl").empty(); 
							 $("#dylUl").html("没有数据！！！"); 
							return ;
						}
					    for(var i=0;i<obj.attributes.DYL.length;i++){ 
					    	var isShow="block";
					    	if(localStorage.getItem(obj.attributes.DYL[i].id)){
					    		isShow="none";
					    	}
					    	html+=" <li id='"+obj.attributes.DYL[i].id+"'><div class='daiyulu_li'  name='dyl' style=''>"
					              +"<div class='daiyulu_button'> <a href='javascript:void(0);' style='display:"+isShow+"' class='daiyulu_jiaji' data-id='"+obj.attributes.DYL[i].id+"' name='jiaji'>加急</a> <a href='javascript:void(0);' class='daiyulu_quxiao' data-id="+obj.attributes.DYL[i].id+" name='cancel'>取消</a> " 
					              +"<span>提交时间："+obj.attributes.DYL[i].createDate+"</span>"
					              +"</div>"
					              +"<div class='daiyulu_img'><img style='width: 130px;height: 110px;border:0;' name='"+obj.attributes.DYL[i].fileName+"' data-src='"+obj.attributes.DYL[i].zxdImageUrl+"' src='"+obj.attributes.DYL[i].zxdThumbnailImageUrl+"' alt=''></div>"
					              +"</div>"
					              +"<div class='daiyulu_line'></div> </li>";
					    } 
					    $("#dylUl").empty(); 
					    $(html).appendTo(self.$el.find("#dylUl")); 
					}else{
						html=""; 
						if(obj.DYL.length==0){
							 $("#dylUl").empty(); 
							 $("#dylUl").html("没有数据！！！"); 
							return ;
						}
					    for(var i=0;i<obj.DYL.length;i++){  
					    	var isShow="block";
					    	if(localStorage.getItem(obj.DYL[i].id)){
					    		isShow="none";
					    	}
					    	html+=" <li id='"+obj.DYL[i].id+"'><div class='daiyulu_li'  name='dyl' style=''>"
					              +"<div class='daiyulu_button'> <a href='javascript:void(0);' style='"+isShow+"' class='daiyulu_jiaji' data-id='"+obj.DYL[i].id+"' name='jiaji'>加急</a> <a href='javascript:void(0);' class='daiyulu_quxiao' data-id="+obj.DYL[i].id+" name='cancel'>取消</a>" +
					              		"<span>提交时间："+obj.DYL[i].createDate+"</span> </div>"
					              +"<div class='daiyulu_img'><img style='width: 130px;height: 110px;border:0;' name='"+obj.DYL[i].fileName+"' data-src='"+obj.DYL[i].zxdImageUrl+"'  src='"+obj.DYL[i].zxdThumbnailImageUrl+"' alt=''></div>"
					              +"</div>"
					              +"<div class='daiyulu_line'></div> </li>";
					    } 
					    $("#dylUl").empty(); 
					    $(html).appendTo(self.$el.find("#dylUl")); 
					}
					 
					 
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
			/**
			
			
		    */
		},
		refreshDCL:function(){
			var self=this;
			var html=""; 
			umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryDqrByAccountName",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){ 
					 
					if(obj.attributes){
						if(obj.attributes.DQR.length==0){
							 $("#dclUl").empty(); 
							 $("#dclUl").html("没有数据！！！"); 
							return ;
						}
						 for(var i=0;i<obj.attributes.DQR.length;i++){ 
						    	 
						    	html+="<li>"
						            +"<div class='yiwancheng_button'>"
						            +"<ul>"
						            +"  <li><img style='width:160px;height:120px;' name='image' data-src='"+obj.attributes.DQR[i].zxdImageUrl+"' src='"+obj.attributes.DQR[i].zxdThumbnailImageUrl+"' alt=''></li>"
						            +"  <li><img name='edi' style='width:160px;height:120px;' data-txt='"+obj.attributes.DQR[i].xpcontent+"'   data-src='"+obj.attributes.DQR[i].xpImageUrl+"' src='"+obj.attributes.DQR[i].xpThumbnailImageUrl+"' alt=''></li>"
						            +"</ul>"
						            +"</div>"
						            +"<div class='yiwancheng_button'>"
						            +"<button data-id='"+obj.attributes.DQR[i].id+"' style=' width: 100%;height: 30px;border-radius: 100; border-radius: 4px;opacity: 0.7;background: #93e246;'>预录确认</button>"
						            +"</div>"
						            +"<div class='yiwancheng_line'></div>"
						            +"</li>";
						    	
							    } 
						$("#dclUl").empty(); 
						$(html).appendTo(self.$el.find("#dclUl")); 
					}else{
						if(obj.DQR.length==0){
							 $("#dclUl").empty(); 
							 $("#dclUl").html("没有数据！！！"); 
							return ;
						}
						for(var i=0;i<data.DQR.length;i++){ 
						  	html+="<li>"
					            +"<div class='yiwancheng_button'>"
					            +"<ul>"
					            +"  <li><img style='width:160px;height:120px;' name='image' data-src='"+obj.DQR[i].zxdImageUrl+"' src='"+obj.DQR[i].zxdThumbnailImageUrl+"' alt=''></li>"
					            +"  <li><img name='edi' style='width:160px;height:120px;' data-txt='"+obj.attributes.DQR[i].xpcontent+"'   data-src='"+obj.DQR[i].xpImageUrl+"' src='"+obj.DQR[i].xpThumbnailImageUrl+"' alt=''></li>"
					            +"</ul>"
					            +"</div>"
					            +"<div class='yiwancheng_button'>"
					            +"<button data-id='"+obj.DQR[i].id+"' style=' width: 100%;height: 30px;border-radius: 100; border-radius: 4px;opacity: 0.7;background: #93e246;'>预录确认</button>"
					            +"</div>"
					            +"<div class='yiwancheng_line'></div>"
					            +"</li>";
						}
						$("#dclUl").empty(); 
						$(html).appendTo(self.$el.find("#dclUl")); 
					}
					 
					 
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
			 
		   
		  
		
		},
		refreshYWC:function(){
			var self=this;
			var html=""; 
			self.currentPage=0,
			umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryYwcByAccountName",
				params:{
					accountName:localStorage.getItem("username"),
					limit:10,
					start:self.currentPage*5
				},
				success:function(obj){
					if(obj.attributes){
						if(obj.attributes.YWC.length==0){
							 $("#ywcUl").empty(); 
							 $("#ywcUl").html("没有数据！！！"); 
							return ;
						}
						for(var i=0;i<obj.attributes.YWC.length;i++){
							html+="<li>"
					            +"<div class='yiwancheng_button'>"
					            +"<ul>"
					            +"  <li><img style='width:160px;height:120px;' name='image' data-src='"+obj.attributes.YWC[i].zxdImageUrl+"'  src='"+obj.attributes.YWC[i].zxdThumbnailImageUrl+"' alt=''></li>"
					            +"  <li><img style='width:160px;height:120px;' data-txt='"+obj.attributes.YWC[i].xpcontent+"' name='edi' data-src='"+obj.attributes.YWC[i].xpImageUrl+"'  src='"+obj.attributes.YWC[i].xpThumbnailImageUrl+"' alt=''></li>"
					            +"</ul>"
					            +"</div>"
					            +"<div class='yiwancheng_button'>"
					            +"<ul>"
					            +"  <li>申请:"+obj.attributes.YWC[i].createDate+"</li>"
					            +"  <li>完成:"+obj.attributes.YWC[i].wcDate+"</li>"
					            +"</ul>"
					            +"</div>"
					            +"<div class='yiwancheng_line'></div>"
					            +"</li>";
						}
						$("#ywcUl").empty(); 
				    	$(html).appendTo(self.$el.find("#ywcUl")); 
					}else{
						if(obj.YWC.length==0){
							 $("#ywcUl").empty(); 
							 $("#ywcUl").html("没有数据！！！"); 
							return ;
						}
						for(var i=0;i<obj.YWC.length;i++){
							html+="<li>"
					            +"<div class='yiwancheng_button'>"
					            +"<ul>"
					            +"  <li><img style='width:160px;height:120px;' name='image' data-src='"+obj.DYL[i].zxdImageUrl+"' src='"+obj.YWC[i].zxdThumbnailImageUrl+"' alt=''></li>"
					            +"  <li><img style='width:160px;height:120px;' data-txt='"+obj.YWC[i].xpcontent+"' name='edi' data-src='"+obj.DYL[i].xpImageUrl+"' src='"+obj.YWC[i].xpThumbnailImageUrl+"' alt=''></li>"
					            +"</ul>"
					            +"</div>"
					            +"<div class='yiwancheng_button'>"
					            +"<ul>"
					            +"  <li>申请:"+obj.YWC[i].createDate+"</li>"
					            +"  <li>完成:"+obj.YWC[i].wcDate+"</li>"
					            +"</ul>"
					            +"</div>"
					            +"<div class='yiwancheng_line'></div>"
					            +"</li>";
						}
						$("#ywcUl").empty(); 
				    	$(html).appendTo(self.$el.find("#ywcUl")); 
					}
				},
				error:function(){
					
				},
			});
		     
	    
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
        	var self=this;
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
					self.$el.find(".yulu_kefu").eq(0).data("tel",myAccountInfo.customerPhone);
					localStorage.setItem("servicePhone",myAccountInfo.customerPhone);
					
					//href="tel:139xxxxxxxx"
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
	    	 
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
					//self.$el.find("#yuluSrcoll2").hide().html(str);
					  
					 
					$("div.yulu_gundong").myScroll({
						speed:40, //数值越大，速度越慢
						rowHeight:25 //li的高度
					});
					 

				 
					   
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
    		
	    	 
    		$(window).scroll(function () {
    			if(self.currentTab!=2){
    				return ;
    			}
			    if ($(document).scrollTop() + $(window).height() >= $(document).height()) { 
			    	self.showLoading();
			    	var html=""; 
					umodel.fetch({
						url:UC.actionUrl+"appAppPrerecordInfo/queryYwcByAccountName",
						params:{
							accountName:localStorage.getItem("username"),
							limit:10,
							start:(self.currentPage+1)*5
						},
						success:function(obj){
							self.hideLoading();
		        			self.currentPage++;
							if(obj.attributes){
								if(obj.attributes.YWC.length==0){
									self.showAlert("没有数据啦");
									return;
								}
								for(var i=0;i<obj.attributes.YWC.length;i++){
									html+="<li>"
							            +"<div class='yiwancheng_button'>"
							            +"<ul>"
							            +"  <li><img style='width:160px;height:120px;' name='"+obj.attributes.YWC[i].fileName+"' src='"+obj.attributes.YWC[i].zxdThumbnailImageUrl+"' alt=''></li>"
							            +"  <li><img style='width:160px;height:120px;' name='"+obj.attributes.YWC[i].xpImageUrl+"' src='"+obj.attributes.YWC[i].xpThumbnailImageUrl+"' alt=''></li>"
							            +"</ul>"
							            +"</div>"
							            +"<div class='yiwancheng_button'>"
							            +"<ul>"
							            +"  <li>申请:"+obj.attributes.YWC[i].createDate+"</li>"
							            +"  <li>完成:"+obj.attributes.YWC[i].wcDate+"</li>"
							            +"</ul>"
							            +"</div>"
							            +"<div class='yiwancheng_line'></div>"
							            +"</li>";
								}
								 
						    	$(html).appendTo(self.$el.find("#ywcUl")); 
							}else{
								if(obj.YWC.length==0){
									self.showAlert("没有数据啦");
									return;
								}
								for(var i=0;i<obj.YWC.length;i++){
									html+="<li>"
							            +"<div class='yiwancheng_button'>"
							            +"<ul>"
							            +"  <li><img style='width:160px;height:120px;' name='"+obj.YWC[i].fileName+"' src='"+obj.YWC[i].zxdThumbnailImageUrl+"' alt=''></li>"
							            +"  <li><img style='width:160px;height:120px;' name='"+obj.YWC[i].xpImageUrl+"' src='"+obj.YWC[i].xpThumbnailImageUrl+"' alt=''></li>"
							            +"</ul>"
							            +"</div>"
							            +"<div class='yiwancheng_button'>"
							            +"<ul>"
							            +"  <li>申请:"+obj.YWC[i].createDate+"</li>"
							            +"  <li>完成:"+obj.YWC[i].wcDate+"</li>"
							            +"</ul>"
							            +"</div>"
							            +"<div class='yiwancheng_line'></div>"
							            +"</li>";
								}
								 
						    	$(html).appendTo(self.$el.find("#ywcUl")); 
							}
						},
						error:function(){
							self.hideLoading();
						},
					});
			    	 
			    }
			});
		 
        },
        onHide:function(){
        	$(window).unbind("scroll");
        	 
        	
        },
        onShow:function(){
        	var self=this;
        	if(!UC.isLogin()){
        		UC.go('login');
        		
        	}
         	 
	    	umodel.fetch({
				url:UC.actionUrl+"appAppPrerecordInfo/queryPrerecordCount",
				params:{
					accountName:localStorage.getItem("username")
				},
				success:function(obj){ 
					
					 
					if(obj.attributes){
						self.prerecordCount= obj.attributes.prerecordCount;
					}else{
						self.prerecordCount= obj.prerecordCount;
					}
				 
					self.$el.find("#prerecordCount").text(self.prerecordCount);
				},
				error:function(){
					self.showToast("请求错误.....");
				}
			});
        	
			 
        }
	});
	return yuluView;
	
});