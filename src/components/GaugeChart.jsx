import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// 註冊 Chart.js 必要組件
Chart.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ value, label, color }) => {
    // 圖表數據
    const data = {
        labels: ["Filled", "Remaining"],
        datasets: [
            {
                data: [value, 100 - value], // 第一個值為完成比例，第二個為剩餘比例
                backgroundColor: [color, "#F3F4F6"], // 已完成與剩餘部分顏色
                borderWidth: 0, // 去除邊框
                cutout: "80%", // 圓心的空洞大小
                rotation: -90, // 起始角度
                circumference: 180, // 半圓形範圍
                // borderRadius: 10, // 添加圓弧效果
            },
        ],
    };

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
                <Doughnut data={data} options={options} />
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

const Dashboard = () => {
    return (
        <div className="flex justify-between w-full mx-auto">
            {/* 營業收入 */}
            <GaugeChart value={100} label="營業收入" color="#4CAF50" />
            {/* 營業成本 */}
            <GaugeChart value={60} label="營業成本" color="#FFC107" />
            {/* 營業毛利 */}
            <GaugeChart value={40} label="營業毛利" color="#22d30e" />
        </div>
    );
};

export default Dashboard;
