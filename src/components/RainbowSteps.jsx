import React, { Component } from 'react';
import Mydium from '../lib/mydium';
import { RainbowStepsBar, RainbowStepsGraph } from './styled_components/components.jsx';

class RainbowSteps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			frequencyData: null
		};
		this.mydium;
	}

	// Callback provided to change the frequency data. This will be provided in play.
	callback = (frequencyData) => {
		if (frequencyData) {
			this.setState({ frequencyData: frequencyData.slice() });
		}
	};

	componentDidMount() {
		const song = this.props.song ? this.props.song : null;
		this.mydium = new Mydium(song, this.callback);
	}

	createBars = (frequencyData, windowHeight) => {
		if (!frequencyData) {
			console.warn('No data is provided.');
			return <div>No data</div>;
		}
		return frequencyData.map((fr, i) => {
			// TODO: How do I make it so that the frequency graph looks more even??
			let height = fr / 256 * windowHeight;
			return <RainbowStepsBar key={i} height={height} hue={fr} />;
		});
	};

	render() {
		if (this.state.frequencyData) {
			let frequencyData = Array.from(this.state.frequencyData);
			let length = frequencyData.length;
			let windowHeight = window.innerHeight;

			// Create bars for graph.
			let bars = this.createBars(frequencyData, windowHeight);

			return (
				<RainbowStepsGraph className="RainbowStepsGraph" columns={length}>
					{bars}
				</RainbowStepsGraph>
			);
		} else {
			return <div style={{ color: '#fff' }}>Loading...</div>;
		}
	}
}

export default RainbowSteps;
