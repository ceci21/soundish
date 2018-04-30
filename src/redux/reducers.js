import {
	CHANGE_AUDIO,
	PLAY_PLAYER,
	STOP_PLAYER,
	PAUSE_PLAYER,
	MODIFY_MESSAGES,
	RETRIEVE_AUDIO_NAMES,
  RETRIEVE_AUDIO_DATA,
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

export const currentAudioReducer = (state = {}, action) => {
	// TODO: Remove default music as a random one
	console.log(action.audioFile);
	switch (action.type) {
		case CHANGE_AUDIO:
			return action.audioFile;
		default:
			return state;
	}
};

// TODO: Possibly rename this to player status reducer...
export const statusReducer = (state = 'OFF', action) => {
	switch (action.type) {
		case PLAY_PLAYER:
			return 'ON';
		case STOP_PLAYER:
			return 'OFF';
		case PAUSE_PLAYER:
			return 'PAUSED';
		default:
			return state;
	}
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
		case MODIFY_MESSAGES:
			// Do NOT add a new message key with message if it doesn't exist on default messages!!
			if (DEFAULT_MESSAGES.hasOwnProperty(messageKey)) {
				return Object.assign({ [messageKey]: message }, state);
			} else {
				console.error('That message is not valid!');
				return state;
			}
		default:
			return state;
	}
};

export const audioFileNamesReducer = (state = [], action) => {
	const { payload } = action;

	switch (action.type) {
		case RETRIEVE_AUDIO_NAMES:
			return payload;
		default:
			return state;
	}
};

// TODO: Audio file data should be an array.
export const audioFileDataReducer = (state = [], action) => {
	// TODO: It might be good to actually have this state as an object and grab the keys and match the name of the audio data to the object... Idk?
	const { payload } = action;
	switch (action.type) {
    case RETRIEVE_AUDIO_DATA:
			// If the payload doesn't have the right properties for the audio data, then return the previous state.
			if (!payload.name || !payload.buffer) {
				// TODO: Do something about this error somehow
				console.error('Payload does not have proper data. Returning current state.');
				return state; 
			}

			// Check if the audio name already exists.			
			for (let i = 0; i < state.length; i++) {
				if (payload.name === state[i].name) {
					return state;
				}
			}

			// Create new data object.
			let incomingData = null;
			let audioFileData = state.slice();
			incomingData = {
				name: payload.name,
				buffer: payload.buffer.slice()
			};
			
			// Push data onto new state.
			audioFileData.push(incomingData);
			
      return audioFileData;
    default:
      return state;
	}
};
