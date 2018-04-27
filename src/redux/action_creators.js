import axios from 'axios';

import { SERVER_URL } from '../CONSTANTS';

// ACTION TYPES
import {
  CHANGE_SONG,
  PLAY_PLAYER,
  STOP_PLAYER,
  PAUSE_PLAYER,
  UPLOAD_AUDIO, // TODO: Not being used
  MODIFY_MESSAGES
} from './action_types';

// PLAYER ACTION CREATORS
const player = {};

player.changeSong = (song) => {
  if (!song) {
    console.log('No song provided.');
  } else {
    return {
      type: CHANGE_SONG,
      song
    };
  }
};

player.play = () => {
  return {
    type: PLAY_PLAYER
  };
};

player.stop = () => {
  return {
    type: STOP_PLAYER
  };
};

player.pause = () => {
  return {
    type: PAUSE_PLAYER 
  };
};



// FILE ACTION CREATORS
const file = {};

file.uploadAudio = (files /*, callback */) => { // TODO: Do I need a callback?
  const endpoint = '/audio/upload';

  return (dispatch) => {
    axios.post(`${SERVER_URL}${endpoint}`, files)
    .then((res = '') => {
      console.log('Upload was successful.'); // TODO: Remove later
      dispatch({
        type: MODIFY_MESSAGES,
        messageKey: 'fileUploadStatus',
        message: 'Upload successful!'
      });
     })
    .catch((err = '') => {
      console.error(err, 'upload was not successful'); // TODO: Remove later
      dispatch({
        type: MODIFY_MESSAGES,
        messageKey: 'fileUploadStatus',
        message: 'Upload was not successful.'
      })
    });
  }
};

export default {
  player,
  file
};