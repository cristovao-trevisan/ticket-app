import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import dimensions from './reducers/dimensions';

const store = createStore(combineReducers({
  dimensions,
}), composeWithDevTools());

export default store;
