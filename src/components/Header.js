import React ,{ Component } from 'react'
import { NavLink } from 'dva/router'
import Styles from '../routes/Main.less'
class Header extends React.Component{
  render() {
    const { current } = this.props
    console.log(current)
    return (
      <div>
         <ul className={Styles.nav} onClick={this.props.headerClick}>
          <li><span type="1" className={current == 1 ? Styles.active : Styles.link}>全部</span></li>
          <li><span type="2" className={current == 2 ? Styles.active : Styles.link}>精华</span></li>
          <li><span type="3" className={current == 3 ? Styles.active : Styles.link}>分享</span></li>
          <li><span type="4" className={current == 4 ? Styles.active : Styles.link}>问答</span></li>
          <li><span type="5" className={current == 5 ? Styles.active : Styles.link}>招聘</span></li>
      </ul>
      </div>
    )
  }
}

export default Header
