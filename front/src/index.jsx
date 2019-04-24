import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import { onDimensionChange } from './reducers/dimensions';
import { setWindowDimensions } from './actions';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./App', () => { render(); });
}

onDimensionChange(dimensions => store.dispatch(setWindowDimensions(dimensions)));
