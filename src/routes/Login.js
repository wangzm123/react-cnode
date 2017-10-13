import React, {Compont} from 'react'
import LoginCom from '../components/login/login'
import {connect} from 'dva'


function Login ({dispatch, location, user, history}){
 const loginProps = {
    login(payload){
      dispatch({
        type:'user/login',
        payload,
      })
    }
  }
 return (
    <div>
      <LoginCom  {...loginProps}/>
    </div>
  )
}

function mapStateToProps ({user}){
  return {user}
}
export default connect(mapStateToProps)(Login)
