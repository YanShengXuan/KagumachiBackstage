import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ChartOne = () => {
  
  const data = {
    labels: ["1", "3", "5", "7", "9", "12"],
    datasets: [
      {
        label: "會員增加", //標題
        data: [0, 30, 40, 80, 90, 110],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Member",
      // },
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
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartOne;
