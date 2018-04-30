import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/action_creators';
import AudioUploader from './AudioUploader.jsx';
import AudioSelector from './AudioSelector.jsx';

// TODO: Maybe move this into /containers ?
// TODO: Add style to container of this

class AudioUserControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null
    };
  }
  
  currentAudioOptions = () => {
    const files = Array.from(this.state.files);
    return files.map((file, i) => {
      return <option key={i} value={file.name}>{file.name}</option>;
    });
  }

  render() {
    const { status, currentAudio } = this.props;

    const DropDown = () => ((this.state.files) ? <select>{this.currentAudioOptions}</select> : <div />);

    return (
      <div className="AudioUserControls">
        <h1>User controls</h1>
        <button disabled={(status === 'ON')} onClick={this.props.play}>play</button>
        <button disabled={(status === 'OFF')} onClick={this.props.stop}>Stop</button>
        <button disabled={(status === 'PAUSED' || status === 'OFF')} onClick={this.props.pause}>Pause</button>
        <AudioSelector />
        <AudioUploader />
        <DropDown />
      </div>
    );
  }
}

const mapStateToProps = ({ currentAudio, status }) => {
  return {
    currentAudio,
    status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePlayerAudio: (currentAudio) => dispatch(actions.player.changeAudio(currentAudio)),
    play: () => dispatch(actions.player.play()),
    stop: () => dispatch(actions.player.stop()),
    pause: () => dispatch(actions.player.pause()),
    uploadAudio: (data) => dispatch(actions.file.uploadAudio(data))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioUserControls);