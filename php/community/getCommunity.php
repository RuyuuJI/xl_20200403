<?php
header('Access-Control-Allow-Origin:*');//允許跨域
header('Access-Control-Allow-Methods:POST,GET');
// header("Content-Type: text/json;charset=utf-8");   //返回json数据
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Headers:x-requested-with,Content-Type,X-CSRF-Token');

    if($_GET['ID']){
      getCommunity($_GET['ID']);
    }else{
      getCommunities();
    }

    $res = array(
      'state'=> 0,
      'data' => [],
      'msg'=>''
  );

    //-----------------------------------------------
    function getCommunity($id){
      include("../connect.php"); //数据库连接文件
  
      $sql ="SELECT* FROM community where ID=$id";
  
  
      $result = $conn->query($sql);//查询社区
    
   if ($result->num_rows > 0) {
      // 输出数据
      $res["data"] =array();
      while($row =  $result ->fetch_assoc()){//验证正确返回查询列表
        array_push( $res["data"],array(
         "id"=> $row["ID"] ,
         "name"=> $row["name"] ,
         "createTime"=> $row["createTime"] ,
  
         "address"=>  ''.$row["address"]
        ));
      }
      $res['state'] =1;
      $res['msg'] ="成功获取指定社区信息";
      
    }else{
        $res['state'] =2;
        $res['msg'] ='哪里出了问题';
      }
      
      echo json_encode($res);
      $conn->close();
    
    }
  
    function getCommunities(){
    include("../connect.php"); //数据库连接文件

    $sql ="SELECT* FROM community ";


    $result = $conn->query($sql);//查询社区
  
 if ($result->num_rows > 0) {
    // 输出数据
    $res["data"] =array();
    while($row =  $result ->fetch_assoc()){//验证正确返回查询列表
      array_push( $res["data"],array(
       "id"=> $row["ID"] ,
       "name"=> $row["name"] ,
       "createTime"=> $row["createTime"] ,

       "address"=>  ''.$row["address"]
      ));
    }
    $res['state'] =1;
    $res['msg'] ="成功获取全部社区信息";
    
  }else{
      $res['state'] =2;
      $res['msg'] ='哪里出了问题';
    }
    
    echo json_encode($res);
    $conn->close();
  
  }


?>