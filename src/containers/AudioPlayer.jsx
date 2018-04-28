import React from 'react';
import { connect } from 'react-redux';

import AudioUserControls from '../containers/AudioUserControls.jsx';
import AudioPlayerInfo from './AudioPlayerInfo.jsx';
import RainbowSteps from '../components/RainbowSteps.jsx';

import Mydium from '../lib/mydium';

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frequencyData: null,
      Visualizer: (props) => <RainbowSteps {...props} /> // TODO: There's gotta be a better way to render component... 
		};
		this.audioPlayer = null;
	}

	componentDidMount() {
		const song = this.props.song ? this.props.song : null;
		const options = {
			autoplay: true
		};
		this.audioPlayer = new Mydium(song, this.callback, options);
	}

	callback = (frequencyData) => {
		if (frequencyData) {
			this.setState({ frequencyData: frequencyData.slice() });
		}
	};

	playPlayer = (song) => {
    this.audioPlayer.play(song, this.callback);

	};

	stopPlayer = () => {
    this.audioPlayer.stop(() => {
      console.log('stopped');
    });
	};

	pausePlayer = () => {
		this.audioPlayer.pause(() => {
			console.log('paused');
		});
	};

	render() {

		if (this.audioPlayer) {
			const { song, status, audioFileData } = this.props; // From redux store
			const isPlaying = this.audioPlayer.isPlaying();

			if (status === 'ON' && !isPlaying) {
				this.playPlayer(audioFileData);
			} else if (status === 'OFF' && isPlaying) {
				this.stopPlayer();
			} else if (status === 'PAUSED' && isPlaying) {
				this.pausePlayer();
			}
    }

		// TODO: IDK maybe make this into redux state... might not really matter though
		let Visualizer = (props) => <this.state.Visualizer {...props} />;
		let frequencyData = this.state.frequencyData;
		return (
			<div className="AudioPlayer">
				<AudioUserControls />
				<Visualizer frequencyData={frequencyData} />
			</div>
		);
	}
}

const mapStateToProps = ({ song, status, audioFileData }) => {
	return {
		song,
		status,
		audioFileData
	};
};

export default connect(mapStateToProps)(AudioPlayer);
