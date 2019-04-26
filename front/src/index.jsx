import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app'

import store from './store'
import { onDimensionChange } from './reducers/dimensions'
import { setWindowDimensions } from './actions'
import App from './components/App'
import firebaseConfig from './constants/firebase-config'
import { registerAuthListener } from './reducers/login'

initializeApp(firebaseConfig)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/App', () => { render() })
}

onDimensionChange(dimensions => store.dispatch(setWindowDimensions(dimensions)))
registerAuthListener(store)
