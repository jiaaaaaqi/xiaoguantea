 //获取元素
 function $(str){//#box .cls  p
    if(str.charAt(0)=="#"){
        return document.getElementById(str.substring(1));
    }else if(str.charAt(0)=="."){
        return document.getElementsByClassName(str.substring(1));
    }else{
        return document.getElementsByTagName(str);
    }
}

//去除字符串右空格
function rtrim(s) {
    return s.replace(/(\s*$)/, "");
}
// 获得字符串实际长度
var jmz = {};
jmz.GetLength = function(str) {
	var realLength = 0, len = str.length, charCode = -1;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
};
//验证是否为手机号
function checkPhone(phone){
	var dl = /(^[1][0-9]\d{9}$)/;
	var strPhone = phone;
	var length = strPhone.length
	//大陆手机号码
	if(length == 11){
		if(!dl.exec(strPhone)){
			return false;
		}
	}else{
		return false;
	}
	return true;
}

function checkuser(name){
	let xhr = new XMLHttpRequest();		
	//2、设置请求参数
	xhr.open('get','php/checkUser.php?username='+name,true);
	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			
			console.log(xhr.resopnseText);
				if(xhr.responseText=='1'){
					$("#userspan").html("<font style='color:#A5C11B'>恭喜你，可以使用该用户名！</font>");
				}else{
					$("#userspan").html("<font style='color:#F63B21'>用户名已存在,请更换用户名!</font>");
				}
			}
		}
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	//4、发送
	xhr.send();
}