// ACTION TYPES
import {
  CHANGE_SONG,
  PLAY_PLAYER,
  STOP_PLAYER,
  PAUSE_PLAYER,
  UPLOAD_AUDIO, // TODO: Not being used
  MODIFY_MESSAGES,
  RETRIEVE_AUDIO
} from './action_types';

// TODO: How do I organize this stuff??

// Action objects for player
const changePlayerSongAction = (song) => {
  return {
    type: CHANGE_SONG,
    song
  };
};

const playPlayerAction = () => {
  return {
    type: PLAY_PLAYER
  };
};

const stopPlayerAction = () => {
  return {
    type: STOP_PLAYER
  };
};

const pausePlayerAction = () => {
  return {
    type: PAUSE_PLAYER
  };
};




// Action objects for file.uploadAudio
const uploadAudioSuccessMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileUploadStatus',
    message: 'Upload successful!'
  };
};

const uploadAudioFailureMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Error uploading audio.'
  };
};





// Action objects for file.retrieveServerAudio
const retrieveServerAudioSuccessMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Audio received!'
  };
};

const retrieveServerAudioSuccessLoadAction = (audioFiles) => {
  return {
    type: RETRIEVE_AUDIO,
    audioFiles: audioFiles
  };
};

const retrieveServerAudioFailureMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Error receiving audio.'
  };
};