<?php
	header("content-type","text/html;charset=utf-8");
	
	//1接收数据
	$goodsId = $_GET["goodsId"];
	//2、在数据库中查询
	   //1)、建立连接，并选择数据库
	   $con = mysql_connect("localhost","root","root");
	   mysql_select_db("tea",$con);
	   //2)、执行SQL语句（查询）
	   $sqlStr="select * from goodsInfo where goodsId='".$goodsId."'";
	   
	   $result=mysql_query($sqlStr,$con);
	   
	   //3)、关闭连接
	   mysql_close($con);
	//3、响应结果
	//获得$result的行数
	$rows = mysql_num_rows($result);		
	if($rows>0){//如果goodsId存在，返回0；
		echo "0";	
	}else {//如果goodsId不存在，返回1.
		echo "1";
	}	
?>