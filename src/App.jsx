import React, { Component } from 'react';
import { AppContainer as Container } from './components/styled_components/components.jsx';
import RainbowSteps from './components/RainbowSteps.jsx';
import AudioPlayer from './containers/AudioPlayer.jsx';

// TODO: Remove once you have a better way to grab music.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Visualizer: (props) => <RainbowSteps {...props} />
    };
  }

  render() {
    return (
      <Container>
        <AudioPlayer  
          Visualizer={(props) => <this.state.Visualizer {...props} />} />
      </Container>
    );
  }
};

export default App;
