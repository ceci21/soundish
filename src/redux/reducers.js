import {
  CHANGE_SONG,
  PLAY_PLAYER,
  STOP_PLAYER,
  PAUSE_PLAYER,
  MODIFY_MESSAGES,
  UPLOAD_AUDIO // TODO: This isn't being used yet...
} from './action_types';

// TODO: Move music into a database
const MUSIC = {
  cute: 'music/bensound-cute.mp3',
  energy: 'music/bensound-energy.mp3',
  summer: 'music/bensound-summer.mp3',
  bonkers: 'music/Dizzee Rascal  Armand Van Helden - Bonkers (Video).mp3'
};

// TODO: Remove randomly choosing songs
const musicKeysArr = Object.keys(MUSIC);
const randomSongIndex = Math.floor(musicKeysArr.length * Math.random());
const RANDOM_SONG = MUSIC[musicKeysArr[randomSongIndex]]; 


export const songReducer = (state = RANDOM_SONG, action) => { // TODO: Remove default music as a random one
  switch (action.type) {
    case (CHANGE_SONG): 
      return action.song;
    default: 
      return state; 
  };
};

// TODO: Possibly rename this to player status reducer...
export const statusReducer = (state = 'ON', action) => {
  switch (action.type) {
    case (PLAY_PLAYER):
      return 'ON';
    case (STOP_PLAYER):
      return 'OFF';
    case (PAUSE_PLAYER):
      return 'PAUSED';
    default:
      return state;
  };
};

// TODO: Should this default messages thing be here?
const DEFAULT_MESSAGES = {
  fileUploadStatus: '',
  fileRetrieveStatus: ''
};

export const messagesReducer = (state = DEFAULT_MESSAGES, action) => {
  // Create new object and pull message key and message off, then assign new object the message at that key.
  const { messageKey, message } = action;

  switch (action.type) {
    case (MODIFY_MESSAGES):
      // Do NOT add a new message key with message if it doesn't exist on default messages!!
      if (DEFAULT_MESSAGES.hasOwnProperty(messageKey)) {
        return Object.assign({ [messageKey]: message }, state)
      } else {
        console.error('That message is not valid!');
        return state;
      }
    default:
      return state;
  };
}

export const audioReducer = (state = {}, action) => {
  const { audioFiles } = action;

  switch (action.type){
    case (RECEIVE_AUDIO): 
      return audioFiles;
    default:
      return state;
  }
}
