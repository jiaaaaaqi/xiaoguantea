<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$username   = $_POST['username'];
	$goodsId   = $_POST['goodsId'];
	$goodsCount = $_POST['goodsCount'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("tea",$conn)){
		die("数据库选择失败".mysql_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "select * from shoppingcart where username = '".$username."' and goodsId='".$goodsId."'";
	$sqlstr2 = "INSERT INTO shoppingcart VALUES('$username',$goodsId,$goodsCount)";
	$sqlstr1 = "UPDATE shoppingCart set goodsCount='.$goodsCount.' where username='".$username."' and goodsId='.$goodsId.'";
	//echo($sqlstr);
	mysql_query($sqlstr,$conn);
	if(mysql_query($sqlstr,$conn)== null){
		mysql_query($sqlstr2,$conn);
		echo 1;
	}else{
		if(!mysql_query($sqlstr1,$conn)){
			die("执行更新SQL语句失败".mysql_error());
			echo 0;
		}else{
			mysql_query($sqlstr2,$conn);
			echo 1;
		}
	}
	
	
	//4）、关闭连接（拆桥）
	mysql_close($conn);
	
	//3、给客户端返回（响应）一个注册成功！
	//echo 1; //1：表示修改成功,0：表示修改失败
?>