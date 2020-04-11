import React, { Component } from 'react'
import {
    message,
    Input,
    Form,
    Select,
  } from "antd"
import {debounce} from "../../utils/lowUtils"  //防抖函数
import {reqElder} from "../../api"
  import PropTypes from "prop-types"

//----------------------
const { Option } = Select;
//-----------------------------


 class ElderForm extends Component { 
     static propTypes ={
        setForm:PropTypes.func.isRequired , //必须有setForm
        row :PropTypes.string    //初始显示值
     }
    formRef = React.createRef();
     state ={
            id:"",
            name: "",
            address:""
     }
     onFinish = values => {
        console.log(values);
      };
     //添加或者修改的小模块
     IDcheck=async(rule,value)=>{ //检查id
            var res=await reqElder(value)
            if(res.state==1){
                return Promise.reject('这个号已经有了哦');
            }else{
                return Promise.resolve();
            }
         
     }
     initValue=()=>{  //刷新表单的默认值
        const {id,name,address} = this.props.row;
        this.formRef.current.setFieldsValue({
            ID:id,
            name:name,
            address:address
        })
     }
     componentWillMount=()=>{
        this.props.setForm(this.formRef);
     }
     componentDidUpdate=()=>{
        this.initValue();  //刷新值
     }
     
    render() {
        
        return (
           <Form  
           ref={this.formRef}
           onFieldsChange={(changedFields, allFields) => {
               //莫名其妙onFieldsChange触发了三次
               if(this.count==1){
              //
                     this.count=2;
               }else if(this.count==2){
                this.count=3;
               }else{
                this.count=1;
               }
          }}
           >
               <Form.Item label="用户编号" name="id" 
               rules={[
                   {  required: true, message: 'Please input  ID!' },
                   { validator :this.IDcheck}
            ]}
               >
                    <Input placeholder='用户id' />
               </Form.Item>
               <Form.Item label="用户名称" name="name" 
               rules={[{max: 20, message: '地址太长了!' }]}
               >
                    <Input placeholder='用户名称' />
               </Form.Item>
               
               <Form.Item label="性别" name="sex" 
               >
                    <Select >
                    <Option value="男">🕺男</Option>
                    <Option value="dollar">💃女</Option>
                    </Select>
               </Form.Item>

               <Form.Item label="社区" name="community" 
               >
                    <Select >
                    <Option value="男">🕺男</Option>
                    <Option value="dollar">💃女</Option>
                    </Select>
               </Form.Item>

               <Form.Item label="联系方式" name="tel" 
               rules={[
               {pattern :/^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/ ,message:"电话号码不太对哦"}  
            ]}
               >
                    <Input placeholder='联系方式' />
               </Form.Item>

               <Form.Item label="用户地址" name="address" 
               rules={[{ max: 50, message: '地址太长了!' }]}
               >
                    <Input placeholder='用户地址' />
               </Form.Item>
           </Form>
        )
    }
}

export default  ElderForm