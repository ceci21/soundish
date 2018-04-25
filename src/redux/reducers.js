import {
  CHANGE_SONG,
  PLAY_PLAYER,
  STOP_PLAYER,
  PAUSE_PLAYER
} from './action_types';

const MUSIC = {
  cute: 'music/bensound-cute.mp3',
  energy: 'music/bensound-energy.mp3',
  summer: 'music/bensound-summer.mp3'
};


export const songReducer = (state = MUSIC.cute, action) => {
  switch (action.type) {
    case (CHANGE_SONG): 
      return action.song;
    default: 
      return state; 
  };
};

export const statusReducer = (state = 'ON', action) => {
  console.log(state); // TODO: Only to check if you can see other states in one reducer.
  switch (action.type) {
    case (PLAY_PLAYER):
      return 'ON';
    case (STOP_PLAYER):
      return 'OFF';
    case (PAUSE_PLAYER):
      return 'PAUSED';
    default:
      return state;
  };3.
};

