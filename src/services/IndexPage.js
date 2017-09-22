import request from '../utils/request';

export function fetch(payload) {
  return request(`/api/v1/topics?tab=${payload.current}&page=${payload.pageNumber}&limit=10&mdrender=false`);
}
export function getDetial (payload){
  console.log(11,payload)
  return request(`/api/v1/topic/${payload.id}?mdrender=true&accesstoken`)
}
