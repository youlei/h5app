define(['jquery','underscore','backbone','text!TemplateRegister2','basePageView','userModel'],function(jquery,_,Backbone,TemplateRegister2,basePageView,userModel){
	
	var loginView=basePageView.extend({
		events:{
			"click #validate":"validate",
			
		},
		validate:function(){ 
			var self=this,
				umodel=new userModel(),
				phoneNumber="18602922416",
				code=self.$el.find("#code").val();
				umodel.fetch({
					url:UC.actionUrl+"appRegister/validateCode",
					params:{
						validateCode:code,
						phoneNumber:phoneNumber
					},
					success:function(data){
						//console.log(data);
						if(data.attributes.flag){
							UC.go("register3");
						}
					},
					error:function(){
						
					}
				});
			
		},
		initTemplate: function () {
            return _.template(TemplateRegister2);
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
    					UC.go('register1');
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