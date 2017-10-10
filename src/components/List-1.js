import React, { component } from 'react'
import Styles from './List.less'
import {Icon} from 'antd'
import {Link} from 'dva/router'
import ListView from 'antd-mobile/lib/list-view'




const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 10;
let pageIndex = 0;
class List extends React.Component{
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
      });
    }
  }


  onEndReached = (event) => {
    const pageNumber = this.props.pageNumber+1
    this.props.fetch({
      pageNumber: pageNumber,
      current: this.props.current == 1 ? 'all' : this.props.current == 2 ? 'good' : this.props.current == 3 ? 'share' : this.props.current == 4 ? 'ask' : 'job'
    })
  }

  render() {
    const { dataSource, pageNumber } = this.props
    const separator = (sectionID, rowID) => {
      return (
      <div key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    )};
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      if (index == 10) {
      const pageNumber = this.props.pageNumber+1
      this.props.fetch({
      pageNumber: pageNumber,
      current: this.props.current == 1 ? 'all' : this.props.current == 2 ? 'good' : this.props.current == 3 ? 'share' : this.props.current == 4 ? 'ask' : 'job'
    })
      }
      this.state.isLoading = false;
      const item = dataSource[index++];
      if(!item){
        return ''
      }
      const path = `/detail/${item.id}/${item.title}`
      return (
        <div key={rowID} className={Styles.row} >
          <Link to={path}>
          <div className={Styles.list} >
              <h3 className={Styles.title}>{item ? item.title : ''}</h3>
             <div className={Styles.content}>
               {/*<img src={item.author.avatar_url} />*/}
                <div className={Styles.loginname}><p>{item ? item.author.loginname : ''}</p></div>
                <div>
                  <p>{item ? item.create_at.slice(0,10) : ''}</p>
                  <p className={Styles.QA}><Icon type="message" /><span>{item ? item.visit_count : '' }</span></p>
                </div>
              </div>
            </div>
            </Link>
        </div>
      );
    };

    return (<div className={Styles.listview}>
      <ListView ref="lv"
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="fortest"
        style={{
          height: document.documentElement.clientHeight - 80 ,
          overflow: 'auto',

        }}
        pageSize={10}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={200}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
      />
    </div>);
  }
}
export default List
