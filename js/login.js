$(function(){		
	$("#login").click(function(){
		//1、
		$.post(
			"php/logincheck.php",
			{
				"username":$("#username").val(),
				"password":$("#password").val()
			},
			function(data){	
				console.log(data);				
				if(data=="1"){//登录成功！
					//记录cookie
					saveCookie("username",$("#username").val(),7);
					location.href="index.html";
				}else{
					alert("登录失败，用户名或者密码不对！");
				}
			}
		);
	});
});