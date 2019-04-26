import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import dimensions from './reducers/dimensions'
import login from './reducers/login'

const store = createStore(combineReducers({
  dimensions,
  login,
}), composeWithDevTools())

export default store
