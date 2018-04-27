import { combineReducers } from 'redux';

// Importing reducers..
import { 
  songReducer, 
  statusReducer, 
  messagesReducer,
  audioFilesReducer
} from './reducers';

const rootReducer = combineReducers({
  song: songReducer,
  status: statusReducer,
  messages: messagesReducer,
  audioFiles: audioFilesReducer
});

export default rootReducer;