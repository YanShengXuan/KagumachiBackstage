import React from 'react'
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, BarElement);


const Utils = {
  months: ({ count }) => ["櫃子", "桌子", "椅子", "沙發", "燈具", "寢具"].slice(0, count),
  numbers: ({ count, min, max }) => Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min),

};

const ChartFour = () => {

  const labels = Utils.months({ count: 6 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data:  [60, 40, 40, 52, 70, 20],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor:"rgb(255, 99, 132)",
        type: 'bar', 
        order: 2
      },
      {
        label: 'Dataset 2',
        data:  [0, 30, 40, 80, 90, 110],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgb(54, 162, 235)",
        type: 'line', 
        order: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, 
        },
      },
    },
  };

  return (
    <div className="w-auto  flex m-auto">
      {/* <Line data={data} options={options} /> */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartFour;