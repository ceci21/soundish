import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/action_creators';

class MusicSelector extends React.Component {
  render() {
    return <div>Music Selector</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveServerMusic: dispatch(actions.file.retrieveServerAudio())
  };
}

export default connect(null, mapDispatchToProps)(MusicSelector);