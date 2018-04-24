import { combineReducers } from 'react-redux';

import { songReducer, statusReducer } from './reducers';

export default rootReducer = combineReducers ({
  player: playerReducer,
  status: statusReducer
});