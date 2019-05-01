import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducers as resourceReducers, applyResourceToStore } from '@async-resource/redux'

import './resources/resources'
import dimensions from './reducers/dimensions'
import login from './reducers/login'
import sidebarOpen from './reducers/sidebar-open'
import search from './reducers/search'

const store = createStore(combineReducers({
  ...resourceReducers,
  dimensions,
  login,
  sidebarOpen,
  search,
}), composeWithDevTools())

applyResourceToStore(store)

export default store
