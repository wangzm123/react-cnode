import React, {Compont} from 'react'
import Back from '../Back'
import {Input,Button} from 'antd'
import Styles from './login.less'
class LoginCom extends React.Component{
  constructor (props){
    super(props)
    this.state={
      loginName:''
    }
  }

  login () {
   this.props.login(this.state.loginName)
  }
 inputChange (e){
  const loginName = e.target.value.replace(/^\s*|\s*$/g,'')
  this.setState({
    loginName:loginName
  })
 }

  render () {
    const loginProps={
      title: '登录'
    }
    return (
      <div>
        <Back {...loginProps} />
        <div className={Styles.login}>
          <Input
          type="text"
          size="large"
          ref="login"
          placeholder="AccessToken"
          style={{width:"80%"}}
          onChange={this.inputChange.bind(this)}
          />
            <Button
            className={Styles.button}
            type="primary"
            size="large"
            style={{width:"80%"}}
            onClick={this.login.bind(this)}>登录</Button>
        </div>
      </div>
    )
  }
}

export default LoginCom
