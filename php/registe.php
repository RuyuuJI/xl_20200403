<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
header("Content-Type: text/json;charset=utf-8");   //返回json数据
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

//要求信息 userno，name，password

$userno =$_POST["userno"]; //判斷是注冊還是登錄
if($userno!=null){
    registe();
}
$res = array(
    'state'=> 0,
    'userName'=> '',
    'userNo'=>'',
    'msg'=>''
);
function registe(){
      include("connect.php"); //数据库连接文件
      $password= $_POST["password"];
      $docname = $_POST["name"];
    $UserNo =$_POST["userno"];
    $sql = "select * from user where userNo = '".$UserNo."'"; //是否存在用戶
    $result = $conn->query($sql);
    if($result->num_rows >0){//用戶名已注冊
      $res["state"]=2;
      $res["msg"] ="用戶賬號已存在";
    }else{
      $newsql = "insert into user (userNo,userName,	userPassword) 
      values ('".$UserNo ."','".$docname."','".$password."')";//新建用戶
      $conn->query($newsql);
      $res["state"] = 1;
      $res["msg"] = $docname."  welcome to your station";
    }

    echo json_encode($res);
    $conn->close();
    }

    
?>