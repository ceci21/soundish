import React from 'react';
import { connect } from 'react-redux';

class MusicPlayerInfo extends React.Component {
  render() {
    const { fileUploadStatus } = this.props.messages;
    return (
      <div style={{color: '#fff'}}>
        <h5>Music player info</h5>
        <p>{ fileUploadStatus }</p>
      </div>
    ); // TODO: Add styling
  }
}

const mapStateToProps = ({ messages }) => {
  return {
    messages: Object.from({}, messages)
  };
};

export default connect(mapStateToProps)(MusicPlayerInfo);