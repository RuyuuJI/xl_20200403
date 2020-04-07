## 这是一个后台管理项目 可以改成...
## test笔记
## 有个octotree浏览github方便记得装

1.git操作
2.搭建项目
3.基本使用

## 使用了antd  ant dsign of react
1.安装npm install antd
2.按需打包
3.标签组件，方法组件
4.修改antd主题颜色

## react-router-dom路由
1.路由是一种映射关系 一个key-value   key=path，
    value=前端component组件/后端处理请求的回调函数

    -----------------------------------------------
##  axios发送ajax请求，记得配置代理 

"proxy":"http://xlweb.ltd:8011" 转到目标地址
1.webpack-dev-serve提供的代理程序 --》http-proxy-middleware代理中间件
2解决开发时的ajax跨域问题，监视拦截本地ajax请求，转发请求
3配置代理是为了配置转发目标地址

请求拦截器（请求拦截器，响应拦截器）


    async await的使用，简化promise的使用，不再使用回调函数
    同步编码方式实现异步流程
    1。使用:在返回的promise左边使用await，得到promise的异步成功值
    2.在该函数前面加一个async

## 自动登录localstorage，使用story封装local插件管理，内存中存储提高效率
## 编写路由组件--》注册路由
----------------------------------------------------------
## 根据数据数组生成标签数组
获取页面标题，以后需要使用redux进行优化