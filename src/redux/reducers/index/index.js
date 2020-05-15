import {
  ADD_TODO,
  SEARCH,
  DELETE_TODO
} from 'reduxs/actions/index/index';

let todos;
(() => {
  if (localStorage.todos) {
    todos = JSON.parse(localStorage.todos);
  } else {
    todos = [];
  }
})();
const indexhome = (state = todos, action) => {
  switch (action.type) {
    /*
     *  添加新的事项
     *  并进行本地化存储
     *  使用ES6展开运算符链接新事项和旧事项
     *  JSON.stringify进行对象深拷贝
     */
    case ADD_TODO:
      return [
        ...state, {
          todo: action.text,
          istodo: true,
          doing: false,
          done: false
        }
      ];
    /*
     * 搜索
     */
    case SEARCH:
      let text = action.text;
      let reg = eval("/" + text + "/gi");
      if (action.text) {
        return state.filter(item => item.todo.match(reg));
      } else {
        return todos;
      }
    /*
     * 删除某个事项
     */
    case DELETE_TODO:
      localStorage.setItem('todos', JSON.stringify([
        ...state.slice(0, action.index),
        ...state.slice(parseInt(action.index) + 1)
      ]));
      return [
        ...state.slice(0, action.index),
        ...state.slice(parseInt(action.index) + 1)
      ];
    default:
      return state;
  }
}
export default indexhome;
