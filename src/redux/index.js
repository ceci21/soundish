import { combineReducers } from 'redux';

// Importing reducers..
import { 
  currentAudioReducer, 
  statusReducer, 
  messagesReducer,
  audioFileNamesReducer,
  audioFileDataReducer
} from './reducers';

const rootReducer = combineReducers({
  currentAudio: currentAudioReducer,
  status: statusReducer,
  messages: messagesReducer,
  audioFileNames: audioFileNamesReducer,
  audioFileData: audioFileDataReducer
});

export default rootReducer;