import { combineReducers } from 'redux';

// Importing reducers..
import { 
  songReducer, 
  statusReducer, 
  messageReducer 
} from './reducers';

const rootReducer = combineReducers({
  song: songReducer,
  status: statusReducer,
  messages: messagesReducer
});

export default rootReducer;