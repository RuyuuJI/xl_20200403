<?php
// $link=new PDO("mysql:host=dna;port=8055;dbname=dna","dna","123412");
// $link->query("set names utf8");
header("content-type:text/html;charset=utf8");
$servername = "47.97.192.136";//服务器地址
$db_username ="root";//服务器同户名
$db_password ="root";//服务器密码
$db_name = "xlweb"; //数据库名称
$conn = new mysqli($servername,$db_username,$db_password,$db_name,3306);
$state = "正在连接数据库";
if($conn->connect_error){ //连接失败
    die("连接失败:".$conn->connect_errno);
}
//设置字符编码
$conn->query("set names utf8");
$state = $state."连接成功";


?>
