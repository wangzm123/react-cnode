import {NavLink, IndexLink } from 'dva/router'
import Styles from './Main.less'
import {connect} from'dva'
import { Button, Icon} from 'antd'

function Con ({location, dispatch, children, indexPage}) {
  return (
    <div>
     <div className={Styles.main}>
       {children}
      </div>
    </div>
  )
}
function mapStateToProps ({indexPage}) {
  return {indexPage}
}
export default connect(mapStateToProps)(Con);

