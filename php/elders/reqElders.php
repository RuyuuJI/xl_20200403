<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
// header("Content-Type: text/json;charset=utf-8");   //返回json数据
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

    if($_GET['id']){
      getElder($_GET['id']);
    }else{
      reqElders();
    }

    $res = array(
      'state'=> 0,
      'data' => [],
      'msg'=>''
  );

    //-----------------------------------------------
    function getElder($id){
      include("../connect.php"); //数据库连接文件
  
      $sql ="SELECT* FROM user where ID=$id";
  
  
      $result = $conn->query($sql);//查询社区
    
   if ($result->num_rows > 0) {
      // 输出数据
      $res["data"] =array();
      while($row =  $result ->fetch_assoc()){//验证正确返回查询列表
        array_push( $res["data"],array(
          "id"=> $row["id"] ,
          "name"=> $row["name"] ,
          "communityName"=> $row["communityName"] ,
          "age"=> $row["age"] ,
          "birth"=> $row["birth"] ,
          "tel"=> $row["tel"] ,
          "address"=>  ''.$row["address"]
        ));
      }
      $res['state'] =1;
      $res['msg'] ="成功获取指定用户信息";
      
    }else{
        $res['state'] =2;
        $res['msg'] ='哪里出了问题';
      }
      
      echo json_encode($res);
      $conn->close();
    
    }
  
    function reqElders(){
    include("../connect.php"); //数据库连接文件

    $sql ="SELECT* FROM user ";


    $result = $conn->query($sql);//查询
  
 if ($result->num_rows > 0) {
    // 输出数据
    $res["data"] =array();
    while($row =  $result ->fetch_assoc()){//验证正确返回查询列表
      array_push( $res["data"],array(
       "id"=> $row["id"] ,
       "name"=> $row["name"] ,
       "communityName"=> $row["communityName"] ,
       "age"=> $row["age"] ,
       "birth"=> $row["birth"] ,
       "tel"=> $row["tel"] ,
       "address"=>  ''.$row["address"]
      ));
    }
    $res['state'] =1;
    $res['msg'] ="成功获取全部用户信息";
    
  }else{
      $res['state'] =2;
      $res['msg'] ='哪里出了问题';
    }
    
    echo json_encode($res);
    $conn->close();
  
  }


?>