/*
首页路由组件
*/
import React, { Component } from 'react';
import './community.scss'

import {
  Modal,
  message,
  Card,
  Button,
  Icon,
  Table
} from "antd"
import LinkButton from "../../components/link-button/index"
import AddUpdateForm from "./form.jsx"  //添加修改的便捷表单
//--------------------数据请求
import { addCommunity, updateCommunity, reqCommunity, reqCommunities } from "../../api"
import { debounce } from "../../utils/lowUtils"  //防抖函数

class community extends Component {
  constructor(props) {
    super(props);
    this.form ={};
    
  }
  state = {
    row:{},  //选中行
    communities: [],
    loading: false, //是否正在加载,
    showStatus: 0, //0显示隐藏  1显示添加 2显示修改
    formData: {}, //表单数据
  }
  columns = []  //；列表列配置
  initColumns = () => {
    this.columns = [
      {
        title: '编号',
        dataIndex: 'id',
        sorter: {
          compare: (a, b) => a.ID - b.ID,
          multiple: 3,
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',//字段
        render: text => <a href="javascript:">{text}</a> //转为链接
      },
      {
        title: '创建日期',
        dataIndex: 'createTime',
        sorter: {
          compare: (a, b) => a.createTime - b.createTime,
          multiple: 2,
        },
      },
      {
        title: '地址',
        width: 300,
        dataIndex: 'address',
      },
      {
        title: "查看详情",
      render: current => <LinkButton onClick={()=>{ this.setState({showStatus:2,row:current})}}>修改分类</LinkButton> //转为链接

      }
    ];
  }
  getRows = async () => {
    this.setState({ loading: true })
    const result = await reqCommunities();
    if (result.state == 1) {
      //正确收到数据
      this.setState({
        communities: result.data,
        loading: false
      })
    } else {
      this.setState({
        loading: false
      })
      message("获取社区信息失败")
    }

  }
  handleOk =  () => {  //点击确定
    //开始验证
    let res ;
    if(this.state.showStatus==1){
      //添加全部需要验证
      res = this.form.current.validateFields();
    }else{
      //修改不需要验证ID
      res = this.form.current.validateFields(["name","address"]);

    }

    let result ;
    res.then(() => {  //验证正确
      this.setState({
        formData: this.form.current.getFieldsValue()
      },async () => {
        if(this.state.showStatus==1){
          result= await addCommunity({ ...this.state.formData });
        }else{
          result = await updateCommunity({ ...this.state.formData })
        }
        //发送请求  修改

        //发送请求  添加
        if (result.state == 1) {
          //验证通过
          message.success(result.msg)
        } else {
          message.error(result.msg)
        }
        this.handleCancel();
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
  componentWillMount() {
    this.initColumns();

  }
  componentDidMount() {
    this.getRows();
  }
  render() {
    const { loading, showStatus,row } = this.state;
    const extra = (
      <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
        + 添加社区
      </Button>
    );
    return (
      <Card className="community" extra={extra}>
        <Table
          columns={this.columns} dataSource={this.state.communities}
          loading={loading}
          bordered={true}//有边框
          rowKey="id"
          scroll={{ x: true }}
          pagination={{//分页配置
            defaultPageSize: 5,
            showQuickJumper: true
          }}
        />
        <Modal
          visible={showStatus !== 0}
          title={showStatus==1?"添加":"修改"}
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
          <AddUpdateForm setForm={form=>this.form=form} 
          row={showStatus==2?row:{}}
          />
        </Modal>
      </Card>
    );
  }
}

export default community;
