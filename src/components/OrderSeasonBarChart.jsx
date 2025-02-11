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

function OrderSeasonBarChart() {
  const [isLoadingA, setIsLoadingA] = useState(true);
  const [labelData, setLabelData] = useState([]);
  const allSubCategoryUrl = "http://localhost:8080/order/allSubCategory";

  useEffect(() => {
    fetch(allSubCategoryUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          return response.json();
        }
      })
      .then((datas) => {
        setLabelData(datas.map((data) => data.categoryname));
      })
      .then(() => {
        setIsLoadingA(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const [isLoadingB, setIsLoadingB] = useState(true);
  const [labelQuantity, setLabelQuantity] = useState([]);
  const today = new Date();
  const endYear = today.getFullYear();
  const endMonth = today.getMonth() + 1;
  let endDate;
  switch(endMonth){
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      endDate = 31;
      break;
    case 2 :
      endDate = 28;
      break;
    default :
      endDate = 30;
      break;
  };
  const startYear =
    endMonth - 2 < 1 ? today.getFullYear() - 1 : today.getFullYear();
  const startMonth = endMonth - 2 < 1 ? endMonth + 10 : endMonth - 2;
  const formatStartDate = `${startYear}-${String(startMonth).padStart(2, "0")}-01`;
  const formatEndDate = `${endYear}-${String(endMonth).padStart(2, "0")}-${endDate}`;
  const getOrderSeasonUrl = `http://localhost:8080/order/orderSeason/${formatStartDate}/${formatEndDate}`;
  useEffect(() => {
    fetch(getOrderSeasonUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setLabelQuantity(data);
      })
      .then(()=>{
        setIsLoadingB(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  if(isLoadingA | isLoadingB){
    return <div></div>
  }

  const quantity = labelData.map(categoryname =>{
    const found = labelQuantity.find(item => item.categoryname == categoryname);
    return found ? found.quantity : 0;
  });

  const data = {
    labels: [...labelData],
    datasets: [
      {
        label: "訂單數",
        data: quantity,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "近三個月內訂單數",
        font: {
          size: 20,
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
}

export default OrderSeasonBarChart;
