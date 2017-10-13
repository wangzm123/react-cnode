import React, { Component } from 'react'
import {routerRedux} from 'dva/router'
import {Icon} from 'antd'
import Styles from './back.less'
class Back extends React.Component{
  constructor (props){
    super(props)
  }
   back(){
     routerRedux.go(-1)
  }
  render () {
    const { title } = this.props
    return (
      <div className={Styles.back}>
        <Icon type="left"  onClick={ this.back.bind(this)}/>
        <p>{title}</p>
      </div>
    )
  }
}

export default Back
