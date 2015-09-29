define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateImageView','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateImageView,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 'click #allTel':'goToTelList',
			 'click #detailList':'goToViolationsSelect',
			 "click #containerQuery":"goContainerQuery",
			 'click #validateContainerCode':'goToValidateContainerCode',
		},
		 
		initTemplate: function (template) {
            return _.template(template);
        },
        getBase64Image:function(img) {
	    	  
		      var self=this, 
		      	  canvas = document.createElement("canvas");
		      canvas.width = img.width;
		      canvas.height = img.height; 
		       
		      var ctx = canvas.getContext("2d");
		      alert(1111111);
		      ctx.drawImage(img, 0, 0, img.width, img.height);  
		      self.$canvas= $(canvas).appendTo(this.$el);
		      
		      var dataURL;
		      try{
		    	 
		    	 dataURL = canvas.toDataURL("image/jpeg");
		    	 
		      }catch(e){
		    	  alert('exception111111111111...........');
		    	  
		      }
		      return dataURL;

		      // return dataURL.replace("data:image/png;base64,", "");
		},
        render: function (data) {
        	var tplYulu = this.initTemplate(TemplateImageView);
           	self=this; 
       		self.$el.html(tplYulu({data:{url:UC.goParam.url}})); 
       		self.$el.find("#preview").attr("src",UC.goParam.url);
       		UC.imgData=self.getBase64Image(self.$el.find("#preview")[0]);
       		       		
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
	   					UC.go('yulu');
	   				},
	   				homeHandler:function(){
	   					
	   					
	   				}
	   			}
	   			
	   		});
	       	 
        },
        onShow:function(){
        	
       	  
        }
	});
	return myView;
	
});