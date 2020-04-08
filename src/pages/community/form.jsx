import React, { Component } from 'react'
import {
    message,
    Input,
    Form
  } from "antd"
import {debounce} from "../../utils/lowUtils"  //防抖函数
import {reqCommunity} from "../../api"
  
 class AddUpdateForm extends Component { 
    formRef = React.createRef();
     state ={
            ID:"",
            name: "",
            address:""
     }
     onFinish = values => {
        console.log(values);
      };
     //添加或者修改的小模块
     IDcheck=async(rule,value)=>{ //检查id
            var res=await reqCommunity(value)
            if(res.state==1){
                return Promise.reject('这个号已经有了哦');
            }else{
                return Promise.resolve();
            }
         
     }
     componentDidMount=()=>{
     }
    render() {
        return (
           <Form  
           ref={this.formRef}
           onFieldsChange={(changedFields, allFields) => {
               //莫名其妙onFieldsChange触发了三次
               if(this.count==1){
                this.props.setForm(this.formRef)
                     this.count=2;
               }else if(this.count==2){
                this.count=3;
               }else{
                this.count=1;
               }
          }}
           
           >
               <Form.Item label="社区编号" name="ID" 
               rules={[
                   {  required: true, message: 'Please input  ID!' },
                   { validator :this.IDcheck}
            ]}
               >
                    <Input placeholder='社区编号' />
               </Form.Item>
               <Form.Item label="社区名称" name="name" 
               rules={[{ required: true, message: 'Please input  name!' }]}
               >
                    <Input placeholder='社区名称' />
               </Form.Item>
               <Form.Item label="社区地址" name="address" 
               rules={[{ required: true, message: 'Please input  address!' }]}
               >
                    <Input placeholder='社区地址' />
               </Form.Item>
           </Form>
        )
    }
}

export default  AddUpdateForm