/*
 * action 类型
 */
export const ADD_TODO = 'Add_Todo';
export const SEARCH = 'Search';
export const DELETE_TODO = 'Delete_Todo';
/*
 * action 创建函数
 * @method  AddTodo添加新事项
 * @param  {String} text 添加事项的内容
 */
const AddTodo = (text) => {
	return (dispatch, getState) => {
		// 测试异步流
		const state = getState();
		localStorage.setItem('todos',
			JSON.stringify([
				...state.indexhome, {
					todo: text,
					istodo: true,
					doing: false,
					done: false
				}
			])
		);
		setTimeout(() => {
			dispatch({
				type: ADD_TODO,
				text,
			});
		}, 2);
	};
};
/*
 * @method  Search 查找事项
 * @param  {String} text 查找事项的内容
 */
const Search = (text) => {
	return {
		type: SEARCH,
		text,
	};
}

/*
 * @method  DeleteTodo 删除事项
 * @param  {Number} index 需要删除的事项的下标
 */
const DeleteTodo  = (index) => {
	return {
		type: DELETE_TODO,
		index,
	};
}

export { AddTodo, Search, DeleteTodo };
