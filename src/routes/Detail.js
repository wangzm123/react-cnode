import { connect } from 'dva'
import Back from '../components/Back'
 import Content from '../components/detail/content'
function Detail ({location, detail,store }) {
  const {data, replies } = detail
  console.log(123,store)
  const backProps = {
    id: location.pathname.split('/')[2],
    title: location.pathname.split('/')[3]
  }
  const contentProps = {
    data,
    replies
  }
  return (
    <div>
      <Back {...backProps}/>
      <Content {...contentProps}/>
    </div>
  )
}
function mapStateToProps({detail}){
  return {detail}
}
export default connect (mapStateToProps)(Detail);

