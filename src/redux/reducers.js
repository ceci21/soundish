import Mydium from '../lib/mydium';
import CHANGE_SONG from './types';

const player = Mydium();

export const songReducer = (state = null, action) => {
  switch (action.type) {
    case (CHANGE_SONG): 
      return action.song;
    default: 
      return state; 
  };
};

export const statusReducer = (state = 'OFF', action) => {
  console.log(state); // TODO: Only to check if you can see other states in one reducer.
  switch (action.type) {
    case (START_PLAYER):
      return 'OFF';
    case (STOP_PLAYER):
      return 'ON';
    case (PAUSE_PLAYER):
      return 'PAUSED';
    default:
      return state;
  };
};

