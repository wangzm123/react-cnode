import * as Services from '../services/IndexPage'
export default {
  namespace: 'detail',
  state:{
    data:{},
    replies: [],
  },
  reducers: {
    update(state,action){
      return {...state,...action.payload}
    }
  },
  effects:{
    *getDetail(action,{call,put}){
      const res = yield call (Services.getDetial,{...action.payload})
      yield put ({
        type:'update',
        payload:{
          data: res.data.data,
          replies: res.data.data.replies
        }
      })
    }
  },
  subscriptions: {
    setup({history, dispatch}){
      return history.listen(({pathname}) => {
       if(pathname.split('/')[1] == 'detail'){
         dispatch({
           type:'getDetail',
           payload: {
             id:pathname.split('/')[2],
           }
         })
       }
      })
    }
  }
}
