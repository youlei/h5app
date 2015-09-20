define(['jquery','underscore','backbone','text!TemplateBottomNav','text!TemplateValidateContainerCode','basePageView','userModel'],function(jquery,_,Backbone,TemplateBottomNav,TemplateValidateContainerCode,basePageView,userModel){
	
	
	//去除字符串的空格
	function gf_trim(as_string)
	{
	   while(as_string.length > 0 && as_string.indexOf(" ")==0) as_string = as_string.substr(1);
	   while(as_string.length > 0 && as_string.lastIndexOf(" ")==(as_string.length-1)) as_string = as_string.substr(0,as_string.length-1);
	   return as_string;
	}
	//集装箱箱号验证
	//功能：验证集装箱箱号：
	//参数：
	//   as_cntrno 是否符合国际标准，
	//返回值：True 符合国际标准或强行通过(特殊箱号)
	//举例：gf_chkcntrno( 'TEXU2982987', 0 )     
	function chkcntrno(as_cntrno,ai_choice)
	{
	 var fi_ki;
	 var fi_numsum;
	 var fi_nummod;
	 var fai_num = new Array(11);
	 var fb_errcntrno=false;

	 if (as_cntrno==null) return true; //null不进行验证
	 if (gf_trim(as_cntrno)=="") return true; //空不进行验证
	 as_cntrno = gf_trim(as_cntrno);
	 
	 if (as_cntrno.length == 11)   //国际标准为11位，最后一位是校验位，若不是11位肯定不是标准箱
	 { for(fi_ki=1;fi_ki<=11;fi_ki++)
	   fai_num[fi_ki] = 0;
	  for(fi_ki=1;fi_ki<=4;fi_ki++)     //根据国际标准验证法则处理箱号前面的4个英文字母
	  {
	   fch_char=as_cntrno.charAt(fi_ki-1).toUpperCase();
	   switch(true)
	   { case (fch_char=="A"):{fai_num[fi_ki] = 10;break;}
	    case (fch_char>="V" && fch_char<="Z"):{fai_num[fi_ki] = fch_char.charCodeAt() - 52;break;}
	    case (fch_char>="L" && fch_char<="U"):{fai_num[fi_ki] = fch_char.charCodeAt() - 53;break;}
	    default:{fai_num[fi_ki] = fch_char.charCodeAt() - 54;break;}
	   }
	  }
	  for(fi_ki=5;fi_ki<=11;fi_ki++)
	  {  fch_char=as_cntrno.charAt(fi_ki-1);
	   fai_num[fi_ki] = parseInt(fch_char); //ctype((mid(as_cntrno, fi_ki, 1)), integer)
	      }
	  fi_numsum = 0
	  
	  for(fi_ki=1;fi_ki<=10;fi_ki++)
	  { 
	   fi_sqr = 1;
	   for(i=1;i<fi_ki;i++){fi_sqr *=2;}
	   fi_numsum += fai_num[fi_ki] * fi_sqr;
	  }

	  if (as_cntrno.substr(0,4) == "HLCU") fi_numsum = fi_numsum - 2; //hapaq lloyd的柜号与国际标准相差2
	  fi_nummod = fi_numsum % 11;
	  if (fi_nummod == 10) fi_nummod = 0;
	  if (fi_nummod == fai_num[11]) fb_errcntrno = true;
	  return fb_errcntrno;
	 }else{
	    return fb_errcntrno;
	 }  
	} 

	function docheck(){
		text = document.getElementById("txt").value;
		text =  text.split("\n").join(","); //alert(text);
		text =  text.split(","); //alert(text);
		for (i in text) { 
			str = text[i];
			str = str.replace(/[ ]/g,"");
			str = str.replace(/[\r\n]/g,"");
					 if (chkcntrno(str ,0)){				
					    document.getElementById("tc").value = document.getElementById("tc").value + "\r" + str;					
					 }else{					
					 	document.getElementById("tf").value = document.getElementById("tf").value + "\r" + str;
					 }	
		}			 
	}


	var myView=basePageView.extend({
		events:{
			 
			 'click #doCheck':'containerCodeCheck'
		},
		
		containerCodeCheck:function(){
			 docheck();
		},
		initTemplate: function (template) {
            return _.template(template);
        },
        render: function (data) {
            var tplYulu = this.initTemplate(TemplateValidateContainerCode), 
           		self=this;  
       		self.$el.html(tplYulu());  
       	 
        },
        onCreate:function(){
        
       	   this.render();
	       	this.header.set({
	   			title:'TemplateValidateContainerCode',
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