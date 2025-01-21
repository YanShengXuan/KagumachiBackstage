import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function OrderSeasonBarChart() {
  const [labelData, setLabelData] = useState(
    [["臺北市"],["臺中市"],["基隆市"]]
  );
  const data = {
    labels: [...labelData],
    datasets: [
      {
        label: "訂單數",
        data: [
          3, 4, 5, 6, 7, 2, 5, 3, 6, 9, 8, 10, 3, 2, 7, 3, 10, 5, 6, 2, 1, 10,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "三個月內訂單數",
        font: {
          size: 20,
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
}

export default OrderSeasonBarChart;
