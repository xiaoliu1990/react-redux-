import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddUa } from 'reduxs/actions/index/index';
import { Button, Toast } from 'antd-mobile';
import moment from 'moment';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intVal:'124',
      remark:'',
      dateTime:moment().format("YYYY-MM-DD")
    };
  }
  componentDidMount() {
    
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
  }
  render() {
    let {intVal, dateTime, remark}=this.state, { indexhome, addUas } = this.props;

    return (
      <div>
      <input type="text" className="app-txt" name="intVal" placeholder="请输入尿酸值" value={intVal} onChange={(v)=>this.handleInputChange(v)} />
      <input type="text" className="app-txt" name="remark" placeholder="备注" value={remark} onChange={(v)=>this.handleInputChange(v)} />
      <div className="app-div">{dateTime}</div>
        <Button onClick={() => addUas(intVal, dateTime, remark)}>点击</Button>
      </div>
    );
  }
}
Form.propTypes = {
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
    addUas: (intVal, dateTime, remark) => {
      let data={
        "channel": 'h5',
        "data": {
          "checkTime": new Date(dateTime).getTime(),
          "optType":"add",
          "itemType": "UA",
          "value": {
            "UA_URICACID": intVal,
          },
          "remark":remark,
        },
        "reqTime": new Date().getTime()
      }
      if(intVal==''){
        Toast.info('请输入尿酸数据！', 2);
        return
      }
      dispatch(AddUa(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
