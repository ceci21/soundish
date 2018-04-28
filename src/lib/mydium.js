// Ceci: A little audio library to interface over default audio API to make my life easier!!

const defaultOptions = {
  autoplay: false
};

export default class Mydium {
  constructor(song = '', callback, options = defaultOptions) {
    /*
      Options format:
      {
        autoplay: true 
      }
    */

    this._audioData = song;
    this._audioContext = null;
    this._audioFrequencyData = [];
    this._currentInterval = null;
    this._analyserNode = null;
    this._isPlaying = false;
    this._needToRestart = true;
    this._paused = false;
    this._stream = null;

    const navigator = window.navigator;   
    const mediaConstraints = {
      audio: true,
      video: false
    }; 
    
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then((stream) => {
      // Get audio context and create initial source.
      this._stream = stream;      
      this._audioContext = new AudioContext(stream);
      this._source = this._audioContext.createBufferSource();
    
      // Options set if song autoplays.
      // TODO: Remove console.log()s
      if (!song) {
        console.log('No song specified.');
      } else if (options.autoplay && song) {
        console.log('Autoplaying song', song); 
        this.play(song, callback); 
      } else {
        console.log('Not autoplaying a song.');
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      console.log('Song is playing!');
    })
    .catch((err = 'Error unspecified') => {
      console.error(err);
    });
  }

  _getAudioBuffer = (url, callback) => {
    // Will have to create a request for the audio @ the specified url and then get it back from the callback.
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this._audioContext.decodeAudioData(request.response, (buffer) => {
        callback(buffer);
      });
    }
    request.send();
  }

  setSong = (song) => {
    // Stop the audio, and set the song and set whether or not it has been changed.
    this.stop();
    this._audioData = song;
    this._needToRestart = true;
  }

  pause = (callback) => {
    clearInterval(this._currentInterval);

    this._audioContext.suspend();
    this._isPlaying = false;
    this._needToRestart = false; 
    this._paused = true;
    
    if (callback) {
      callback();
    }
  }

  stop = (callback) => {
    if (!this._isPlaying && !this._paused) {
      return console.warn('Player has already stopped.');
    }
    // Clear the interval that is giving back the frequency data b/c we don't need it anymore and it doesn't need to go through the callback again
    // ...and then stop the audio.
    clearInterval(this._currentInterval);

    this._audioContext.suspend();
    this._isPlaying = false;
    this._needToRestart = true; 
    this._paused = false;

    if (callback) {
      callback();
    }
  }

  _load = (callback) => {
    // This feeds the audio from the source to the speakers.
    // this._source.connect(this._audioContext.destination); // TODO: Put this back when you want the music to play!!
    this._audioContext = new AudioContext(this._stream);          
    this._source.disconnect();
    this._source = this._audioContext.createBufferSource();
    console.log(this._audioData);
    if (!this._audioData.buffer) {
      this._getAudioBuffer(this._audioData.name, (buffer) => {
        // Reset the buffer that you retrieved since the data has come back from getting the new audio's buffer
        this._source.buffer = buffer;
        // Callback to indicate that song has loaded
        callback();
      });
    } else {
      this._audioContext.decodeAudioData(this._audioData.buffer, (audioBuffer) => {
        this._source.buffer = audioBuffer;
        callback();
      });

    } 
  }

  play = (audioData, onDataChangeCallback) => {
    /*
      audioData object looks like this:
      { 
        name: 'string',
        buffer: Uint8Array
      }
    */
  
    // Prevents form replaying if song is the same
    if (this._isPlaying && this._audioData.name === audioData.name) {
      return console.error('song is the same');
    } 

    // If no callback is provided, warn user about it.
    if (!onDataChangeCallback) {
      console.warn('No callback is provided to play.')
    }

    // // Decide if you need to get a new buffer
    // if (this._paused && audioData.buffer) {
    //   // audioData is going to be ignored here // TODO: why did I make this choice??
    //   console.warn('because it is paused, we are ignoring the audioData');
    // } 
    console.log(audioData);
    if (!this._paused && audioData.buffer) {
      // If not paused and audioData with buffer is provided, restart.            
      this._needToRestart = true;
      this._audioData = Object.assign({}, audioData);
    }

    if (this._needToRestart) {
      this._load(() => {
        console.log('song loaded!');

        // Create a new analyserNode node.    
        this._analyserNode = new AnalyserNode(this._audioContext, {
          fftSize: 64,
          minDecibels: -64,
          maxDecibels: -20,
          smoothingTimeConstant: 0.5
        });

      // This feeds the audio through the analyser node.
        this._source.connect(this._analyserNode);

        this._source.connect(this._audioContext.destination);

        // As the music changes, update the frequency array.
        this._currentInterval = setInterval(this._setAudioFrequencyData.bind(this, onDataChangeCallback), 100);
      
        this._source.start();
        this._needToRestart = false;
        this._isPlaying = true;
        this._paused = false;
      });
    } else {
      // Otherwise if song has NOT changed, simply resume where you started off.
      this._currentInterval = setInterval(this._setAudioFrequencyData.bind(this, onDataChangeCallback), 100);
      this._audioContext.resume();
      this._isPlaying = true;
      this._needToRestart = false;
      this._paused = false;
    }
  }

  _setAudioFrequencyData = (callback) => {
    if (this._analyserNode) {
      // Create data array and populate it with frequency data.
      const dataArray = new Uint8Array(this._analyserNode.frequencyBinCount);    
      this._analyserNode.getByteFrequencyData(dataArray);
      this._audioFrequencyData = dataArray;
      
      // If there is a callback, send back the frequency data, ---but as a copy---.
      if (callback) {
        callback(this._audioFrequencyData.slice());
      }
    } else {
      console.warn('No analyser to be found');
    }
  }

  getCurrentFrequencyData = () => {
    // Send back a copy of the audio frequency data.
    return this._audioFrequencyData.slice();
  }

  isPlaying = () => {
    return this._isPlaying;
  }

}