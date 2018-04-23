import React, { Component } from 'react';
import Mydium from '../lib/mydium';
import styled from 'styled-components';

const music = {
  cute: 'music/bensound-cute.mp3',
  energy: 'music/bensound-energy.mp3',
  summer: 'music/bensound-summer.mp3'
};

const Bar = styled.span`
  height: ${ (props) => props.height }px;
  min-width: 100px;
  background: hsl(${(props) => props.hue}, 100%, 50%);
  color: white;
  position: absolute;
`;

const Graph = styled.div`
  overflow: hidden;
  min-width: 100vw;
  min-height: 500px;
  display: grid;
  grid-template-columns: ${(props) => {
    const columns = props.columns;
    let str = '';
    for (let i = 0; i < columns; i++) {
      if (i === columns - 1) {
        str += '1fr'
      } else {
        str += '1fr ';
      }
    }
    return str;
  }};
  background-color: black;
`;

const modifySlope = function(t) {
  return t * t;
}


class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.mydium;
  }

  callback = (data) => {
    if (data) {
      this.setState({ data: data.slice() });
    }
  }

  componentDidMount() {
    const song = music['summer'];
    this.mydium = new Mydium(song, this.callback);
  }

  createBarGraph = () => {
    let data, length, windowHeight;
    
    if (this.state.data) {
      data = this.state.data;
      length = data.length;
      windowHeight = window.innerHeight;
      return (
        <Graph columns={length}>
          {
            data.map((fr, i) => {
              let height = (fr / 256) * windowHeight;
              // let height = (fr * 0.5 * i) / 256 * windowHeight;
              return (
                <div key={i}>
                  <Bar height={height} hue={fr}>
                  </Bar>
                </div>
              );
            })
          }
        </Graph>
      );
    } else {
      return <div>Loading...</div>
    }
  }

  render() {
    return (
      <div className="Visualizer">
        {/* <button className="start-button" onClick={() => {
          this.mydium.play();
        }}>Start!</button>
        <button className="stop-button" onClick={() => {
          this.mydium.stop();
        }}>Stop!</button> */}
        <div className="graph">
        { this.createBarGraph() }
        </div>
      </div>
    );
  }
}

export default Visualizer;
