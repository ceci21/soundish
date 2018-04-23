import React, { Component } from 'react';
import Mydium from './lib/mydium';
import styled from 'styled-components';

const music = {
  cute: 'music/bensound-cute.mp3',
  energy: 'music/bensound-energy.mp3',
  summer: 'music/bensound-summer.mp3'
};

const Bar = styled.span`
  height: ${ (props) => -props.height }px;
  border: 5px solid black;
  min-width: 10px;
  background-color: black;
  color: white;
  position: absolute;
`;

const Graph = styled.div`
  min-width: 500px;
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
  grid-gap: 10px;
  background-color: lightblue;
`;

// const BarStyle = (height) => {
//   return {
//     height: `${height}`,
//     border: '5px solid black',
//     minWidth: '10px',
//     backgroundColor: 'black',
//     color: 'white',
//     position: 'absolute'
//   }
// };

// const GraphStyle = (columns) => {
//   return {
//     minWidth: '500px',
//     minHeight: '500px',
//     display: 'grid',
//     gridTemplateColumns: (columns) => {
//       let str = '';
//       for (let i = 0; i < columns; i++) {
//         if (i === columns - 1) {
//           str += '1fr'
//         } else {
//           str += '1fr ';
//         }
//       }
//       return str;
//     },
//     gridGap: '10px',
//     backgroundColor: 'lightblue'
//   };
// };

class App extends Component {
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
    const song = music['energy'];
    this.mydium = new Mydium(song, this.callback);
  }

  createBarGraph = () => {
    let data, length;
    
    if (this.state.data) {
      data = this.state.data;
      length = data.length;
      // return (
      //   <div style={GraphStyle(length)}>
      //     {
      //       data.map((fr, i) => {
      //         const height = -Math.floor(fr / 10) * 20;
      //         return (
      //           <div key={i}>
      //             <div style={BarStyle(height)}>
      //             </div>
      //           </div>
      //         );
      //       })
      //     }
      //   </div>
      // );
      return (
        <Graph columns={length}>
          {
            data.map((fr, i) => {
              const height = -Math.floor(fr / 10) * 70;
              return (
                <div key={i}>
                  <Bar height={fr * 3}>
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
      <div className="App">
        <button className="start-button" onClick={() => {
          this.mydium.play();
        }}>Start!</button>
        <button className="stop-button" onClick={() => {
          this.mydium.stop();
        }}>Stop!</button>
        <div className="graph">
        { this.createBarGraph() }
        </div>
      </div>
    );
  }
}

export default App;
