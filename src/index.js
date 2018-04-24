// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/index';

// Components
import App from './App.jsx';

// Style
import './style.css';

// Creating store for redux.
const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
