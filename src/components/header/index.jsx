import React, { Component } from 'react';
import "./index.scss"
import storageUtils from "../../utils/storageUtils"

import {Modal,Button } from "antd"
import { ExclamationCircleOutlined } from  '@ant-design/icons';

import {withRouter} from 'react-router-dom'//非路由组件变成路由组件的包装函数
import menuList from "../../config/menuConfig.js"
//工具函数
import {formatDate} from "../../utils/lowUtils"
import {reqWeather} from "../../api/index.js"
//---------------------------------------------------
const { confirm } = Modal;
class Header extends Component {
    state = { 
        visible: false,
        nowTime:new Date(),
        dayPictureUrl:"",
        weather:""

     };
     componentDidMount(){
         //启动定时器
        this.intervalId= setInterval(() => {
             this.setState({
                 nowTime:new Date()
             })
         }, (1000));
         //发送jsonp请求天气
         this.getWeather();
     }
     componentWillMount(){
         //清除定时器
        clearInterval(this.intervalId);
     }
    logout = ()=>{
        //退出登录
       confirm({
            title: '现在就要下班了吗？？？',
            icon: <ExclamationCircleOutlined />,
            content: '今天的工作完成了🐎',
            onOk:()=> {
                //退出登录并删除登录信
              console.log('OK');
              storageUtils.removeUser();
              this.props.history.replace('/login')
            },
            onCancel() {
                //取消退出
              console.log('Cancel');
            }
        })
    }
    getTitle =()=>{
        //获取当前页面标题
        let title ="";
        const path =this.props.location.pathname;
        menuList.forEach(item=>{
            if(item.key==path){
                title =item.title;
                return false;//终止遍历
            }else if(item.children){
                const cItem =item.children.find(cItem=>cItem.key ==path);
                if(cItem){title =cItem.title}
                return false;//终止遍历

            }
        })
        return title;
    }
    getWeather= async ()=>{
       const {dayPictureUrl,weather} = await reqWeather();
      this.setState({
        dayPictureUrl,
          weather})
    }
    
    render() {
        const user = storageUtils.getUser();
        const title =this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎: &nbsp;&nbsp;{user.userName}</span>
                    <a href="javascript:" onClick={this.logout} >退出</a>
                </div><hr />
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <h2>&nbsp;{title}</h2>
                    </div>
                    <div className="header-bottom-right">
                        <span>{formatDate(this.state.nowTime)}</span>
                        <img src={this.state.dayPictureUrl} alt="" />
                            <span>{this.state.weather}</span>
                    </div>


                </div>
            </div>
        );
    }
}

export default withRouter(Header);
