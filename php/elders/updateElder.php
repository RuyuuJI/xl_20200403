<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
header("Content-Type: text/json;charset=utf-8");   //返回json数据
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

//要求信息 ID，name,address

$id =$_POST["id"]; //
if($id!=null){
    updateElder($id);
}
$res = array(
    'state'=> 0,
    'msg'=>''
);
echo 1;
function updateElder(){
      include("../connect.php"); //数据库连接文件
      $id = $_POST["id"];
      $name = $_POST["name"];
      $age = $_POST["age"];
      $sex = $_POST["sex"];
      $communityID = $_POST["communityID"];
      $communityName = $_POST["communityName"];
      $tel = $_POST["tel"];

      $address = $_POST["address"];
      //更新社区信息
      $newsql =" UPDATE user
      SET name='$name', age='$age', sex='$sex', communityID='$communityID', communityName='$communityName', 
      tel='$tel',
      address='$address' 
      WHERE id=$id" ;
      if ($conn->query($newsql) === TRUE) {
        $res["state"] = 1;
        $res["msg"] = "success :update a  user";
  
    } else {
        $res["state"] = 2;
        $res["msg"] = "error:failed to update". $sql . "<br>" . $conn->error;
  
    }
    echo json_encode($res);
    $conn->close();
    }

    
?>