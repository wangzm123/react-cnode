import React from 'react';
import { connect } from 'dva';
import Styles from './IndexPage.less';
import List from '../components/List'
import Header from '../components/Header'
import {NavLink} from 'dva/router'
import {Icon} from 'antd'
function IndexPage({location, dispatch, indexPage}) {
  const {current, dataSource, pageNumber} = indexPage
  const headerProps = {
    current,
    headerClick(e){
     const newCurrent = e.target.getAttribute('type') - 0
     if(newCurrent){
       dispatch({
         type:'indexPage/change',
         payload:newCurrent
       })
     }
    }
  }
  const listProps = {
    dataSource,
    current,
    pageNumber,
    fetch(payload){
      dispatch({
        type:'indexPage/fetch',
        payload,
      })
    }
  }
  return (
    <div>
      <Header {...headerProps}/>
      <div className={Styles.list}>
        <List {...listProps}/>
      </div>
      <ul className={Styles.bottom} >
        <li><NavLink  to='/' className={Styles.bottomlink} activeClassName={Styles.active}><Icon type="home" /></NavLink ></li>
        <li><NavLink to='/submit' className={Styles.bottomlink}><Icon type="edit" /></NavLink></li>
        <li><NavLink to='/message' className={Styles.bottomlink}><Icon type="message" /></NavLink></li>
        <li><NavLink to='/my' className={Styles.bottomlink}><Icon type="user" /></NavLink></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};
function mapStateToProps ({indexPage}) {
  return {indexPage}
}

export default connect(mapStateToProps)(IndexPage);
