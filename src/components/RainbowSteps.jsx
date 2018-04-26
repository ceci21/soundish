import React from 'react';
import { RainbowStepsBar, RainbowStepsGraph } from './styled_components/components.jsx';

/* RainbowSteps Component
	INPUTS: frequency data fed from the music player
	COMPONENTS: Visualizer graph, and visualizer bars. */
export default class RainbowSteps extends React.Component {
	createBars = (frequencyData, windowHeight) => {
		// Initialize an array that will contain the bars.
		const bars = [];

		if (!frequencyData) {
			console.warn('No data is provided.');
			return <div>No data</div>;
		}

		// TODO: Do I even need to map on this anymore??
		return frequencyData.map((fr, i) => {
			// TODO: How do I make it so that the frequency graph looks more even??
			let height = fr / 256 * windowHeight;
			return <RainbowStepsBar key={i} height={height} hue={fr} />;
		});
	};

	render() {
		if (this.props.frequencyData) {			
			
			// Turn Uint8Array into regular array for better data viewing. // TODO: Do I even need to do this??
			let frequencyData = Array.from(this.props.frequencyData);
			let windowHeight = window.innerHeight;

			// Create bars
			let bars = this.createBars(frequencyData, windowHeight);

			// Create graph and insert bars
			return (
				<RainbowStepsGraph className="RainbowStepsGraph" columns={frequencyData.length}>
					{bars}
				</RainbowStepsGraph>
			);

		} else {
			return <div style={{ color: '#fff' }}>Loading...</div>; // TODO: Come up with better loading component, or simply load it up in visualizer?
		}
	}
}