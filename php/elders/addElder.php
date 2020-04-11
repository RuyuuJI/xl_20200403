<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
// header("Content-Type: text/json;charset=utf-8");   //返回json数据
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

//要求信息 userno，name，password

$id =$_POST["id"]; //判斷是注冊還是登錄
if($id!=null){
    addElder();
}
$res = array(
    'state'=> 0,
    'msg'=>''
);
function addElder(){
      include("../connect.php"); //数据库连接文件
      $id= $_POST["id"];
      $name = $_POST["name"];
      $age= $_POST["age"];
      $birth= $_POST["birth"];
      $sex= $_POST["sex"];
      $communityID = $_POST["communityID"];
      $communityName = $_POST["communityName"];
      $tel= $_POST["tel"];
      $address = $_POST["address"];
      //新建用戶
      $newsql ="INSERT INTO user (id,name,age,birth,sex,communityID,communityName,tel,address) 
      VALUES ('$id',
      '$name',
      '$age',
      '$birth',
      '$sex',
      '$communityID',
      '$communityName',
      '$tel','$address')" ;
      if ($conn->query($newsql) === TRUE) {
        $res["state"] = 1;
        $res["msg"] = "success :add a new user";
  
    } else {
        $res["state"] = 2;
        $res["msg"] = "error:failed to add". $sql . "<br>" . $conn->error;
  
    }
    echo json_encode($res);
    $conn->close();
    }

    
?>