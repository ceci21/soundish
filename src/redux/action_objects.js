// ACTION TYPES
import {
  CHANGE_SONG,
  PLAY_PLAYER,
  STOP_PLAYER,
  PAUSE_PLAYER,
  UPLOAD_AUDIO, // TODO: Not being used
  MODIFY_MESSAGES,
  RETRIEVE_AUDIO_NAMES,
  RETRIEVE_AUDIO_DATA
} from './action_types';

// TODO: How do I organize this stuff??
// TODO: DRY

// Action objects for player
export const changePlayerSongAction = (song) => {
  return {
    type: CHANGE_SONG,
    song
  };
};

export const playPlayerAction = () => {
  return {
    type: PLAY_PLAYER
  };
};

export const stopPlayerAction = () => {
  return {
    type: STOP_PLAYER
  };
};

export const pausePlayerAction = () => {
  return {
    type: PAUSE_PLAYER
  };
};




// Action objects for file.uploadAudio
export const uploadAudioSuccessMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileUploadStatus',
    message: 'Upload successful!'
  };
};

export const uploadAudioFailureMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Error uploading audio.'
  };
};





// Action objects for file.retrieveServerAudio
export const retrieveServerAudioNamesSuccessMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Audio received!'
  };
};

export const retrieveServerAudioNamesSuccessLoadAction = (audioFileNames) => {
  return {
    type: RETRIEVE_AUDIO_NAMES,
    payload: audioFileNames
  };
};

export const retrieveServerAudioNamesFailureMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Error receiving audio.'
  };
};

export const retrieveServerAudioDataSuccessLoadAction = (data) => {
  console.log('???', data);
  return {
    type: RETRIEVE_AUDIO_DATA,
    payload: data
  };
};

export const retrieveServerAudioDataSuccessMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Successfully received audio data!'
  };
};

export const retrieveServerAudioDataFailureMessageAction = () => {
  return {
    type: MODIFY_MESSAGES,
    messageKey: 'fileRetrieveStatus',
    message: 'Failure in receiving audio data.'
  };
}