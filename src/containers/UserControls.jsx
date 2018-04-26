import React from 'react';
import { connect } from 'react-redux';
import { player } from '../redux/action_creators';

// TODO: Maybe move this into /containers ?
// TODO: Add style to container of this

class UserControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null
    };
  }
  
  songOptions = () => {
    const files = Array.from(this.state.files);
    return files.map((file, i) => {
      return <option key={i} value={file.name}>{file.name}</option>;
    });
  }

  // TODO: Change name and stuff
  eventHandler = ({ target }) => {
    const files = target.files;
    console.log(target.files);
    this.setState({ files })
  }

  render() {
    const { status, song } = this.props;

    const DropDown = () => ((this.state.files) ? <select>{this.songOptions}</select> : <div />);

    return (
      <div className="UserControls">
        <h1>User controls</h1>
        <button disabled={(status === 'ON')} onClick={this.props.play}>play</button>
        <button disabled={(status === 'OFF')} onClick={this.props.stop}>Stop</button>
        <button disabled={(status === 'PAUSED' || status === 'OFF')} onClick={this.props.pause}>Pause</button>
        <input type="file" onChange={this.eventHandler} accept=".mp3" multiple />
        <DropDown />
      </div>
    );
  }
}

const mapStateToProps = ({ song, status }) => {
  return {
    song,
    status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSong: (song) => dispatch(player.changeSong(song)),
    play: () => dispatch(player.play()),
    stop: () => dispatch(player.stop()),
    pause: () => dispatch(player.pause())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserControls);