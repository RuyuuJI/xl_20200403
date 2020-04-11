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
  Icon,
  Table
} from "antd"
import LinkButton from "../../components/link-button/index"
//--------------------数据请求
import { reqElder, addElder,updateElder } from "../../api"
import { debounce } from "../../utils/lowUtils"  //防抖函数
import AddUpdateElder from "./form.jsx"

class elder extends Component {
  constructor(props) {
    super(props);
    this.form = {};

  }
  state = {
    row: {},  //选中行
    elders: [],
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
        if (this.state.showStatus == 1) {
          //发送请求  添加
          result = await addElder({ ...this.state.formData});
        } else {
        //发送请求  修改
          result = await updateElder({ ...this.state.formDat })
        }
        console.log(result)
        if (result.state == 1) {
          //验证通过
          message.success(result.msg)
        } else {
          message.error(result.msg)
        }
        this.iniRow();
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

  getRows = async () => {
    this.setState({ loading: true })
    const result = await reqElder();
    if (result.state == 1) {
      //正确收到数据
      this.setState({
        elders: result.data,
        loading: false
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
        title: 'id',
        dataIndex: 'id',
        sorter: {
          compare: (a, b) => a.id - b.id,
          multiple: 3,
        },
      },
      {
        title: 'name',
        dataIndex: 'name',//字段
        render: text => <a href="javascript:">{text}</a> //转为链接
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
        title: '性别',
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
        title: 'address',
        dataIndex: 'address',
        sorter: {
          compare: (a, b) => a.address - b.address,
          multiple: 1,
        }
      },
      {
        title: "修改信息",
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
    const extra = (
      <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
        + 添加用户
      </Button>
    )
    const { loading, showStatus, row, elders } = this.state;

    return (
      <Card className="elder" extra={extra}>
        <Table
          columns={this.columns} dataSource={elders}
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
