// TODO: Remove playground
import './PLAYGROUND';

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux and associated middleware
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/index';
import reduxThunk from 'redux-thunk';


// Components
import App from './App.jsx';

// Style
import './style.css';

// Creating store for redux.
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
