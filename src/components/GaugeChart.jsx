import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// 註冊 Chart.js 必要組件
Chart.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ value, label, color }) => {
    // 圖表數據
    const [chartData, setChartData] = useState({
        labels: ["Filled", "Remaining"],
        datasets: [
            {
                data: [value, 100 - value], // 第一個值為完成比例，第二個為剩餘比例
                backgroundColor: [color, "#F3F4F6"], // 已完成與剩餘部分顏色
                borderWidth: 0, // 去除邊框
                cutout: "80%", // 圓心的空洞大小
                rotation: -90, // 起始角度
                circumference: 180, // 半圓形範圍
                borderRightRadius:10,

                // borderTopLeftRadius:0, // 添加圓弧效果
                // borderTopRightRadius:10,
                // borderBottomRightRadius:10,
                // borderBottomLeftRadius:0,
            },
        ],
    });

    // 當 `value` 或 `color` 發生變化時更新數據
    useEffect(() => {
        setChartData({
            labels: ["Filled", "Remaining"],
            datasets: [
                {
                    data: [value, 100 - value],
                    backgroundColor: [color, "#F3F4F6"],
                    borderWidth: 0,
                    cutout: "80%",
                    rotation: -90,
                    circumference: 180,
                },
            ],
        });
    }, [value, color]);

    // 圖表選項
    const options = {
        plugins: {
            legend: { display: false }, // 隱藏圖例
            tooltip: { enabled: false }, // 隱藏工具提示
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="w-1/3 flex flex-col items-center">
            {/* 儀表圖 */}
            <div className="relative w-full h-40">
                <Doughnut data={chartData} options={options} />
                {/* 圖表中心文字 */}
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="absolute bottom-0 left-0 w-full flex flex-col items-center text-center">
                        <p className="text-3xl font-bold text-gray-800">{value}%</p>
                        <p className="text-base text-gray-500">{label}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaugeChart;
