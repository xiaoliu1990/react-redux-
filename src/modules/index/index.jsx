import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SelectList } from 'reduxs/actions/index/index';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intVal:''
    };
  }
  componentDidMount() {
    let  { getData } = this.props;
    getData();
  }
  handleSubmit(url) {
    //query-string用法 qs.stringify({name: 'jim', age: 22});  // 'age=22&name=jim'
    this.props.history.push(url);
  }
  render() {
    let { indexhome } = this.props;
    if(indexhome.isUa){
      let appList=indexhome.dataList.map((item,index)=>{
        let uaNo='', uaName='';
        if(item.itemId==='UA'){
          uaNo=item.items[0].itemValue;
          uaName=item.items[0].itemName;
        }
        return(
          <li key={index} className="app-list">
            {item.itemId}
            {uaName} {uaNo}
          </li>
        )
      });
      return (
        <div>
          <ul>
            {appList}
          </ul>
          <div onClick={() => this.handleSubmit('/form')} className="app-div">跳转到表单</div>
        </div>
      );
    }else{
      return null;
    }
  }
}
Index.propTypes = {
  indexhome: PropTypes.shape({
    dataList: PropTypes.array.isRequired,
    isUa:PropTypes.bool,
  }).isRequired
};

const mapStateToProps = (state) => {
  return { indexhome: state.indexhome };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch(SelectList());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
