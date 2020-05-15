import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddTodo, Search } from 'reduxs/actions/index/index';
import { Button } from 'antd-mobile';
import { DeleteTodo } from '../../redux/actions/index';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intVal:''
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
    let {intVal}=this.state, { searchText, indexhome, addTodos, deleteTodo } = this.props;
    let appList=indexhome.map((item,index)=>{
      return(
        <li key={index} className="app-list">
          {item.todo}
          <span onClick={() => deleteTodo(index)}>删除</span>
        </li>
      )
    });
    return (
      <div>
        <input type="text" className="app-txt" name="intVal" placeholder="请输入" value={intVal} onChange={(v)=>this.handleInputChange(v)} />
        <Button onClick={() => addTodos(intVal)}>点击</Button>
        <Button onClick={() => searchText(intVal)}>查询</Button>
        <ul>
          {appList}
        </ul>
      </div>
    );
  }
}

Index.propTypes = {
  indexhome: PropTypes.arrayOf(PropTypes.shape({
    todo: PropTypes.string.isRequired,
    istodo: PropTypes.bool.isRequired,
    doing: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return { indexhome: state.indexhome };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodos: (text) => {
      dispatch(AddTodo(text));
    },
    searchText: (text) => {
      dispatch(Search(text))
    },
    deleteTodo:(index)=>{
      dispatch(DeleteTodo(index))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
