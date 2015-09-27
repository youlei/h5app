define(['jquery','underscore','backbone','basePageView'],function(jquery,_,Backbone,basePageView){
	
	var Alert=function(){
		 
		this.$alert;
		this.$confirm;
		this.$toast;
		this.$loading;
		
		/**
		 * param.title
		 * param.content
		 * */
		Alert.prototype.alert=function(param){
			var self=this;
			self.maskHTML="<div class='error'><div class='error_text'>"+param+"</div><div class='error_button'></div></div>";
		 
			self.$alert=$(this.maskHTML).appendTo($("body"));
			Alert.prototype.adjust($(self.$alert[1]));
			self.$alert.click(function(){
				self.$alert.remove();
			});
			$(window).on('resize',function(){
				self.adjust($(self.$alert[1]));
			});
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
		 * */
		Alert.prototype.confirm=function(param){
			var self=this;
			self.maskHTML="<div class='cui-view cui-mask cui-opacitymask' style='position: absolute; left: 0px; top: 0px; width: 100%; height: "+$(document).height()+"px;  display: block;'><div></div></div>";
			self.confirmHTML="<div class='cui-view cui-layer cui-alert'   style='visibility: visible; '><div class='cui-pop-box'><div class='cui-bd'><div class='cui-error-tips'>"+param.title+"</div><div class='cui-roller-btns'><div class='cui-flexbd cui-btns-cancel' name='cancel'>确定</div><div class='cui-flexbd cui-btns-sure' name='sure'>取消</div></div></div></div></div>";
		 
			self.$confirm=$(this.maskHTML+this.confirmHTML).appendTo($("body"));
			Alert.prototype.adjust($(self.$confirm[1]));
			$(window).on('resize',function(){
				self.adjust($(self.$confirm[1]));
			});
			self.$confirm.find("[name='sure']").click(function(){
				self.$confirm.remove();
				if(param.sureCallback){
					param.sureCallback();
				}
				
			});
			self.$confirm.find("[name='cancel']").click(function(){
				self.$confirm.remove();
			});
		}
		/**
		 * param.content
		 * param.duration
		 * param.callback
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
			 
			setInterval(function(){
				self.$toast.remove();
			},param.duration||4000);
			 
		}
		/**
		 * param.duration
		 * */
		Alert.prototype.loading=function(param){
			var self=this;
			self.maskHTML="<div class='loading'> <div class='loading_icon'><img src='res/images/loading.gif'></div><div class='loading_text'>"+param+"</div> </div>";
			
			self.$loading=$(this.maskHTML).appendTo($("body"));
			self.$loading.addClass("animated").addClass("bounceIn");
			Alert.prototype.adjust($(self.$loading[1]));
			$(window).on('resize',function(){
				self.adjust($(self.$loading[1]));
			});
			self.$loading.on("click",function(){
				self.$loading.addClass("animated").addClass("bounceOut");
				self.$loading.remove();
			});
			 
			 
			
		}
		Alert.prototype.hideLoading=function(param){
			var self=this;
			self.$loading.addClass("animated").addClass("bounceOut");
			self.$loading.remove();
		}
	}
	return Alert;
});