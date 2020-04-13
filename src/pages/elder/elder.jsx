/*
首页路由组件 --老人管理
*/
import React, { Component } from 'react';
import './elder.scss'


import {
  Modal,
  message,
  Card,
  Button,
  Input,
  Select,
  Table
} from "antd"
import LinkButton from "../../components/link-button/index"
//--------------------数据请求
import { reqElder, addElder,updateElder,reqCommunity } from "../../api"
import { contains } from "../../utils/middleUtils"  //防抖函数
import AddUpdateElder from "./form.jsx"
import memoryUtils from "../../utils/memoryUtils.js"
//------------------------------------
const Option = Select.Option;
//--------------------
class elder extends Component {
  constructor(props) {
    super(props);
    this.form = {};

  }
  state = {
    row: {},  //选中行
    elders: [], //所有用户信息
    filter : {key :"name" ,value :""},  // 筛选字段key  筛选值value
    filterElders :[] ,//过滤后的用户信息
    loading: false, //是否正在加载,
    showStatus: 0, //0显示隐藏  1显示添加 2显示修改
    formData: {}, //表单数据

  }
  columns = []  //；列表列配置

  handleOk = () => {  //点击确定
    //开始验证
    let res;

    if (this.state.showStatus == 1) {
      //添加全部需要验证
      res = this.form.current.validateFields();
    } else {
      //修改不需要验证ID
      res = this.form.current.validateFields(["name", "address"]);
    }
    res.then(() => {  //验证正确
      this.setState({
        formData: this.form.current.getFieldsValue()
      }, async () => {
        let result ={};
        var community =await reqCommunity(this.state.formData.communityID);
        var communityName="";
        if(community.data){
          //有返回数据
          communityName =community.data[0].name;
        }

        if (this.state.showStatus == 1) {
          //发送请求  添加
          result = await addElder({...this.state.formData , communityName:communityName});
        } else {
        //发送请求  修改
    
          result = await updateElder({ ...this.state.formData , communityName:communityName})
        }

        if (result.state == 1) {
          //验证通过
          message.success(result.msg)
        } else {
          message.error(result.msg)
        }
        this.getRows();
      })
    });
    res.catch(() => {
      return message.error("再确认一下？");//验证不通过
    })


  }
  handleCancel = () => {  //点击取消
    this.setState({
      showStatus: 0
    })
  }
  filterElder =(value) =>{ //筛选条件
    const {filter ,elders}  =this.state;

   this.setState({filter:{...filter,value:value}},()=>{//修改过滤字段
    const {filter ,elders}  =this.state;
    let result = [];
    elders.map((item,index)=>{  //查询符合条件的项
      var res = contains(item[filter.key],filter.value);
      if(res>=0){
        result.push(item);
      }
    })
    this.setState({  //返回结果
      filterElders : result
    })  
   })
  }
  getRows = async () => {  //请求所有用户信息
    this.setState({ loading: true })
    const result = await reqElder();
    if (result.state == 1) {
      //正确收到数据
      this.setState({
        elders: result.data,
        loading: false,
        filterElders : result.data
      })
    } else {
      this.setState({
        loading: false
      })
      message("获取用户信息失败")
    }
  }
  iniRow = () => {
    this.columns = [
     
      {
        title: 'name',
        fixed: 'left',
        // dataIndex: 'name',//字段
        render: item => <LinkButton onClick ={()=>{
          memoryUtils.elderMemory =item;
          this.props.history.push(`/elderInfo/${item.id}`)}
        }>{item.name}</LinkButton> //转为链接
      },
      {
        title: 'id',
        dataIndex: 'id',
        
        sorter: {
          compare: (a, b) => a.id - b.id,
          multiple: 3,
        },
      },
      {
        title: 'age',
        dataIndex: 'age',
        sorter: {
          compare: (a, b) => a.age - b.age,
          multiple: 2,
        },
      },
      {
        title: 'sex',
        dataIndex: 'sex',
        sorter: {
          compare: (a, b) => a.sex - b.sex,
          multiple: 1,
        }
      },
      {
        title: 'tel',
        dataIndex: 'tel',
        sorter: {
          compare: (a, b) => a.tel - b.tel,
          multiple: 1,
        }
      },
      {
        title: 'communityName',
        width :200,
        dataIndex: 'communityName',
        sorter: {
          compare: (a, b) => a.communityName - b.communityName,
          multiple: 1,
        }
      },
      {
        title: 'address',
        dataIndex: 'address',
        width :400,
        sorter: {
          compare: (a, b) => a.address - b.address,
          multiple: 1,
        }
      },
      {
        title: "修改信息",width:100, fixed: 'right',
        render: current => <LinkButton onClick={() => { this.setState({ showStatus: 2, row: current }) }}>修改分类</LinkButton> //转为链接

      }
    ];
  }
  componentWillMount() {
    this.iniRow();
  }
  componentDidMount() {
    this.getRows();
  }
  render() {
    const { loading, showStatus, row, filterElders ,filter} = this.state;

    const extra = (
      <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
        + 添加用户
      </Button>
    );
    const title = (
      <span className="cardTitle">
        <Select className="title-select"   onChange={(key)=>{this.setState({filter:{...filter,key:key}})}}>
        <Option value="name">按id搜索</Option>
          <Option value="name">按名称搜索</Option>
          <Option value="age">按年龄搜索</Option>
          <Option value="tel">按电话搜索</Option>
          <Option value="communityName">按社区名称搜索</Option>
          <Option value="address">按地址搜索</Option>

        </Select>
        <Input.Search className="title-input"  enterButton={true} onSearch={this.filterElder} />
      </span>
    )

    return (
      <Card className="elder"   title ={title} extra={extra}>
        <Table  className="elder-table"
          columns={this.columns} dataSource={filterElders} scroll={{ x: 1500}} 
          loading={loading}
          bordered={true}//有边框
          rowKey="id"
          pagination={{//分页配置
            defaultPageSize: 4,
            showQuickJumper: true
          }}
        />
        <Modal
          visible={showStatus !== 0}
          title={showStatus == 1 ? "添加" : "修改"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          {/* 将子组件的数据传出来 */}
          <AddUpdateElder setForm={form => this.form = form}
            row={showStatus == 2 ? row : {}}
          />
        </Modal>
      </Card>
    );
  }
}

export default elder;
