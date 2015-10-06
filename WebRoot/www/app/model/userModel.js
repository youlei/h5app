define(['jquery','underscore','backbone','lib'],function($,_,Backbone){
	var userModel=Backbone.Model.extend({
		defaults:{
			
			
		}, 
		sync:function(method,model,options){
			var url=options.url;
			url+="?";
			for(var i in options.params){
				
				url+=i;
				url+="=";
				url+=options.params[i];
				url+="&"
			}
			options.url=url;
			var params=_.extend({
  				type:"get",
  				dataType:'jsonp',
  				  
  				processData:false
  			},options);
  			return $.ajax(params);
		}
		
	});
	return userModel;
});