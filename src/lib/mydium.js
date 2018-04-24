// Ceci: A little audio library to interface over default audio API to make my life easier!!

const defaultOptions = {
  autoplay: true
};

export default class Mydium {
  constructor(song = '', callback, options = defaultOptions) {
    /*
      Options format:
      {
        autoplay: true 
      }
    */

    this._song = song;
    this._audioContext = null;
    this._audioFrequencyData = [];
    this._currentInterval = null;
    this._songChanged = true;
    this._analyser = null;

    const navigator = window.navigator;   
    const mediaConstraints = {
      audio: true,
      video: false
    }; 
    
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then((stream) => {
      // Get audio context and create initial source.
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
      if (callback) callback();      
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
    this._song = song;
    this._songChanged = true;
  }

  stop = () => {
    // Clear the interval that is giving back the frequency data b/c we don't need it anymore and it doesn't need to go through the callback again
    // ...and then stop the audio.
    clearInterval(this._currentInterval);
    this._audioContext.suspend();
  }

  play = (url, onDataChangeCallback) => {
    // If no callback is provided, warn user about it.
    if (!onDataChangeCallback) {
      console.warn('No callback is provided to play.')
    }

    // If a url is provided, play that instead.
    if (url) {
      this._songChanged = true;
      this._song = url;
    }

    if (this._songChanged) {

      // If the song has changed, then we will need to get the new audio buffer!
      this._getAudioBuffer(this._song, (buffer) => {

        // If there is already an analyser, disconnect it because it needs to be changed!
        if (this._analyser) {
          this._source.disconnect();
        }

        // Reset the buffer that you retrieved since the data has come back from getting the new audio's buffer
        this._source.buffer = buffer;
        
        // Create a new analyser node.
        const analyserNode = new AnalyserNode(this._audioContext, {
          fftSize: 64,
          minDecibels: -64,
          maxDecibels: -20,
          smoothingTimeConstant: 0.5
        });

        // This starts the audio.
        this._source.start();

        // This feeds the audio through the analyser node.
        this._source.connect(analyserNode);

        // This feeds the audio from the source to the speakers.
        this._source.connect(this._audioContext.destination);

        // As the music changes, update the frequency array.
        this._currentInterval = setInterval(() => {

          // Create data array and populate it with frequency data.
          const dataArray = new Uint8Array(analyserNode.frequencyBinCount);    
          analyserNode.getByteFrequencyData(dataArray);
          this._audioFrequencyData = dataArray;

          // If there is a callback, send back the frequency data, ---but as a copy---.
          if (onDataChangeCallback) {
            onDataChangeCallback(this._audioFrequencyData.slice());
          }
        }, 100);

        // Set the analyser and whether or not the song has been changed.
        this._analyser = analyserNode;
        this._songChanged = false;
      });
    } else {
      // Otherwise if song has NOT changed, simply resume where you started off.
      this._audioContext.resume();
    }
  }

  getCurrentFrequencyData = () => {
    // Send back a copy of the audio frequency data.
    return this._audioFrequencyData.slice();
  }
}