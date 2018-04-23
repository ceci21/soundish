import React, { Component } from 'react';

const music = {
  cute: 'music/bensound-cute.mp3',
  energy: 'music/bensound-energy.mp3',
  summer: 'music/bensound-summer.mp3'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSong: music.cute
    };
  }

  selectSong(songSource) {
    this.setState({ selectedSong: songSource });
  }

  createButtons() {
    const songs = Object.keys(music);
    return songs.map((song, i) => {
      const songName = song;
      const songSource = music[song];
      return (
        <button 
          key={i} 
          onClick={(event) => {
            event.preventDefault();
            this.selectSong(songSource);
          }}>
          { song }
        </button>
      );
    });
  }

  render() {
    return (
      <div className="MusicPlayer">
        <audio controls src={this.state.selectedSong}></audio>
        <div>
          { this.createButtons() }
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
