import { SELECT_LIST, ADD_UA } from 'reduxs/actionTypes/index/index';
import {push} from 'react-router-redux';
import { Toast } from 'antd-mobile';
import { http } from 'common/httpAjax';
const SelectList = () => {
	return (dispatch, getState) => {
		// 测试异步流，异步请求统一写这里
		const state = getState();
		let params = {};
		let success = (res) => {
			if (res.code === 0) {
				let data = res.data;
				if (data) {
					dispatch({
						type: SELECT_LIST,
						dataList:data.dataList,
						isUa:true
					});
				}
			} else {
				Toast.info(res.message, 2);
			}
		}
		let fail = (code, message) => {
			console.log(message)
		}
		http('get', 'h5/listLatest?itemTypes=SP,HW,WHR,BP,BG,UA', params, success, fail);
	};
};

/*
 * action 创建函数
 * @method  AddUa添加新事项
 * @param  {String} dataFrom 提交表单对象
 * getState()-获取state对象
 * dispatch(action)-当从UI上改变某个状态的时候，需要dispatch一个action
 * subscribe(listener)-通知UI,做出对应的改变
 */
const AddUa = (dataFrom) => {
	return (dispatch, getState) => {
		// 测试异步流，异步请求统一写这里
		const state = getState();
		let params = dataFrom;
		let success = (res) => {
			if (res.code === 0) {
				Toast.info('保存成功', 2,function(){
					dispatch(push('/')); 
					dispatch({
						type: ADD_UA,
						dataList:state.indexhome.dataList,
						isUa:state.indexhome.isUa
					});
        });
			} else {
				Toast.info(res.message, 2);
			}
		}
		let fail = (code, message) => {
			console.log(message)
		}
		http('get', 'h5/listLatest?itemTypes=SP,HW,WHR,BP,BG,UA', params, success, fail);
		//http('post', 'h5/saveData', params, success, fail);
	};
};


export { SelectList, AddUa };
