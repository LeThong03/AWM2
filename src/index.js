import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './pages/users/manager/redux/store'; // Import your Redux store
import App from './app';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
