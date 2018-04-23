// const mediaConstraints = {
//   audio: true,
//   video: false
// };

// let audioContext;

const song1 = './music/bensound-cute.mp3';

// window.navigator.mediaDevices.getUserMedia(mediaConstraints)
//   .then((stream) => {
//     audioContext = new AudioContext(stream);
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .then(() => {
//     play(song);
//   });

// const getAudioBuffer = function (url, callback) {
//   const request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer';

//   request.onload = function () {
//     audioContext.decodeAudioData(request.response, (buffer) => {
//       callback(buffer);
//     });
//   }
//   request.send();
// };

// const play = function (url) {
//   getAudioBuffer(url, (buffer) => {
//     const source = audioContext.createBufferSource();
//     source.buffer = buffer;

//     const analyserNode = audioContext.createAnalyser();

//     const analyserNode = new AnalyserNode(audioContext, {
//       fftSize: 64,
//       minDecibels: -64,
//       maxDecibels: -20,
//       smoothingTimeConstant: 0.5
//     });

//     source.connect(analyserNode);
//     analyserNode.connect(audioContext.destination);           
//     source.start();
     
//     setInterval(() => {
//       const dataArray = new Float32Array(analyserNode.frequencyBinCount);    
//       analyserNode.getFloatFrequencyData(dataArray);
//     }, 500);
//   });
// };

export default class Mydium {
  constructor(song = '', callback, options) {
    this._song = song
    this._audioContext;
    this._audioFrequencyData = [];
    this._currentInterval = null;
    this._songChanged = true;
    this._analyser = null;
    this._samples = 0;

    const navigator = window.navigator;   
    const mediaConstraints = {
      audio: true,
      video: false
    }; 
    
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then((stream) => {
      this._audioContext = new AudioContext(stream);
      this._source = this._audioContext.createBufferSource();   
      // this._getAudioBuffer(song, (buffer) => {
      //   console.log('hi there!!!');
      //   this._source.buffer = buffer;
      //   this._source.start();
      // });
      this.play(song, callback)
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
    this._song = song;
    this._songChanged = true;
  }

  stop = () => {
    clearInterval(this._currentInterval);
    this._audioContext.suspend();
  }

  play = (url, onDataChangeCallback) => {
    if (this._songChanged) {
      this._getAudioBuffer(url, (buffer) => {
        if (this._analyser) {
          this._source.disconnect();
        }

        this._source.buffer = buffer;
        
        const analyserNode = new AnalyserNode(this._audioContext, {
          fftSize: 32,
          minDecibels: -64,
          maxDecibels: -20,
          smoothingTimeConstant: 0.5
        });
        
        this._source.connect(analyserNode);
        analyserNode.connect(this._audioContext.destination);           
        this._source.start();

        this._currentInterval = setInterval(() => {
          const dataArray = new Float32Array(analyserNode.frequencyBinCount);    
          analyserNode.getFloatFrequencyData(dataArray);
          this._audioFrequencyData = Array.from(dataArray);
          if (onDataChangeCallback) onDataChangeCallback(this._audioFrequencyData);
        }, 100);

        this._samples = analyserNode.frequencyBinCount;
        this._analyser = analyserNode;
        this._songChanged = false;
      });
    } else {
      this._audioContext.resume();
    }
  }

  getCurrentData = () => {
    return this._audioFrequencyData;
  }
}