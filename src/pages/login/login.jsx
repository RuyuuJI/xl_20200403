import React, { Component } from 'react';
//表单
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import "./login.scss";

//图标
import Aidsvg from "../../assets/svg/aid.svg";

const Item = Form.Item

class Login extends Component {
    constructor(props){
        super(props)
        this.handleSubmit =this.handleSubmit.bind(this)
    }
    handleSubmit=(e)=> {
        console.log(e);
        console.log( this.props );
        
    }
    validatorPwd =(rule, value)=>{
        //长度小于12
        //字母下划线数字有效
        value =value.trim();
        if(!value){
            return Promise.reject("不能敲空格哦")
        }else if (value.length>12){
            return Promise.reject("输入的字符太多了")
        }else if(!(/^[a-zA-Z0-9_]+$/.test(value))){
            return Promise.reject("你在乱敲些什么玩意儿呢")
        }else{
            return Promise.resolve("welcome")
        }
    }
    render() {
      
        return (
            <div className="login">
                <div className="login-header">
                    <img src={Aidsvg} alt="aid" />
                    <h1>互助式养老后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.handleSubmit}
                    >
                        <Item
                            name="userno"
                            initialvalues = {''}
                            rules={[{ required: true ,whitespace :true, message: 'Please input your Username!' },
                        {max:12,message:"最长为12位"},
                        {pattern :/^[a-zA-Z0-9_]+$/ ,message:"字母下划线才有效哦"}  
                    ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your Password!' },
                                {validator: this.validatorPwd}
                        ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Item>
                        <Item>


                            <a className="login-form-forgot" href="">
                                Forgot password
        </a>
                        </Item>

                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
        </Button>
         <a href="">register now!</a>
                        </Item>
                    </Form>
                </div>
            </div>
        );
    }
}
// 包装Form组件，形成新组件

export default Login;
