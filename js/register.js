//用户名验证
$(document).ready(function(){
	let phone = $("#phone").val();
$("#phone").onblur=function(){
	//验证是否为手机号
	function checeekPhone(phone){
		var dl = /(^[1][0-9]\d{9}$)/;
		var len = phone.length;
		console.log(phone);

		//大陆手机号码
		if(len == 11){
			if(!dl.exec(phone)){
				console.log(phone);
				$("#phoneTit").html("请输入正确的手机号");		
				$("#phone").focus();
	
			}else{
				checkUser($(phone));
			}
		}else{
			$("#phone").focus();
			$("#phoneTit").html("请输入11位手机号");
		}
	}
	function checkUser(phone) { 
		console.log(phone);
		$.get("../php/checkUser.php", phone,
			function (data) {
				data == "0"?$("#phoneTit").html("用户名已存在，请更换用户名"):$("#phoneTit").html("<font style='color:#A5C11B'>恭喜你，可以使用该用户名！</font>");
			}
		);
	 }
};
})
//验证密码
function ckPwd1(obj) { 
	var userpwd = obj.value;
	var len = jmz.GetLength(rtrim(userpwd));
    if(len<6 || len>16) {  
    	$("#pswTit").html("<font style='color:#F63B21'>密码长度为6-16个字符，区分大小写</font>");  
        return false;  
    }else{  
    	$("#pswTit").html("<font style='color:#A5C11B'>密码可用</font>");  
        return true;  
    }  
}
//验证确认密码
function ckPwd2(obj) {
	var userpwd = $('#password').val();
	var userrpwd = $('#repassword').val();
	var len = jmz.GetLength(rtrim(userrpwd));
    if(len<6 || len>16) {  
    	$("#rePswTit").html("<font style='color:#F63B21'>密码长度为6-16个字符，区分大小写</font>");   
        return false;  
    }else if(userpwd != userrpwd) {  
    	$("#rePswTit").html("<font style='color:#F63B21' >密码不一致，请重新输入</font>");  
        return false;  
    }else{  
    	$("#rePswTit").html("<font style='color:#A5C11B'>密码一致，请继续</font>");  
        return true;  
    }  
} 



function zhuche() {
    var str_phone = document.getElementById("phone").value;
    var str_pass = document.getElementById("password").value;
    var str_pass1 = document.getElementById("repassword").value;

    if (rtrim(str_phone) == "") {
        alert("请输入您的手机号!");
        $("#phone").focus();
        return false;
    }
    if (!checkPhone(str_phone)) {
        alert("请填写正确的手机号!");
        $("#phone").focus();
        return false;
    }

    if (rtrim(str_pass) == "") {
        alert("请输入您的密码!");
        $("#password").focus();
        return false;
    }

    if (str_pass.length < 6 || str_pass.length > 16) {
        alert("密码长度为6-16个字符，区分大小写!");
        $("#password").focus();
        return false;
    }

    if (rtrim(str_pass1) == "") {
        alert("请输入您的确认密码!");
        $("#repassword").focus();
        return false;
    }
    if (str_pass1 != str_pass) {
        alert("两次输入的密码不一致!");
        $("#repassword").focus();
        return false;
    }
    return true;
}

