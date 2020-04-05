<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
// header("Content-Type: text/json;charset=utf-8");   //返回json数据
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

    $userno =$_POST["userno"]; //判斷是注冊還是登錄
    if($userno!=null){
        login();
    }
    $res = array(
      'state'=> 0,
      'userName'=> '',
      'userNo'=>'',
      'msg'=>''
  );

    //-------------------用戶登錄----------------------------
    function login(){
    include("connect.php"); //数据库连接文件
    $userno = intval($userno);
    $password= $_POST["password"];
    $sql ="SELECT* FROM user where userNo=$userno and 	userPassword='$password'";


    $result = $conn->query($sql);//查询用户
  
 if ($result->num_rows > 0) {
    // 输出数据
    while($row =  $result ->fetch_assoc()){//验证正确返回查询列表
      $res['userName'] =$row['userName'];
      $res['userNo'] =$row['userNo'];
      $res['state'] =1;
      $res['msg'] ='登陸成功';
     
      
    }
  }else{
      $res['state'] =2;
      $res['msg'] ='輸入用戶名/密碼錯誤';
    }
    
    echo json_encode($res);
    $conn->close();
  
  }


?>