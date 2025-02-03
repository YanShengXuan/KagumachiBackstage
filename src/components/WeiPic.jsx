import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState, useEffect } from "react";

// 必須先註冊 Chart.js 的元件
ChartJS.register(ArcElement, Tooltip, Legend);
const WeiPic = () => {
    
    const [data, setData] = useState({
        total: 0,
        cost: 0,
        fin: 0,
        categoryAmounts: {} 
    });
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/myback/getpic');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            setData(result);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const datas = {
        labels: ["櫃子", "桌子", "椅子", "沙發", "燈具", "寢具"],
        datasets: [
            {
                label: "各大類金額",
                data: [
                    data.categoryAmounts?.[1] ?? 0,
                    data.categoryAmounts?.[2] ?? 0,
                    data.categoryAmounts?.[3] ?? 0,
                    data.categoryAmounts?.[4] ?? 0,
                    data.categoryAmounts?.[5] ?? 0,
                    data.categoryAmounts?.[6] ?? 0
                ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top", // 可以是 'top', 'left', 'bottom', 'right'
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <>
            <h3 className="text-lg font-semibold mb-4">數據與報表分析</h3>
            <p className="text-gray-700 ">總收入: <span className="font-semibold ">{data.total}元</span></p>
            <p className="text-gray-700">總支出: <span className="font-semibold ">{data.cost}元</span></p>
            <p className="text-gray-700">利潤: <span className="font-semibold ">{data.fin}元</span></p>
            <div className="w-[400px] h-[400px] mx-auto">
                <Pie data={datas} options={options} />
            </div>
        </>
    )
}

export default WeiPic