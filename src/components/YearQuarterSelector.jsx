import React, { useState } from 'react';

const YearQuarterSelector = ({ onSelectionChange }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [quarter, setQuarter] = useState(1);

    const handleYearChange = (e) => {
        setYear(e.target.value);
        onSelectionChange(e.target.value, quarter);
    };

    const handleQuarterChange = (e) => {
        setQuarter(e.target.value);
        onSelectionChange(year, e.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-100 rounded">
            <div>
                <label className="block text-sm font-medium text-gray-700">選擇年分</label>
                <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={year}
                    onChange={handleYearChange}
                >
                    {[2024, 2025].map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">選擇季度</label>
                <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={quarter}
                    onChange={handleQuarterChange}
                >
                    {[1, 2, 3, 4].map((qt) => (
                        <option key={qt} value={qt}>第 {qt} 季</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default YearQuarterSelector;