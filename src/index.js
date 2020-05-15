import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './rem';
import 'style/css/init.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';
import reducers from "./redux/reducers";
//生成store对象、内部会第一次调用reducer函数，得到初始state，异步模式
let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root'));

//如果希望应用脱机工作并更快加载，可以将下面的
//unregister()更改为register()。注意，这会带来一些陷阱。
//了解有关服务工作的更多信息：https://bit.ly/CRA-PWA
serviceWorker.unregister();
