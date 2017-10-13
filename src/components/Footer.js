import React ,{ Component } from 'react'
import { NavLink } from 'dva/router'
import Styles from '../routes/Main.less'
import{Icon } from 'antd'
class Footer extends React.Component{
  render() {
    const { current } = this.props
    return (
      <div style={{width:'100%'}}>
         <ul className={Styles.bottom} >
        <li><NavLink  to='/' className={Styles.bottomlink} activeClassName={Styles.active}><Icon type="home" /></NavLink ></li>
        <li><NavLink to='/submit' className={Styles.bottomlink}><Icon type="edit" /></NavLink></li>
        <li><NavLink to='/message' className={Styles.bottomlink}><Icon type="message" /></NavLink></li>
        <li><NavLink to='/login' className={Styles.bottomlink} activeClassName={Styles.active}><Icon type="user" /></NavLink></li>
      </ul>
      </div>
    )
  }
}

export default Footer
