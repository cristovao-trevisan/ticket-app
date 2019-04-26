import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import dimensions from './reducers/dimensions'
import login from './reducers/login'
import sidebarOpen from './reducers/sidebar-open'

const store = createStore(combineReducers({
  dimensions,
  login,
  sidebarOpen,
}), composeWithDevTools())

export default store
