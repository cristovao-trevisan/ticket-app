import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducers as resourceReducers, applyResourceToStore } from '@async-resource/redux'
import thunk from 'redux-thunk'

import './resources/resources'
import sidebarOpen from './reducers/sidebar-open'
import dimensions from './reducers/dimensions'
import search from './reducers/search'
import login from './reducers/login'
import cart from './reducers/cart'

const store = createStore(combineReducers({
  ...resourceReducers,
  sidebarOpen,
  dimensions,
  search,
  login,
  cart,
}), composeWithDevTools(applyMiddleware(thunk)))

applyResourceToStore(store)

export default store
