import React from 'react'
import Styles from './detail.less'
import {Icon } from 'antd'
class Content extends  React.Component{
  constructor (props) {
    super(props)
    this.state = {
      startX:0,
      startY:0,
      endX:0,
      endY: 0,
      visible:1,
    }
  }

  setHTML = (content) => {
    return ({__html: content})
  }
  touchStart = (e) => {
    e.persist()
    this.setState({
      startX: e.touches[0].screenX,
      startY:  e.touches[0].screenY,
      endX: e.touches[0].screenX,
      endY: e.touches[0].screenY,
    })
  }
  touchMove = (e) => {
     e.persist()
    this.setState({
      endX: e.touches[0].screenX,
      endY: e.touches[0].screenY,
    })
    if(this.state.endY>this.state.preY){
      console.log('下滑')
    }else{
      console.log('上滑')
    }
  }

  touchEnd = (e) => {
    e.persist()
    console.log(e)
    console.log(this.state)
    if(this.state.endY === this.state.startY){
      return
    }

    if(this.state.endY>this.state.startY){
      console.log('下滑')
      //出现
      this.setState({
        visible: 1
      })
    }else{
      console.log('上滑')
      //消失
      this.setState({
        visible: 0
      })
    }
  }


  render () {
    const { data } = this.props
    console.log(this.props)
    return (
      <div className={Styles.detail } >
        <div dangerouslySetInnerHTML= {this.setHTML(data.content)}
        className={this.state.visible == 1 ? Styles.detailcontent : Styles.contentall}
        onTouchStart= {this.touchStart}
        onTouchMove = {this.touchMove}
        onTouchEnd = {this.touchEnd}
        ></div>
        <div className={this.state.visible == 1 ? `${Styles.footer} ${Styles.footercontainer} `: `${Styles.footerHide} ${Styles.footercontainer}`}>
          <Icon type={data.is_collect ? 'heart' : 'heart-o'}/>
          <Icon type="edit" />
          <span><Icon type="message" />{data.reply_count}</span>
        </div>
      </div>
    )
  }
}

export default Content
