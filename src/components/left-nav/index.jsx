import React, { Component } from 'react';
import "./index.scss"
import { Link } from "react-router-dom"

//--------------文档上的icon和menu
import { Menu } from 'antd';
import {
    UsergroupAddOutlined,
    HomeOutlined,
    RedditOutlined,
    DeploymentUnitOutlined,
    DesktopOutlined,
    MailOutlined,
} from '@ant-design/icons';


//资源
import aidImg from "../../assets/svg/aid.svg";
const { SubMenu } = Menu;
//-------------------------------------


class index extends Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={aidImg} alt="点击返回首页" />
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['/home']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/home">
                        <Link to="/home">
                            <HomeOutlined />
                            <span>首页</span>
                        </Link>

                    </Menu.Item>
                    <SubMenu
                        key="user"
                        title={
                            <span>
                                <DesktopOutlined />
                                <span>管理员中心</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                        <Link to="/user">
                           个人信息
                        </Link>
                            </Menu.Item>
                        
                        <Menu.Item key="6">
                        <Link to="/home">
                           个人信息
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="/elder"
                        title={
                            <span>
                                <RedditOutlined />
                                <span>人员管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="/community"
                        title={
                            <span>
                                <UsergroupAddOutlined />
                                <span>社区管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="/assistance"
                        title={
                            <span>
                                <MailOutlined />
                                <span>互助管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/about">
                        <DeploymentUnitOutlined />
                        <span>关于系统</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default index;
