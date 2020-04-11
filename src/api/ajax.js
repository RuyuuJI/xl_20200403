/*
发送ajax的封装函数
*/
import axios from 'axios'
import qs from 'qs';
import {message } from "antd"
//添加请求拦截器
//post请求所有字符串转json
axios.interceptors.request.use(function (config) {
    //得到请求方式和请求体数据
    const {method,data} =config;
    config["Content-Type"] = "application/x-www-form-urlencoded"
    //将data对象转换成为query参数格式字符串
    if(method.toLowerCase() == 'post'  && typeof data =='object'){
        config.data =  qs.stringify(data);
    }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    message.error('请求出错'+error.message)
    // return Promise.reject(error);
    return new Promise(()=>{})//中断promise链
  });

  
export default axios