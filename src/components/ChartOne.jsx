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
    labels: ["1月", "3月", "5月", "7月", "9月", "12月"],
    datasets: [
      {
        label: "", //標題
        data: [0, 30, 40, 80, 90, 110],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Member",
      },
    },
  };

  return (
    <div>
      
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartOne;
