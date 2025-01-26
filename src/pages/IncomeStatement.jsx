import React, { useState } from 'react';
import DateSelector from '../components/DateSelector.jsx';
import Report from '../components/Report.jsx';
import GaugeChart from '../components/GaugeChart.jsx';
import BarChart from '../components/BarChart.jsx';

// 模擬動態獲取數據
const fetchData = () => {
    // 生成範圍內的隨機數
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 會計項目的隨機數生成
    const revenue = getRandomNumber(50_000, 150_000); // 隨機營業收入（5萬 ~ 15萬）
    const cost = getRandomNumber(30_000, revenue);    // 隨機營業成本（3萬 ~ 收入）
    const profit = revenue - cost;                    // 毛利（收入 - 成本）
    const otherIncome = getRandomNumber(1_000, 5000); // 業外收入
    const preTaxProfit = profit + otherIncome; // 稅前純益
    const tax = getRandomNumber(5_000, 10_000); // 所得稅
    const netProfit = preTaxProfit - tax; // 稅後純益

    return { revenue, cost, profit, otherIncome, preTaxProfit, tax, netProfit };
};

const IncomeStatement = () => {
    const [year, setYear] = useState(null); // null表示未選擇
    const [quarter, setQuarter] = useState(null);
    const [month, setMonth] = useState(null);
    const [data, setData] = useState(null); // 初始為 null

    const handleDateChange = (newYear, newQuarter, newMonth) => {
        setYear(newYear);
        setQuarter(newQuarter);
        setMonth(newMonth);

        // 當年份被選擇時，獲取數據
        if (newYear) {
            const updatedData = fetchData();
            setData(updatedData);
        } else {
            setData(null); // 如果年份為 null，清空數據
        }
    };

    // 計算百分比
    const costPercentage = data ? ((data.cost / data.revenue) * 100).toFixed(1) : 0;
    const profitPercentage = data ? ((data.profit / data.revenue) * 100).toFixed(1) : 0;

    return (
        <div className="w-full bg-[#A6A6A6] h-full pt-10">
            <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">數據/報表</h1>
                <DateSelector onSelectionChange={handleDateChange} />
                <div className="mt-6">
                    <Report year={year} quarter={quarter} month={month} data={data} />
                </div>
                <div className="mt-6 flex justify-between w-[95%] mx-auto">
                    {data && (
                        <div className="mt-6 flex w-full">
                        {/* 左側儀表圖 */}
                        <div className="w-1/2 flex items-center justify-center">
                            <GaugeChart
                                data={[data.cost, data.profit]} // 營業成本與營業毛利
                                labels={["營業成本", "營業毛利"]}
                                colors={["#FFC107", "#4CAF50"]}
                                title="營業收入"
                            />
                        </div>
                        {/* 右側柱狀圖 */}
                        <div className="w-1/2">
                            <BarChart data={data} />
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomeStatement;