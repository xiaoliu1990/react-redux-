import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import indexhome from "./reducers/index/index";
const createRootReducer = (history) => combineReducers({
  indexhome,
  router: connectRouter(history),
})
export default createRootReducer;