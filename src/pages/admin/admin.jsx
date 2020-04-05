import React, { Component } from 'react'
import { Redirect, Switch, Route } from "react-router-dom"  //重新定向
//工具模块
import storageUtils from "../../utils/storageUtils.js"
//布局模块
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header"
//样式引入
import './admin.scss'

//注册路由
import Home from "../home/home.jsx"
import About from "../about/about.jsx"
import Assistance from "../assistance/assistance.jsx"
import Elder from "../elder/elder.jsx"
import User from "../user/user.jsx"

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        //读取保存的user，不存在则跳转到登录
        const user = storageUtils.getUser(); //如果有则读，没有则空
        if (!user.userName) {
            //不能直接使用this.props.history.replace('/login')
            return <Redirect to="/login" />
        }
        return (
            <Layout className="mainLayout">
                <Sider>
                    <LeftNav />

                </Sider>
                <Layout>
                    <Header />

                    <Content>
                        <Switch >
                            <Route path="/home" component ={Home}/>
                            <Route path="/user" component ={User}/>
                            <Route path="/elder" component ={Elder}/>
                            <Route path="/assistance" component ={Assistance}/>
                            <Route path="/about" component ={About}/>
                            <Redirect to='/home' />
                        </Switch >
                    </Content>

                    <Footer style={{ textAlign: "center", backgroundColor: 'rgba(0,0,0, 0.5)' }} >
                        <p>made by xl，for graduation</p>
                        <p>推荐使用chrome浏览器</p>
                    </Footer>
                </Layout>
            </Layout>

        )
    }
}
