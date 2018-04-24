// ACTION TYPES
import {
  CHANGE_SONG,
  START_PLAYER,
  STOP_PLAYER,
  PAUSE_PLAYER
} from './action_types';

// PLAYER ACTION CREATORS
export const player = {};

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

player.start = () => {
  return {
    type: START_PLAYER
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