import React, {Compont} from 'react'
import {Icon} from 'antd'
import {Link} from 'dva/router'
import Styles from './user.less'
import Footer from'../Footer'
class UserContent extends React.Component{
  constructor (props) {
    super(props)
    this.state={
      currentData: this.props.userMessage ? this.props.userMessage.recent_topics : [],
      cur:0
    }
  }
  changelist (type) {
    if(type){
      this.setState({
        currentData: this.props.userMessage.recent_replies,
        cur:type
      })
    }else{
       this.setState({
        currentData: this.props.userMessage.recent_topics,
        cur:type
      })
    }
  }
  render () {
    const {photo, userMessage } = this.props
    return (
      <div className={Styles.user}>
       <div className={Styles.header}>
         <span>个人中心</span>
         {/*<Icon type="logout" />*/}
        </div>
        <div className={Styles.message}>
          <img src={photo}/>
          <p>{userMessage.loginname}</p>
        </div>
        <div className={Styles.listcontainer}>
          <p className={Styles.tab}>
            <span onClick={this.changelist.bind(this,0)} className={this.state.cur == 0 ? Styles.active : ''}>主题</span>
            <span onClick={this.changelist.bind(this,1)} className={this.state.cur == 1 ? Styles.active : ''}>回复</span>
          </p>
          <div>
           {
            this.state.currentData ? this.state.currentData.map((item, index) => {
              const path=`/detail/${item.id}/${item.title}`
              return (
                <div key={item.id}>
                  <Link to={path}>
                    <p>
                      <span>{item.title}</span>
                      <span>{item.last_reply_at}</span>
                    </p>
                    </Link>
                </div>
              )
            }) : ''
           }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default UserContent
