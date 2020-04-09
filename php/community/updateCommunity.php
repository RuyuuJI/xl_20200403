<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
header("Content-Type: text/json;charset=utf-8");   //返回json数据
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

//要求信息 ID，name,address

$ID =$_POST["ID"]; //
if($ID!=null){
    updateCommunity($ID);
}
$res = array(
    'state'=> 0,
    
    'msg'=>''
);
function updateCommunity(){
      include("../connect.php"); //数据库连接文件
      $ID = $_POST["ID"];
      $name = $_POST["name"];
      $address = $_POST["address"];
      //更新社区信息
      $newsql =" UPDATE community
      SET name='$name', 
      address='$address' 
      WHERE ID=$ID" ;
      if ($conn->query($newsql) === TRUE) {
        $res["state"] = 1;
        $res["msg"] = "success :update a new community";
  
    } else {
        $res["state"] = 2;
        $res["msg"] = "error:failed to update". $sql . "<br>" . $conn->error;
  
    }
    echo json_encode($res);
    $conn->close();
    }

    
?>