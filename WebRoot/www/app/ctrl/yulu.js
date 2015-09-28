define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateYulu','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateYulu,basePageView,userModel){
	
	var yuluView=basePageView.extend({
		events:{
		 
			'click #selectYuluByCamear':'getImageFormCamera',
			'click #selectYuluByAlbum':'getImageFormAlbum',
			'click #h5Album':'h5Album',
			'change #h5file':'',
			'click #subYulu':'submitYulu',
			"click [name='tab']":"switchTab",
			"click #photograph":"photograph"
			
			
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
		      var dataURL = canvas.toDataURL("image/png");
		      return dataURL;

		      // return dataURL.replace("data:image/png;base64,", "");
		},
		submitYulu:function(){
			//var image=$("#previewImg");
			var img = document.createElement('img');
				img.id="ats"; 
				img.src=$("#photograph").date(url);
			self.$tmpview= $(img).appendTo(this.$el); 
			var base64Img= this.getBase64Image(img).substr(22);
			self.$tmpview.hide();
			self.$canvas.hide();
			$.ajax({
				type:'POST',
				url:'../UCService',
				data:{
					base64Image:base64Img,
					username:'youlei'
				},
				success:function(){
					
				}
				
			});
			//console.log(base64Img);
			
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
		
		gotoImageView:function(url){
			
			
		},
		
		getImageFormCamera:function(){ 
			 
			window.Native.getImageFromCamera();
		},
		getImageFormAlbum:function(){
			 
			window.Native.getImageFromAlbum();
			
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
       		//$(tplBottomNav()).appendTo(self.$el);
       		 
       		
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