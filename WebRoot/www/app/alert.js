define(['jquery','underscore','backbone','basePageView'],function(jquery,_,Backbone,basePageView){
	
	var Alert=function(){
		 
		this.$alert;
		this.$confirm;
		this.$toast;
		this.$loading;
		
		/**
		 * param.title
		 * param.content
		 * param.autoHide
		 * */
		Alert.prototype.alert=function(param){
			var self=this;
			self.maskHTML="<div class='error'><div class='error_text'>"+param+"</div><div class='error_button'></div></div>";
			if(self.$confirm){
				return;
			}
			self.$alert=$(this.maskHTML).appendTo($("body"));
			Alert.prototype.adjust($(self.$alert[1]));
			self.$alert.click(function(){
				self.$alert.remove();
				self.$alert=null;
			});
			setTimeout(function(){},5000);
		};
		
		
		Alert.prototype.adjust=function($el){
			var screenWidth=$(document).width(),
				screenHeight=$(document).height(),
				elWidth=$el.width(),
				elHeight=$el.height();
			//console.log(screenWidth,elWidth);
			 $el.css({
				 left:(screenWidth-elWidth)/2
			 });
		};
		/**
		 * param.title
		 * param.cancel
		 * param.sure 
		 * param.sureCallback
		 * param.cancelCallback
		 * param.autoHide
		 * */
		Alert.prototype.confirm=function(param){
			var self=this;
			self.maskHTML="<div class='error'>" 
					     +"  <div class='error_text'>"+param.title+"</div>"
					     +"<div class='confirm_button'>"
					     +"<div class='confirm_button2' name='cancel'>"+param.cancel+"</div>"
					     +"<div class='confirm_button1' name='sure'>"+param.sure+"</div>"
					     +"</div>"
					     +"</div>";
			
			if(self.$confirm){
				return;
			}
			self.$confirm=$(this.maskHTML).appendTo($("body"));
			self.$confirm.addClass("animated").addClass("bounceIn");
			
			self.$confirm.find("[name='sure']").click(function(){
				self.$confirm.one('webkitAnimationEnd',function(){
					self.$confirm.remove();
				});
				self.$confirm.addClass("bounceOut"); 
				if(param.sureCallback){
					param.sureCallback();
				}
				
			});
			self.$confirm.find("[name='cancel']").click(function(){
				self.$confirm.one('webkitAnimationEnd',function(){
					self.$confirm.remove();
					self.$confirm=null;
				});
				self.$confirm.addClass("bounceOut");
				if(param.sureCallback){
					param.cancelCallback();
				}
			 
			});
			self.$confirm.on("click",function(){
				self.$confirm.one('webkitAnimationEnd',function(){
					self.$confirm.remove();
					self.$confirm=null;
				});
				self.$confirm.addClass("bounceOut");
				
			});
			setTimeout(function(){},5000);
		}
		/**
		 * param.content
		 * param.duration
		 * param.callback
		 * param.autoHide
		 * */
		Alert.prototype.toast=function(param){
			var self=this;
			self.maskHTML="<div class='cui-view cui-mask cui-opacitymask' style='position: absolute; left: 0px; top: 0px; width: 100%; height: "+$(document).height()+"px;  display: block;'><div></div></div>";
			self.toastHTML="<div class='cui-view cui-layer cui-toast' style='visibility: visible;  top: 50%; position: fixed;'><div class='cui-layer-padding'><div class='cui-layer-content'>"+param.content+"</div></div></div>";
			
			
			self.$toast=$(this.maskHTML+this.toastHTML).appendTo($("body"));
			Alert.prototype.adjust($(self.$toast[1]));
			$(window).on('resize',function(){
				self.adjust($(self.$toast[1]));
			});
			self.$toast.on("click",function(){
				self.$toast.remove();
			});
			 
			setTimeout(function(){},5000);
			 
		}
		/**
		 * param.duration
		 * param.autoHide
		 * */
		Alert.prototype.loading=function(param){
			var self=this;
			self.maskHTML="<div class='loading'> <div class='loading_icon'><img src='res/images/loading.gif'></div><div class='loading_text'>"+param+"</div> </div>";
			 
			self.$loading=$(this.maskHTML).appendTo($("body"));
			
			//self.$loading.addClass("animated").addClass("bounceIn");
			/**
			Alert.prototype.adjust($(self.$loading[1]));
			$(window).on('resize',function(){
				self.adjust($(self.$loading[1]));
			});
			
			*/
			self.$loading.on("click",function(){
				//self.$loading.addClass("animated").addClass("bounceOut");
				self.$loading.remove();
			});
			//setTimeout(function(){},5000);
			 
			
		}
		Alert.prototype.hideLoading=function(param){
			var self=this;
			self.$loading.addClass("animated").addClass("bounceOut");
			self.$loading.remove();
		}
	}
	return Alert;
});