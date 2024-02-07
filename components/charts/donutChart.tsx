// Filename - App.js

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import '../../styles/stats.css'
// import { femaleRegistration, maleRegistration } from "@/utils/UserData";

const DoughnutChart = ({ femaleRegistration, maleRegistration } : any) => {
	// Sample data
	const data = {
        labels: [
          'Male',
          'Female'
        ],
        datasets: [{
        //   labels: ['My First Dataset'],
        //   data: [1, 3],
          data: [maleRegistration, femaleRegistration],
          backgroundColor: [
            '#f048bd',
            '#6dc1d6',
          ],
          borderColor: '#6e6a6c',
          borderWidth: 1,
          hoverOffset: 4
        }]
      };
	  

    const options = {
		// indexAxis: 'x',
		// maintainAspectRatio: true, // Set to false to fix height and width ratio
		// aspectRatio: 2,
	} as any;
      

	return (
		<div className="doghnutchart">
			<Doughnut data={data} options= {options}/>
		</div>
	);
};

export default DoughnutChart;
