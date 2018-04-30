import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/action_creators';

// TODO: Add style to this
class AudioUploader extends React.Component {
  audioFilesHandler = (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (files.length < 1) {
      throw 'No uploaded files.';
    }

    const formData = new FormData();
    let fieldName = '';

    if (files.length > 1) {
      fieldName = 'audio[]';
    } else {
      fieldName = 'audio';
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== 'audio/mp3') {
        throw 'Not an .mp3 file';
      }
      
      const fileName = (file.name.substring(0, file.name.length - 4) + '_' + Date.now() + '.mp3').split(' ').join('_');
      formData.append(fieldName, file, fileName);
    }

    this.props.uploadAudio(formData, () => {
      this.props.retrieveServerAudioNames(() => {
      });
    });
  }

  render() {
    return (
      <div className="AudioUploader">
        Upload audio files to server.
        <input type="file" accept=".mp3" onChange={this.audioFilesHandler} multiple />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadAudio: (...args) => dispatch(actions.file.uploadAudio(...args)),
    retrieveServerAudioNames: (...args) => dispatch(actions.file.retrieveServerAudioNames(...args))

  };
}


export default connect(null, mapDispatchToProps)(AudioUploader);