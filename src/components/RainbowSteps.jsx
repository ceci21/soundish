import React from 'react';
import { RainbowStepsBar, RainbowStepsGraph } from './styled_components/components.jsx';

export default class RainbowSteps extends React.Component {
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
		if (this.props.frequencyData) {			
			let frequencyData = Array.from(this.props.frequencyData);
			let length = frequencyData.length;
			let windowHeight = window.innerHeight;

			// Create bars
			let bars = this.createBars(frequencyData, windowHeight);

			// Create graph with bars
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