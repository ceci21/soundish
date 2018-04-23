import React, { Component } from 'react';
import Mydium from './lib/mydium';
import styled from 'styled-components';
import Visualizer from './components/Visualizer.jsx';

const music = {
  cute: 'music/bensound-cute.mp3',
  energy: 'music/bensound-energy.mp3',
  summer: 'music/bensound-summer.mp3'
};

const Container = styled.div`
  font-size: 0;
  overflow: hidden;
  background-color: black;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  render() {
    return (
      <Container className="App">
        <Visualizer />
      </Container>
    );
  }
}

export default App;
