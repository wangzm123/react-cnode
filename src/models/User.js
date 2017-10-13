import * as Services from '../services/user'
import {routerRedux } from 'dva/router'
import {saveCache}  from '../utils/storage'
import {message } from 'antd'
export default {
  namespace:'user',
  state:{
    photo:'',
    userMessage: {},
    currentData:{}
  },
  reducers:{
    savePhoto(state, action){
      return {...state, ...action.payload}
    },
    saveMessage (state,action) {
      return {...state, ...action.payload}
    }
  },
  effects:{
    *login(action,{call, put}){
     const data = yield call(Services.login,action.payload)
     if(!data.success && !data.data){
      message.error('登录失败');
      return ;
     }
     if(data.data.success){
       saveCache('accesstoken',data.data)
       yield put (
          routerRedux.push({
          pathname:'/user'
        })
       )
       yield put({
         type:'savePhoto',
         payload: {
           photo: data.data.avatar_url
         }
       })
     }
    },
    *getUserDetail({},{call,put}){
       const res = yield call (Services.getUserDetail)
       console.log(res)
       if(res.data.success){
         yield put({
           type:'saveMessage',
           payload:{
            userMessage:res.data.data,
            currentData:res.data.data.recent_topics
           }
         })
       }
    }
  },
  subscriptions:{
    setup({history, dispatch}) {
      return history.listen(({pathname})=>{
        if(pathname == '/user'){
          dispatch({
            type:'getUserDetail'
          })
        }
      })
    }
  }
}
