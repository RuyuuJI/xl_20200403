//社区信息
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
import "./communityInfo.scss"
//---------------------------工具
import memoryUtils from "../../utils/memoryUtils.js"
//---------------------------api
import {reqCommunity} from "../../api"
//---------------------------
const Item = List.Item

//---------------------------------
class communityInfo extends Component {
    isCommunity=React.createRef();
    state ={
        isCommunity :false,
    }
    searchCommunity=async (value)=>{
        //发送查找请求
        let res =await reqCommunity(value);
        if(res.state ==1 ){
            memoryUtils.communityMemory = res.data[0];
            message.success("見つけた！");
            // console.log(this.isCommunity)
            this.setState({
                isCommunity :memoryUtils.communityMemory
            });
        }else{
            message.warn("无人知晓");
            this.setState({
                isCommunity :false
            });
        }
    }
    render() {
       const community= memoryUtils.communityMemory ;

       const extra = (   //搜索框
        <span className="searchCommunity" >
         <Checkbox style={{display:"none"}} ref={this.isCommunity}/>
        <Input.Search className="searchCommunity-search"
        placeholder="根据id查找"
        enterButton={true} onSearch={this.searchCommunity} >
        </Input.Search>
        </span>
       )
       if(!community.id){  //如果当前没有选择用户
        return extra
       }
        const title = (
            <span>
                <LinkButon onClick={()=>{this.props.history.goBack();}}>
                     <BankOutlined />
                </LinkButon>
                <span>社区信息统计</span>
            </span>
        )
        return (
           <Card title={title} extra={extra}>
                   <List>
                       <Item className="list-item">
                           <span className="list-item-left">社区ID</span>
                            <span>{community.id}</span>
                       </Item>
                       <Item className="list-item">
                           <span>
                               <img src="../../assets/png/testUser.jpg"/>
                           </span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">社区名称</span>
                           <span>{community.name}</span>
                       </Item>
 
                       <Item className="list-item">
                           <span className="list-item-left">创办日期</span>
                           <span>{community.tel}</span>
                       </Item>

                       <Item className="list-item">
                           <span className="list-item-left">地址</span>
                           <span>{community.address}</span>
                       </Item>
                       <Item className="list-item">
                           <span className="list-item-left">社区公告</span>
                           <div dangerouslySetInnerHTML={{__html: community.bulletin}}>
                           </div>
                       </Item>
                   </List>
            </Card>
        );
    }
}

export default communityInfo;
