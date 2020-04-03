import React, { Component } from 'react';
//表单
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import "./login.scss";

//图标
import Aidsvg from "../../assets/svg/aid.svg";

const Item = Form.Item

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
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
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Item>
                        <Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
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

export default Login;
