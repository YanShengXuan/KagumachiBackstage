import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// 註冊 Chart.js 必要組件
Chart.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ data, labels, colors, title }) => {
    // 圖表數據
    const [chartData, setChartData] = useState({
        labels: labels,
        datasets: [
            {
                data: data, 
                backgroundColor: colors, 
                borderWidth: 0, // 去除邊框
                cutout: "75%", // 圓心的空洞大小
                rotation: -90, // 起始角度
                circumference: 180, // 半圓形範圍
                borderRightRadius:10,
            },
        ],
    });

    // 當 value 或 color 發生變化時更新數據
    useEffect(() => {
        setChartData({
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                    cutout: "80%",
                    rotation: -90,
                    circumference: 180,
                },
            ],
        });
    }, [data, labels, colors]);

    const total = data.reduce((sum, value) => sum + value, 0); // 總數（營業收入）
    const percentages = data.map((value) => ((value / total) * 100).toFixed(1)); // 百分比計算

    // 圖表選項
    const options = {
        plugins: {
            legend: { display: true }, // 隱藏圖例
            tooltip: { enabled: true }, // 隱藏工具提示
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="w-auto flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="relative w-96 h-72">
                <Doughnut data={chartData} options={options} />
                {/* 圖表中心顯示百分比 */}
                <div className="absolute bottom-10 left-20 right-20 flex flex-col items-center justify-center">
                    {labels.map((label, index) => (
                        <div key={index} className="text-center">
                            <p className="text-base font-medium text-gray-700">{label}</p>
                            <p className="text-lg font-bold text-gray-900">{percentages[index]}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GaugeChart;
