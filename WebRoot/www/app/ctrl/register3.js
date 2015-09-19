define(['jquery','underscore','backbone','text!TemplateRegister3','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister3,basePageView,userModel){
	
	var loginView=basePageView.extend({
	   events:{
		   'click #submitUser':"submitUser",
		   "click #backMain":"backMain"
		   
	   },
	   submitUser:function(){
		   var umodel=new userModel(),
		   	   data={
				   accountName:"18602922416",
				   password:this.$el.find("#password").val(),
				   email:this.$el.find("#email").val(),
				   theFleet:this.$el.find("#theFleet").val(),
				   userName:this.$el.find("#userName").val()
		   	   };
		   	
		   	  
		   umodel.fetch({
				url:UC.actionUrl+"appRegister/register",
				params:data,
				success:function(data){
					//console.log(data);
					if(data.attributes.flag){
						UC.go("index");
					}
				},
				error:function(){
					
				}
			});
	   },
	   initTemplate: function () {
            return _.template(TemplateRegister3);
       },
       render: function (data) {
           var tpl = this.initTemplate(),
           	   self=this;  
       	   self.$el.html(tpl({ "data": data })); 
       	
       },
       onCreate:function(){
        
       		this.render();
       		this.header.set({
       			title:'用户注册',
       			view:true,
       			back:true,
       			home:true,
       			events:{
       				returnHandler:function(){
       					UC.go('register2');
       				},
       				homeHandler:function(){
       					
       					
       				}
       			}
       		});
       },
       onShow:function(){
       		
       	 
       }
	});
	return loginView;
	
});