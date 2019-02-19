//验证是否为手机号
function checkPhone(phone){
	var dl = /(^[1][0-9]\d{9}$)/;
	var len = phone.length;
	//大陆手机号码
	if(len == 11){
		if(!dl.exec(phone)){
			console.log(this.value);
			$("#phoneTit").innerHTML="请输入正确的手机号";
			$("#phoneTit").style.display = "block";
			$("#phone").focus();

		}else{
			$("#phoneTit").style.display="hidden";
			checkuser(this.value);
		}
	}else{
        $("#phone").focus();
		$("#phoneTit").innerHTML="请输入11位手机号";
		$("#phoneTit").style.display = "block";
	}
}

//验证用户名是否存在
function checkuser(name){
	let xhr = new XMLHttpRequest();		
	//2、设置请求参数
	xhr.open('get','php/checkUser.php?username='+name,true);
	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){		
				if(xhr.responseText=='1'){
					$("#phoneTit").style.display = "block";
					$("#phoneTit").innerHTML="<font style='color:#A5C11B'>恭喜你，可以使用该手机号！</font>";
				}else{
					$("#phoneTit").style.display = "block";
					$("#phoneTit").innerHTML="<font style='color:#F63B21'>手机号已存在,请更换手机号!</font>";
				}
			}
		}
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	//4、发送
	xhr.send();
}

//验证确认密码
(function ckPwd(obj) {	
	$("#password").onblur = function () {
	var userpwd = $('#password').value;
	var len = jmz.GetLength(rtrim(userpwd));
		if(len<6 || len>16) {  
			$("#pswTit").innerHTML="<font style='color:#F63B21'>密码长度为6-16个字符，区分大小写</font>";
			$("#pswTit").style.display = "block";
			return false;  
		}else{
			$("#pswTit").style.display = "none";
		}
	}
	$("#repassword").onblur = function (){
	var userpwd = $('#password').value;
	var userrpwd = $('#repassword').value;
		if(userpwd != userrpwd) {  
			$("#rePswTit").innerHTML="<font style='color:#F63B21' >密码不一致，请重新输入</font>";
			$("#rePswTit").style.display = "block";  
			return false;  
		}else{
			$("#rePswTit").style.display = "none";

		}
	}
})();

$("#phone").onblur = function(){
	checkPhone($("#phone").value);
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

