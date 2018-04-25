// ACTION TYPES
import {
  CHANGE_SONG,
  PLAY_PLAYER,
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