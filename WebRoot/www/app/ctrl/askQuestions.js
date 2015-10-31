define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateAskQuestions','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateAskQuestions,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 
			 'click #submitQuestion':'submitQuestion'
		},
		
		submitQuestion:function(){
			var self=this,
				umodel=new userModel();
			if($.trim(self.$el.find("#questionContent").val())==""){
				 self.showAlert("请输入内容");
				return;
			}
			umodel.fetch({
				url:UC.actionUrl+"appCommonProblem/save",
				params:{
					accountName:localStorage.getItem('username'),
					title:encodeURI(encodeURI(self.$el.find("#questionContent").val()))
				},
				success:function(data){
					if(data.attributes){
						if(data.attributes.flag){
							   self.showAlert("保存成功");
							   //UC.go("find");
							}else{
								//alert(data.attributes.errorMessage);
								self.showAlert("保持失败！！");
							}
					}else{
						
						if(data.flag){
							self.showAlert("保存成功");
							   //UC.go("find");
						}else{
							//alert(data.attributes.errorMessage);
							self.showAlert("保持失败！！");
						}
					}
					
					 
				},
				error:function(){
					
				}
			});
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateAskQuestions), 
           		self=this;  
       		self.$el.html(tplYulu());  
       	 
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'问题反馈',
	   			view:true,
	   			back:true,
	   			home:true,
	   			
	   			events:{
	   				returnHandler:function(){
	   					UC.go('find',{
	   						
	   					});
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