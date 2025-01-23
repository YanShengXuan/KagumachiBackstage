import React, { useState, useEffect } from 'react';
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
};

const ChartFour = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/myback/test');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Fetched Data:', result);

      // 將後端返回的物件轉為陣列格式
      const formattedData = Object.entries(result).map(([key, value]) => ({
        category: key,
        count: value,
      }));

      setData(formattedData);

      // 更新 Chart.js 所需的資料結構
      const labels = Utils.months({ count: 6 });
      const counts = formattedData.map((item) => item.count);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Category Count',
            data: counts,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            type: 'bar',
          },
        ],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          stepSize: 1,
        },
        grid: {
          drawOnChartArea: false, // 隱藏網格線
        },
      },
    },
  };

  return (
    <div className="w-auto flex m-auto">
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default ChartFour;