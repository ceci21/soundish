import React from 'react';
import { connect } from 'react-redux';
import { player } from '../redux/action_creators';

// TODO: Maybe move this into /containers ?
// TODO: Add style to container of this

class UserControls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { status, song } = this.props;

    return (
      <div className="UserControls">
        <h1>User controls</h1>
        <button disabled={(status === 'ON')} onClick={this.props.play}>play</button>
        <button disabled={(status === 'OFF')} onClick={this.props.stop}>Stop</button>
        <button disabled={(status === 'PAUSED' || status === 'OFF')} onClick={this.props.pause}>Pause</button>
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