import React, { Component } from 'react';

// Components
import RainbowSteps from './components/RainbowSteps.jsx';
import { AppContainer as Container } from './components/styled_components/components.jsx';

// TODO: Remove once you have a better way to grab music.
const MUSIC = {
  cute: 'music/bensound-cute.mp3',
  energy: 'music/bensound-energy.mp3',
  summer: 'music/bensound-summer.mp3'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      song: MUSIC.energy
    };
  }

  render() {
    let song = this.state.song;
    return (
      <Container className="App">
        <RainbowSteps song={song} />
      </Container>
    );
  }
}

export default App;
