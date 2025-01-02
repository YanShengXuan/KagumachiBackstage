import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// 註冊 Chart.js 必要組件
Chart.register(ArcElement, Tooltip, Legend);

const GaugeChart = () => {
  // 圖表數據
  const data = {
    labels: ["Filled", "Remaining"],
    datasets: [
      {
        data: [59.35, 40.65], // 第一個值為完成比例，第二個為剩餘比例
        backgroundColor: ["#4CAF50", "#E0E0E0"], // 已完成與剩餘部分顏色
        borderWidth: 0, // 去除邊框
        cutout: "80%", // 圓心的空洞大小
        rotation: -90, // 起始角度
        circumference: 180, // 半圓形範圍
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
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      {/* 儀表圖 */}
      <div className="relative w-full h-40">
        <Doughnut data={data} options={options} />
        {/* 圖表中心文字 */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-3xl font-bold text-gray-800">59.35%</p>
            <p className="text-sm text-gray-500">淨利潤率</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
