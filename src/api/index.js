
/*
接口请求函数
*/
import ajax from './ajax'

const baseUrl ="http://localhost:3000"

export const reqLogin =(userno,password)=>(
    //请求登录
   ajax({
        method:'post',
        url: baseUrl+'/xl/php/login.php',
        // data:qs.stringify({userno,password})  //拦截器当中已经处理
        data:{//默认json格式
            "userno":userno,
            "password":password
        }
    })
   //或者 ajax.post(baseUrl+'/xl/php/login.php',{userno.password})
)
