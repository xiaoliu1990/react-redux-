import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import './rem';
import 'style/css/init.css';
import * as serviceWorker from './serviceWorker';

//引入redux
import { Provider } from 'react-redux';
import configureStore, { history } from './redux/store';
const store = configureStore(); //提供初始状态（如有）

ReactDOM.render(
  <Provider store = { store }>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

//如果希望应用脱机工作并更快加载，可以将下面的
//unregister()更改为register()。注意，这会带来一些陷阱。
//了解有关服务工作的更多信息：https://bit.ly/CRA-PWA
serviceWorker.unregister();
