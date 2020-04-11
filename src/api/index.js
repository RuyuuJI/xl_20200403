
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
//请求天气
export const reqWeather=()=>{
    let location ='重庆';//获取定位
    return new Promise((resolve,reject)=>{
        
        //执行器函数执行异步任务
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=`+location+`&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
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
//--------------------------社区
//获取社区分类
export const reqCommunities =()=> ajax(baseUrl+"/xl/php/community/getCommunity.php") //发送get请求
export const reqCommunity =(ID)=> ajax(baseUrl+"/xl/php/community/getCommunity.php",{
 //发送get请求指定社区
    params: {
    ID
  },
})

export const addCommunity =({ID,name,address})=> ajax.post(baseUrl+"/xl/php/community/addCommunity.php",{
    //发送post添加社区请求
    ID,name,address
}) 
export const updateCommunity =({ID,name,address})=>ajax.post(baseUrl+"/xl/php/community/updateCommunity.php",{
    //发送post添加社区请求
    ID,name,address
}) 

//---------------------------------------用户
export const reqElder =(id)=> ajax(baseUrl +'/xl/php/elders/reqElders.php',{
    params: {
        id
      },
})
export const addElder =({id,name,age,birth,sex,communityID,communityName,tel,address})=>(
    ajax.post(baseUrl +'/xl/php/elders/addElder.php',{
        id,name,age,birth,sex,communityID,communityName,tel,address
    })
)

export const updateElder =()=> ajax(baseUrl +'/xl/php/elders/updateElders.php')

