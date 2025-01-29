import React from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// 必須先註冊 Chart.js 的元件
ChartJS.register(ArcElement, Tooltip, Legend);
const WeiPic = () => {
    const data = {
        labels: ["櫃子", "桌子", "椅子", "沙發", "燈具", "寢具"],
        datasets: [
            {
                label: "Votes",
                data: [12, 19, 3, 5, 2, 3],
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
            <p className="text-gray-700">總收入: <span className="font-semibold">1,000,000</span></p>
            <p className="text-gray-700">總支出: <span className="font-semibold">5,000</span></p>
            <p className="text-gray-700">利潤: <span className="font-semibold">5,000,000</span></p>
            <div className="bg-red-500 h-4 rounded-full text-xs text-center text-white" style={{ width: "80%" }}>
                80%
            </div>
            <div style={{ width: "50%", margin: "0 auto" }}>
                <Pie data={data} options={options} />
            </div>
        </>
    )
}

export default WeiPic