import { useState, useEffect } from "react";
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

function OrderMonthBarChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [labelData, setLabelData] = useState([]);
  const today = new Date();
  const nowYear = today.getFullYear();
  const getOrderAllMonthUrl = `http://localhost:8080/order/orderAllMonth/${nowYear}`;

  useEffect(() => {
    fetch(getOrderAllMonthUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          return response.json();
        }
      })
      .then((datas) => {
        setLabelData(datas.map((data) => data.quantity));
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  console.log(labelData);
    
  if(isLoading){
    return <div></div>
  }

  const data = {
    labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    datasets: [
      {
        label: "訂單數",
        data: labelData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
        text: "年度訂單數",
        font:{
          size:20
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
}

export default OrderMonthBarChart;
