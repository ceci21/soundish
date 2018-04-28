import axios from 'axios';

import { SERVER_URL } from '../CONSTANTS';

// TODO: Do something about these action objects!!!
import {
  changePlayerSongAction,
  playPlayerAction,
  stopPlayerAction,
  pausePlayerAction,
  uploadAudioSuccessMessageAction,
  uploadAudioFailureMessageAction,
  retrieveServerAudioNamesSuccessMessageAction,
  retrieveServerAudioNamesSuccessLoadAction,
  retrieveServerAudioNamesFailureMessageAction,
  retrieveServerAudioDataSuccessLoadAction,
  retrieveServerAudioDataSuccessMessageAction,
  retrieveServerAudioDataFailureMessageAction
} from './action_objects';

// PLAYER ACTION CREATORS
const player = {};

player.changeSong = (song) => {
  if (!song) {
    console.log('No song provided.');
  } else {
    return changePlayerSongAction();
  }
};

player.play = () => playPlayerAction();

player.stop = () => stopPlayerAction();

player.pause = () => pausePlayerAction();



// FILE ACTION CREATORS
const file = {};

file.uploadAudio = (files, callback) => { // TODO: Do I need a callback?
  const endpoint = '/audio/upload';

  return (dispatch) => {
    axios.post(`${SERVER_URL}${endpoint}`, files)
    .then((res) => {
      console.log('Upload was successful.'); // TODO: Remove later
      dispatch(uploadAudioSuccessMessageAction());
      if (callback) callback();
     })
    .catch((err = '') => {
      console.error(err, 'upload was not successful'); // TODO: Remove later
      dispatch(uploadAudioFailureMessageAction());
    });
  };
};

file.retrieveServerAudioNames = (callback) => {
  console.log('retrieving server audio...');

  const endpoint = '/audio';

  return (dispatch) => {
    axios.get(`${SERVER_URL}${endpoint}`)
    .then(({ data }) => {
      dispatch(retrieveServerAudioNamesSuccessMessageAction());
      dispatch(retrieveServerAudioNamesSuccessLoadAction(data));
      if (callback) callback();
    })
    .catch((err = 'audio cannot be found') => {
      console.error(err);
      dispatch(retrieveServerAudioNamesFailureMessageAction());
    });
  };
};

file.retrieveServerAudioData = (songName) => {
  const endpoint = '/audio/';
  return (dispatch) => {
    axios.get(`${SERVER_URL}${endpoint}${songName}`)
    .then(({ data }) => {
      const audioBuffer = new Buffer.from(data, 'base64').buffer;
      console.log('data here!!!', audioBuffer);
      const audioData = {
        name: songName,
        buffer: audioBuffer
      };
      let thing = retrieveServerAudioDataSuccessLoadAction(audioData);
      console.log(thing);
      dispatch(retrieveServerAudioDataSuccessLoadAction(audioData));
      dispatch(retrieveServerAudioDataSuccessMessageAction());
    })
    .catch((err) => {
      console.error(err);
      console.log('GRRRRRRR');
      // dispatch(retrieveServerAudioDataFailureMessageAction());
    });
  };
};

export default {
  player,
  file
};