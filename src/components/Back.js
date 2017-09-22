import React, { Component } from 'react'
import {Icon} from 'antd'
import Styles from './back.less'
class Back extends React.Component{
  render () {
    const { title } = this.props
    return (
      <div className={Styles.back}>
        <Icon type="left" />
        <p>{title}</p>
      </div>
    )
  }
}

export default Back
