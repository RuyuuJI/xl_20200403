import React from 'react'
import "./index.scss"

function LinkButton(props){
    //组件标签体内容作为children属性传入
return <button className="linkButton" {...props} />

}

export default LinkButton;