import React from "react";
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

function OrderCityBarChart() {
  const data = {
    labels: [
      "臺北市",
      "臺中市",
      "基隆市",
      "臺南市",
      "高雄市",
      "新北市",
      "宜蘭縣",
      "桃園市",
      "嘉義市",
      "新竹縣",
      "苗栗縣",
      "南投縣",
      "彰化縣",
      "新竹市",
      "雲林縣",
      "嘉義縣",
      "屏東縣",
      "花蓮縣",
      "臺東縣",
      "金門縣",
      "澎湖縣",
      "連江縣",
    ],
    datasets: [
      {
        label: "訂單數",
        data: [ 3,  4,  5,  6,  7,  2,  5,  3,  6,  9, 
                8, 10,  3,  2,  7,  3, 10,  5,  6,  2,
                1, 10],
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
        text: "縣市訂單數",
        font:{
          size:20
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
}

export default OrderCityBarChart;
