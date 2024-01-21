// Filename - App.js

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import '../../styles/stats.css'

const HorizontalBar = ({Data, Label} : any) => {
	// Sample data
	const data = {
		labels: ["Y23", "Y22", "Y21", "Y20", "Y19"],
		datasets: [
		  {
			label: Label,
			data: [Data.y23, Data.y22, Data.y21, Data.y20, Data.y19], // Adjust the number of data points
			fill: true,
			backgroundColor: "white",
			borderColor: "white",
		  },
		],
	  };
	  

    const options = {
		indexAxis: 'x',
		maintainAspectRatio: true, // Set to false to fix height and width ratio
		aspectRatio: 2,
	} as any;
      

	return (
		<div className="bargraph">
			<Bar data={data} options= {options}/>
		</div>
	);
};

export default HorizontalBar;
