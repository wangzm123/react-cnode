import request from '../utils/request'
import {getCache } from '../utils/storage'

export function login (payload){
  console.log('service',JSON.stringify({accesstoken: payload}))
  return request(`/api/v1/accesstoken`,{
    method:'post',
    body:JSON.stringify({accesstoken:'52fa1171-ef87-4360-ad38-e88186e504f6'})
  })
}
export function getUserDetail () {
  const userName = getCache('accesstoken') ? getCache('accesstoken').loginname : ''
    return request(`/api/v1/user/${userName}`)
}

