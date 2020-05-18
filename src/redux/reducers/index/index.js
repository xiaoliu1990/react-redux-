import {SELECT_LIST, ADD_UA } from 'reduxs/actionTypes/index/index';
const defaultState = {
  dataList:[]
}
const indexhome = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_LIST:
      return {
        ...state,
        dataList:action.dataList,
        isUa:action.isUa
      }
    /*
     *  添加新的事项
     *  并进行本地化存储
     *  使用ES6展开运算符链接新事项和旧事项
     *  JSON.stringify进行对象深拷贝
     */
    case ADD_UA:
      console.log(state)
      return {...state};
    default:
      return state;
  }
}
export default indexhome;
