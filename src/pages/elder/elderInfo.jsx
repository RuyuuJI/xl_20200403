//用户信息
import React, { Component } from 'react';
import LinkButon from "../../components/link-button"
import {
    Card,
    List,
    Input,
    message,
    Checkbox
} from "antd"
import {
    BankOutlined
} from '@ant-design/icons';
import "./elderInfo.scss"
//---------------------------工具
import memoryUtils from "../../utils/memoryUtils.js"
//---------------------------api
import {reqElder} from "../../api"
//---------------------------
const Item = List.Item

//---------------------------------
class elderInfo extends Component {
    isElder=React.createRef();
    state ={
        elder: memoryUtils.elderMemory  //当前是否选择过用户
    }
    searchElder=async (value)=>{
        //发送查找请求
        let res =await reqElder(value);
        if(res.state ==1 ){
            memoryUtils.elderMemory = res.data[0];
            message.success("見つけた！");
            // console.log(this.isElder)
            this.setState({
                elder :memoryUtils.elderMemory
            });
        }else{
            message.warn("无人知晓");
            this.setState({
                elder :false
            });
        }
    }
    render() {
       const elder= memoryUtils.elderMemory ;
       const extra = (   //搜索框
        <span className="searchElder" >
         <Checkbox style={{display:"none"}} ref={this.isElder}/>
        <Input.Search className="searchElder-search"
        placeholder="根据id查找"
        enterButton={true} onSearch={this.searchElder} >
        </Input.Search>
        </span>
       )
       if(!elder.id){  //如果当前没有选择用户
        return extra
       }
        const title = (
            <span>
                <LinkButon onClick={()=>{this.props.history.goBack();}}>
                     <BankOutlined />
                </LinkButon>
                <span>用户统计</span>
            </span>
        )
        return (
           <Card title={title} extra={extra}>
                   <List>
                       <Item className="list-item">
                           <span className="list-item-left">用户ID</span>
                            <span>{elder.id}</span>
                       </Item>
                       <Item className="list-item">
                           <span>
                               <img src="../../assets/png/testUser.jpg"/>
                           </span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">姓名</span>
                           <span>{elder.name}</span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">性别</span>
                           <span>{elder.sexd}</span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">年龄</span>
                           <span>{elder.age}</span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">社区</span>
                           <span>{elder.communityName}</span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">联系方式</span>
                           <span>{elder.tel}</span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">地址</span>
                           <span>{elder.address}</span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">个人描述</span>
                           <span>
                               
                           </span>
                       </Item>
                   </List>
            </Card>
        );
    }
}

export default elderInfo;
