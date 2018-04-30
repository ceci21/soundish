import React from 'react';
import { connect } from 'react-redux';

import AudioUserControls from '../containers/AudioUserControls.jsx';
import AudioPlayerInfo from './AudioPlayerInfo.jsx';
import RainbowSteps from '../components/RainbowSteps.jsx';
import { AudioPlayerContainer as Container } from '../components/styled_components/components.jsx';

import Mydium from '../lib/mydium';

/*
	TODO: I think it's a little confusing how I don't have actions in here,
	yet I have methods called 'playPlayer' and stuff like that that affect the mydium instance. 
	Since	the actions update the status of the store to be 'ON' or 'OFF' or whatever,
	it might be good to change the names of the actions to reflect that.
	Might be less confusing!!
*/
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
		const currentAudio = this.props.currentAudio ? this.props.currentAudio : null;
		const options = {
			autoplay: true
		};
		this.audioPlayer = new Mydium(currentAudio, this.callback, options);
	}

	callback = (frequencyData) => {
		if (frequencyData) {
			this.setState({ frequencyData: frequencyData.slice() });
		}
	};

	playPlayer = (currentAudio) => {
    this.audioPlayer.play(currentAudio, this.callback);
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
			// TODO: Might not need audio file data in here.
			const { currentAudio, status } = this.props; // From redux store
			const isPlaying = this.audioPlayer.isPlaying();

			if (status === 'ON' && !isPlaying) {
				this.playPlayer(currentAudio);
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
			<Container>
				<AudioUserControls />
				<Visualizer frequencyData={frequencyData} />
			</Container>
		);
	}
}

const mapStateToProps = ({ currentAudio, status }) => {
	return {
		currentAudio,
		status
	};
};

export default connect(mapStateToProps)(AudioPlayer);
