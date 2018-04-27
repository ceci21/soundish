import React from 'react';
import { connect } from 'react-redux';

import UserControls from '../containers/UserControls.jsx';
import MusicPlayerInfo from './MusicPlayerInfo.jsx';
import RainbowSteps from '../components/RainbowSteps.jsx';

import Mydium from '../lib/mydium';

class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frequencyData: null,
      Visualizer: (props) => <RainbowSteps {...props} /> // TODO: There's gotta be a better way to render component... 
		};
		this.musicPlayer = null;
	}

	componentDidMount() {
		const song = this.props.song ? this.props.song : null;
		const options = {
			autoplay: true
		};
		this.musicPlayer = new Mydium(song, this.callback, options);
	}

	callback = (frequencyData) => {
		if (frequencyData) {
			this.setState({ frequencyData: frequencyData.slice() });
		}
	};

	playPlayer = (song) => {
    this.musicPlayer.play(song, this.callback);

	};

	stopPlayer = () => {
    this.musicPlayer.stop(() => {
      console.log('stopped');
    });
	};

	pausePlayer = () => {
		this.musicPlayer.pause(() => {
			console.log('paused');
		});
	};

	render() {

		if (this.musicPlayer) {
			const { song, status } = this.props; // From redux store
			const isPlaying = this.musicPlayer.isPlaying();

			if (status === 'ON' && !isPlaying) {
				this.playPlayer(song);
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
			<div className="MusicPlayer">
				<UserControls />
				<Visualizer frequencyData={frequencyData} />
			</div>
		);
	}
}

const mapStateToProps = ({ song, status }) => {
	return {
		song,
		status
	};
};

export default connect(mapStateToProps)(MusicPlayer);
