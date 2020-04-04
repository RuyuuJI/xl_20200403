
/*
接口请求函数
*/
import ajax from './ajax'


const baseUrl ="http://localhost:3000"

export function reqLogin(username,password){
    //请求登录
    ajax({
        method:'post',
        url: baseUrl+'/xl/php/login.php',
        data:{
            username,
            password
        }
    })
}

reqLogin(1,2)