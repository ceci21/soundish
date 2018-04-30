import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/action_creators';

class AudioSelector extends React.Component {
  componentDidMount() {
    this.props.retrieveServerAudioNames();
  }

  selectAudioNameHandler = (e) => {
    if (e.target.value === 'default-text') {
      return;
    }
    const audioFileName = e.target.value;
    this.props.retrieveServerAudioData(audioFileName);
  }

  selectAudioDataHandler = (e) => {
    if (e.target.value === 'default-text') {
      return;
    }
    const index = e.target.value;
    const audioFile = this.props.audioFileData[index];
    console.log(this.props.audioFileData, index, audioFile);
    this.props.changePlayerAudio(audioFile);
  }

  createAudioNameSelector = () => {
    // TODO: Create a selector that lets you select multiple audio files.
    const { audioFileNames } = this.props;
    if (audioFileNames) {
      return (
        <div>
          Select audio to download.
          <select onChange={this.selectAudioNameHandler}>
            <option key="default-text" value="default-text">Download audio</option>
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
    if (audioFileData) {
      return (
        <div>
          Select audio that you have downloaded to play.
          <select onChange={this.selectAudioDataHandler}>
            <option key="default-text" value="default-text">Audio</option>
            {
              audioFileData.map((data, i) => {
                const name = data.name;
                return <option key={i} value={i}>{ name }</option>
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
        <div>{ this.createAudioNameSelector() }</div>
        <div>{ this.createAudioDataSelector() }</div>
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
    changePlayerAudio: (...args) => dispatch(actions.player.changeAudio(...args))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioSelector);