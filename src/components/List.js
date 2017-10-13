import React, { component } from 'react'
import Styles from './List.less'
import {Icon} from 'antd'
import {Link} from 'dva/router'

class List extends React.Component{
  constructor (props) {
    super(props)
    this.state={
      loading:false
    }
  }
  mouseMove (e) {
    const scrollTop = this.refs.list.scrollTop
    const viewHeight = document.body.clientHeight-80
    const totalHeight = document.getElementById("total") ? document.getElementById("total").offsetHeight-40 : 0
    if(totalHeight-viewHeight-scrollTop < 40) {
      this.setState({
        loading: true
      })
    }
  }
  touchLeave (e) {
    const scrollTop = this.refs.list.scrollTop
    const viewHeight = document.body.clientHeight-80
    const totalHeight = document.getElementById("total") ? document.getElementById("total").offsetHeight-40 : 0
    if(totalHeight-viewHeight-scrollTop < 40) {
        const pageNumber= this.props.pageNumber
        this.props.fetch({
          pageNumber:pageNumber + 1,
          current:this.props.current == 1 ? 'all' : this.props.current == 2 ? 'good' : this.props.current == 3 ? 'share' : this.props.current == 4 ? 'ask' : this.props.current == 5 ? 'job' : 'dev'
        })
    }
  }
  componentWillReceiveProps (newProps) {
    this.setState({
      loading: false
    })
  }
  render () {
    const { dataSource, pageNumber } = this.props
    const height= document.body.clientHeight-80
    return (
      <div className={Styles.list}
        ref="list"
        id="list"
        style={{height:height+'px'}}
        onTouchMove={this.mouseMove.bind(this)}
        onTouchEnd={this.touchLeave.bind(this)}>
        <div id="total">
        {dataSource.map((item,index) => {
          const path=`/detail/${item.id}/${item.title}`
          return (
            <div key={item.id} ref={index == dataSource.length-1 ? 'last' : ''} id={index == 0 ? 'first' : ''}>
              <Link to={path}><h3 className={Styles.title}>{item.title}</h3></Link>
              <div className={Styles.content}>
                <img src={item.author.avatar_url} />
                <div className={Styles.loginname}><p>{item.author.loginname}</p></div>
                <div>
                  <p>{item.create_at.slice(0,10)}</p>
                  <p className={Styles.QA}><Icon type="message" /><span>{item.visit_count}</span></p>
                </div>
              </div>
            </div>
          )
        })}
        {
          this.state.loading ? <div><h1>加载中...</h1></div> : ''
        }
        </div>
      </div>
    )
  }
}

export default List

