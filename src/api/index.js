
/*
接口请求函数
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'
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

export const reqWeather=()=>{
    let location ="chongqing";//获取定位
    return new Promise((resolve,reject)=>{
        
        
        //执行器函数执行异步任务
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=foshan&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error && data.error==0){
                // Date.result 
               const { dayPictureUrl,weather } = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather})
            }else{
                message.error('今天的天气变幻莫测....')
            }

        })
    })
   
}