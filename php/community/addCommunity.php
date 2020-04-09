<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
header("Content-Type: text/json;charset=utf-8");   //返回json数据
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

//要求信息 userno，name，password

$ID =$_POST["ID"]; //判斷是注冊還是登錄
if($ID!=null){
    addCommunity();
}
$res = array(
    'state'=> 0,
    
    'msg'=>''
);
function addCommunity(){
      include("../connect.php"); //数据库连接文件
      $ID= $_POST["ID"];
      $name = $_POST["name"];
      $address = $_POST["address"];
      $newsql = "insert into community (ID,name,	address) 
      values ('".$ID ."','".$name."','".$address."')";//新建用戶
      if ($conn->query($newsql) === TRUE) {
        $res["state"] = 1;
        $res["msg"] = "success :add a new community";
  
    } else {
        $res["state"] = 2;
        $res["msg"] = "error:failed to add". $sql . "<br>" . $conn->error;
  
    }
    echo json_encode($res);
    $conn->close();
    }

    
?>