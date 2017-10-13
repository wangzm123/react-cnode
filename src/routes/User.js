import React, {Component} from 'react'
import {connect } from 'dva'
import {getCache } from '../utils/storage'
import UserContent from '../components/user/UserContent'
function User ({dispatch, location, user}){
  const photo = getCache('accesstoken').avatar_url
const {userMessage, currentData } = user
console.log(666,user)
console.log(photo)
  const userProps = {
    photo,
    userMessage,
    currentData,
  }
 return (
    <div>
     <UserContent {...userProps}/>
    </div>
  )
}

function mapStateToProps({user}){
  return {user}
}
export default connect(mapStateToProps)(User)
