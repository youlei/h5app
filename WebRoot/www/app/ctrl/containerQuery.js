define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateContainerQuery','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateContainerQuery,basePageView,userModel){
	
	var myView=basePageView.extend({
		events:{
			 
			 'click #containerCodeQuery':'containerCodeQuery'
		},
		
		containerCodeQuery:function(){
			var self=this,
				umodel=new userModel(),
				code=self.$el.find("#containerCode").val();
			umodel.fetch({
				url:UC.actionUrl+"appElectronPackingSelect/selectZXDCX",
				params:{
					ctno:code
				},
				success:function(data){
					
					if(data.attributes.flag){
					   UC.go("containerDetail",{electronPacking:data.attributes.electronPacking});
					}else{
						//alert(data.attributes.errorMessage);
						self.showAlert(data.attributes.errorMessage);
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
            var tplYulu = this.initTemplate(TemplateContainerQuery), 
           		self=this;  
       		self.$el.html(tplYulu());  
       	 
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'箱号查询',
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