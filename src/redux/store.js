import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import createRootReducer from './reducers';
export const history = createHashHistory();
export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), 
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        routerMiddleware(history), 
      ),
    ),
  );
  return store;
};