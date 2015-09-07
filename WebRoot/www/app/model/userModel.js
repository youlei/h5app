define(['jquery','underscore','backbone',],function($,_,Backbone){
	var userModel=Backbone.Model.extend({
		defaults:{
			
			
		},
		rootUrl:'http://192.168.0.114:8090/',
		sync:function(method,model,options){
			var params=_.extend({
  				type:"get",
  				dataType:'jsonp',
  				url:this.url+"?callback=?",
  				processData:false
  			},options);
  			return $.ajax(params);
		}
		
	});
	return userModel;
});