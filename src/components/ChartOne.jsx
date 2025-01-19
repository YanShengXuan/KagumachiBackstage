import React from "react";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
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

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/myback/test');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      if (Array.isArray(result.data)) {
        setData(result.data);  
      } else {
        console.error("Invalid data format: ", result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  if (data.length === 0) {
    return <div>Loading...</div>; 
  }


  const data1 = {
    labels: data.map(item => `${item.month}月`),
    datasets: [
      {
        label: "", //標題
        data: data.map(item => item.count),
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
        display: true, // 是否顯示圖例
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "月份", // x 軸標題
        },
      },
      y: {
        title: {
          display: false,
          text: "新增會員數量", // y 軸標題
        },
        min: 0, // y 軸最小值
        max: 3, // y 軸最大值
        ticks: {
          stepSize: 1, // y 軸的步進值
        },
      },
    },
  };
  return (
    <div>

      <Line data={data1} options={options} />
    </div>
  );
};

export default ChartOne;
