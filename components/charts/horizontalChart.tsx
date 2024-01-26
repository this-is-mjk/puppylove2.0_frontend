// Filename - App.js

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import '../../styles/stats.css'

const HorizontalBar = ({Data, Label} : any) => {

	// let keysLength = Object.keys(Data).length;
	const data_lables = Object.keys(Data);
	console.log(data_lables)
	const data_data = Object.values(Data);
	console.log(data_data)

	const data = {
		labels: data_lables,
		datasets: [
		  {
			label: Label,
			data: data_data, 
			fill: true,
			backgroundColor: "white",
			borderColor: "white",
		  },
		],
	  };
	  

    const options = {
		indexAxis: 'x',
		maintainAspectRatio: true,
		aspectRatio: 2,
	} as any;
      

	return (
		<div className="bargraph">
			<Bar data={data} options= {options}/>
		</div>
	);
};

export default HorizontalBar;
