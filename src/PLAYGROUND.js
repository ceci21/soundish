const VALUES = 10;

const input_1 = document.getElementsByClassName('osc-1')[0];
const input_2 = document.getElementsByClassName('osc-2')[0];
const input_3 = document.getElementsByClassName('osc-3')[0];


const audioContext = new AudioContext();

const oscillator_1 = audioContext.createOscillator();
const oscillator_2 = audioContext.createOscillator();
const oscillator_3 = audioContext.createOscillator();

const lfo = audioContext.createOscillator();
const gain = audioContext.createGain();

oscillator_1.type.value = 'triangle';
oscillator_2.type.value = 'sawtooth';
oscillator_3.type.value = 'sine';

oscillator_1.frequency.value = 527.47;
oscillator_2.frequency.value = 704.09;
oscillator_3.frequency.value = 837.31;


gain.gain.value = 1.5;

oscillator_1.connect(gain);
oscillator_2.connect(gain);
oscillator_3.connect(gain);


gain.connect(audioContext.destination);

oscillator_1.start();
oscillator_2.start();
oscillator_3.start();


input_1.addEventListener('change', () => {
  const val = input_1.value / 100;
  oscillator_1.frequency.value = val * 1000;
  console.log(val);
});

input_2.addEventListener('change', () => {
  const val = input_2.value / 100;
  oscillator_2.frequency.value = val * 1000;
  console.log(val);  
});

input_3.addEventListener('change', () => {
  const val = input_3.value / 100;
  oscillator_3.frequency.value = val * 1000;
  console.log(val);  
});





////////////////

// oscillator_1.connect(oscillator_2.detune);

// oscillator_2.connect(audioContext.destination);

// oscillator_1.start();
// oscillator_2.start();

/////////

// lfo.frequency.value = 2.0;
// oscillator_1.frequency.value = 440.0;


// lfo.connect(gain.gain);
// oscillator_1.connect(gain);
// gain.connect(audioContext.destination);

// const waveArray = new Float32Array(VALUES);

// for (let i = 0; i < VALUES; i++) {
//   waveArray[i] = Math.random() * 1000;
// }

// oscillator_1.frequency.setValueCurveAtTime(waveArray, 1, 10);

// oscillator_1.start();
// lfo.start();

