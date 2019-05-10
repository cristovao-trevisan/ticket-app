import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app'
import ButterToast, { POS_BOTTOM, POS_CENTER } from 'butter-toast'

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
      <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_CENTER }} />
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
