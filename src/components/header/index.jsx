import React, { Component } from 'react';
import "./index.scss"
import storageUtils from "../../utils/storageUtils"

import {Modal,Button } from "antd"
import { ExclamationCircleOutlined } from  '@ant-design/icons';

import {withRouter} from 'react-router-dom'//非路由组件变成路由组件的包装函数

//---------------------------------------------------
const { confirm } = Modal;
class Header extends Component {
    state = { visible: false };
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
    render() {
        const user = storageUtils.getUser();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎: &nbsp;&nbsp;{user.userName}</span>
                    <a href="javascript:" onClick={this.logout} >退出</a>
                </div><hr />
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <h2>title</h2>
                    </div>
                    <div className="header-bottom-right">
                        <span>动态时间</span>
                        <img src="" alt="" />
                        <span>动态天气</span>
                    </div>


                </div>
            </div>
        );
    }
}

export default withRouter(Header);
