import React, { useState } from 'react';

const DateSelector = ({ onSelectionChange }) => {
    const [year, setYear] = useState(null);
    const [quarter, setQuarter] = useState(null);
    const [month, setMonth] = useState(null);

    // 根據季度返回對應的月份範圍
    const getMonthsForQuarter = (quarter) => {
        switch (quarter) {
            case 1: return [1, 2, 3];
            case 2: return [4, 5, 6];
            case 3: return [7, 8, 9];
            case 4: return [10, 11, 12];
            default: return [];
        }
    };

    const handleYearChange = (e) => {
        const newYear = e.target.value === "請選擇年份" ? null : parseInt(e.target.value, 10);
        setYear(newYear);
        setQuarter(null); // 重置季度
        setMonth(null);   // 重置月份
        onSelectionChange(newYear, null, null);
    };

    const handleQuarterChange = (e) => {
        const newQuarter = e.target.value === "請選擇季度" ? null : parseInt(e.target.value, 10);
        setQuarter(newQuarter);
        setMonth(null); // 重置月份
        onSelectionChange(year, newQuarter, null);
    };

    const handleMonthChange = (e) => {
        const newMonth = e.target.value === "請選擇月份" ? null : parseInt(e.target.value, 10);
        setMonth(newMonth);
        onSelectionChange(year, quarter, newMonth);
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-100 rounded">
            <div>
                <label className="block text-sm font-medium text-gray-700">年分</label>
                <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={year ?? "請選擇年份"}
                    onChange={handleYearChange}
                >
                    <option>請選擇年份</option>
                    {[2024, 2025].map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">季度</label>
                <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={quarter ?? "請選擇季度"}
                    onChange={handleQuarterChange}
                    disabled={!year} // 未選擇年份時禁用
                >
                    <option>請選擇季度</option>
                    {[1, 2, 3, 4].map((qt) => (
                        <option key={qt} value={qt}>第 {qt} 季</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">月份</label>
                <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={month ?? "請選擇月份"}
                    onChange={handleMonthChange}
                    disabled={!quarter} // 未選擇季度時禁用
                >
                    <option>請選擇月份</option>
                    {getMonthsForQuarter(quarter).map((mn) => (
                        <option key={mn} value={mn}>{mn} 月</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DateSelector;
