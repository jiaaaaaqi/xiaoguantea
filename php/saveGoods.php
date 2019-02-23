<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$goodsId   = $_REQUEST['goodsId'];
	$goodsName = $_REQUEST['goodsName'];
	$goodsType = $_REQUEST['goodsType'];
	$goodsPrice = $_REQUEST['goodsPrice'];
	$goodsCount = $_REQUEST['goodsCount'];
	$goodsSlogan = $_REQUEST['goodsSlogan'];
	$goodsImg  = $_REQUEST['goodsImg'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	if(!$conn){
		die("数据库连接失败：".mysql_error());
	}
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("tea",$conn)){
		die("数据库选择失败".mysql_error());
	};
	
	//d
	$sqlstr = "insert into goodsInfo values('".$goodsId."','".$goodsName."','".$goodsType."'
	,'".$goodsPrice."','".$goodsCount."','".$goodsSlogan."','".$goodsImg."')";
	
	$count = mysql_query($sqlstr,$conn);
	if(!$count){
		die('插入失败！'.mysql_error());
	}
	//4）、关闭连接（拆桥）
	mysql_close($conn);
	
	//3、给客户端返回（响应）一个注册成功！
	if($count>0){
	    echo "保存成功";
	}
	
?>