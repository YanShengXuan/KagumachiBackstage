import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
    const [chartData, setChartData] = useState({
        labels: [
            "營業成本",
            "營業毛利",
            "業外收入與支出",
            "稅前純益",
            "所得稅",
            "稅後純益",
        ],
        datasets: [
            {
                label: "金額（單位：仟元）",
                data: [
                    data.cost,
                    data.profit,
                    data.otherIncome,
                    data.preTaxProfit,
                    data.tax,
                    data.netProfit,
                ],
                backgroundColor: [
                    "#FFC107", // 營業成本
                    "#4CAF50", // 營業毛利
                    "#2196F3", // 業外收入與支出
                    "#FF5722", // 稅前純益
                    "#9C27B0", // 所得稅
                    "#00BCD4", // 稅後純益
                ],
            },
        ],
    });

    useEffect(() => {
        setChartData((prev) => ({
            ...prev,
            datasets: [
                {
                    ...prev.datasets[0],
                    data: [
                        data.cost,
                        data.profit,
                        data.otherIncome,
                        data.preTaxProfit,
                        data.tax,
                        data.netProfit,
                    ],
                },
            ],
        }));
    }, [data]);

    const options = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { display: true, text: "會計項目" },
            },
            y: {
                title: { display: true, text: "金額（單位：仟元）" },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-auto h-80">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
