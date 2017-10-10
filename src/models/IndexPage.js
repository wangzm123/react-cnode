import * as Services from '../services/IndexPage'
import { PAGE_SIZE } from'../constants'
export default {
  namespace: 'indexPage',
  state: {
   current:1,//当前的type
   pageNumber: 1,
   dataSource: []
  },
  reducers: {
    changeCurrent(state,action){
      return {...state,...action.payload}
    },
    setList(state,action){
      console.log(action.payload)
      return {...state,...action.payload}
    }
  },
  effects: {
    *change({...payload}, {put, call}){
      yield put({
        type: 'changeCurrent',
        payload:{
          current: payload.payload-0
        }
      })
      const res = yield call (Services.fetch, {
        current: payload.payload == 1 ? 'all' : payload.payload == 2 ? 'good' : payload.payload == 3 ? 'share' : payload.payload == 4 ? 'ask' : 'job',
        pageNumber:1
      })
      yield put({
        type:'setList',
        payload:{
          dataSource: res.data.data,
          pageNumber:1
        }
      })
    },
    *fetch (action,{call, put, select}){
      let total= yield select(state => state.indexPage.dataSource)
      const res = yield call (Services.fetch, {...action.payload})
      const dataSource = total.concat(res.data.data)
      console.log(88888,total,res.data.data)
      yield put({
        type:'setList',
        payload:{
          dataSource: dataSource,
          pageNumber:action.payload.pageNumber
        }
      })
    }
  },
  subscriptions: {
    setup({history, dispatch}){
      return history.listen(({pathname}) => {
        if(pathname == '/'){
          dispatch({
            type: 'fetch',
            payload:{
              pageNumber:1,
              current: 'all',
            }
          })
        }
      })
    }
  }
}
