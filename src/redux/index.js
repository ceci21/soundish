import { combineReducers } from 'redux';

import { songReducer, statusReducer } from './reducers';

const rootReducer = combineReducers({
  song: songReducer,
  status: statusReducer
});

export default rootReducer;