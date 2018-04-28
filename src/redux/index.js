import { combineReducers } from 'redux';

// Importing reducers..
import { 
  songReducer, 
  statusReducer, 
  messagesReducer,
  audioFileNamesReducer,
  audioFileDataReducer
} from './reducers';

const rootReducer = combineReducers({
  song: songReducer,
  status: statusReducer,
  messages: messagesReducer,
  audioFileNames: audioFileNamesReducer,
  audioFileData: audioFileDataReducer
});

export default rootReducer;