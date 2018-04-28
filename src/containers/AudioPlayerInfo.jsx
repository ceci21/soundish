import React from 'react';
import { connect } from 'react-redux';

class AudioPlayerInfo extends React.Component {
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
    messages: Object.assign({}, messages)
  };
};

export default connect(mapStateToProps)(AudioPlayerInfo);