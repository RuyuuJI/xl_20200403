import React, { Component } from 'react';
import "./index.scss"
import { Link ,withRouter} from "react-router-dom"  //{定向，包装非路由组件}

//--------------文档上的icon和menu
import { Menu } from 'antd';

//引入菜单配置
import { HomeOutlined} from '@ant-design/icons';
import menuList from "../../config/menuConfig.js"
//资源
import aidImg from "../../assets/svg/aid.svg";
const { SubMenu } = Menu;
//-------------------------------------


class index extends Component {
    state = {
        collapsed: true,
        openKeys : '',
        currentPath:this.props.location.pathname
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    getmenuNode =(menuList) =>{
        
         //获取menu数据数组，生成标签数组
        //根据是否有children属性生成<Menu > 或者<SubMenu>
        const currentPath = this.state.currentPath;

        return menuList.reduce((pre,item) =>{
            //pre为返回数组
            let Icon = item.icon;
            if (!item.children) {
                pre.push ( 
                <Menu.Item key={item.key} >
                    <Link to={item.key}>
                       <Icon />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
              
                )
            }else{
                //每个item是否匹配默认的openkey
                if(item.children.find(cItem =>cItem==currentPath)){
                    this.setState({
                        openKeys:item.key
                    })  
                }
                pre.push(
                    <SubMenu key={item.key} title={
                        <span>
                             <Icon />
                            <span>{item.title}</span>
                        </span>
                    }>
                       {this.getmenuNode(item.children)}
                    </SubMenu>
                )
            }
            return pre
        },[])
    }
    componentWillMount(){
        //第一次执行render前，做同步的准备
        this.menuNodes =this.getmenuNode(menuList);

    }
    render() {
        console.log(this.openKeys)
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={aidImg} alt="点击返回首页" />
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    // selectedKeys ={[this.state.currentPath]}
                    defaultSelectedKeys={[this.state.currentPath]}
                    defaultOpenKeys={[this.state.openKeys]}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="/home">
                        <Link to="/home">
                            <HomeOutlined />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}

//告诫组件，新组件向index传递history,location,match
export default withRouter(index);
