define(['jquery','underscore','backbone','lib'],function($,_,Backbone){
	var appAriticleModel=Backbone.Model.extend({
		defaults:{
			
			
		},
		rootUrl:'appariticle/getPhoneCategory',
		sync:function(method,model,options){
			 
			var params=_.extend({
  				type:"get",
  				dataType:'jsonp',
  				//url:this.url+"?callback=?",
  				url:UC.actionUrl+this.url,
  				processData:false
  			},options);
  			return $.ajax(params);
		},
		parse:function(data){
			console.log(data);
		}
		
	});
	return appAriticleModel;
});