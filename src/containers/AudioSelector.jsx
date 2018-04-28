import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/action_creators';

class AudioSelector extends React.Component {
  componentDidMount() {
    this.props.retrieveServerAudioNames();
  }

  selectAudioNameHandler = (e) => {
    console.log('selected audio')    
    const audioFileName = e.target.value;
    this.props.retrieveServerAudioData(audioFileName);
  }

  createAudioNameSelector = () => {
    // TODO: Create a selector that lets you select multiple audio files.
    const { audioFileNames } = this.props;
    console.log(audioFileNames);
    if (audioFileNames) {
      return (
        <div>
          <h5>Select audio to download.</h5>
          <select onChange={this.selectAudioNameHandler}>
            {
              audioFileNames.map((name, i) => {
                return <option key={i}>{ name }</option>
              })
            }
          </select>
        </div>
      );
    } else {
      return <div>Loading audio names...</div>;
    }
  }

  createAudioDataSelector = () => {
    const { audioFileData } = this.props;
    console.log(audioFileData);
    if (audioFileData) {
      return (
        <div>
          <h5>Select audio that you have downloaded to play.</h5>
          <select onChange={this.selectAudioDataHandler}>
            {
              audioFileData.map((name, i) => {
                return <option key={i}>{ name }</option>
              })
            }
          </select>
        </div>
      );
    } else {
      return <div>Loading audio data...</div>;
    }
  }

  render() {
    return (
      <div className="MusicSelector">
        { this.createAudioNameSelector() }
        { this.createAudioDataSelector() }
      </div>
    );
  }
}

const mapStateToProps = ({ audioFileNames, audioFileData }) => {
  return {
    audioFileNames,
    audioFileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveServerAudioNames: (...args) => dispatch(actions.file.retrieveServerAudioNames(...args)),
    retrieveServerAudioData: (...args) => dispatch(actions.file.retrieveServerAudioData(...args)),
    play: (...args) => dispatch(actions.player.play(...args))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioSelector);