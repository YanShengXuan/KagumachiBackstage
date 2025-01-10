import React, { useState } from 'react';
import YearQuarterSelector from '../components/YearQuarterSelector.jsx';
import Report from '../components/Report.jsx';
import GaugeChart from '../components/GaugeChart.jsx';


const IncomeStatement = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [quarter, setQuarter] = useState(1);

    const handleSelectionChange = (selectedYear, selectedQuarter) => {
        setYear(selectedYear);
        setQuarter(selectedQuarter);
    };

    return (
        <div className="w-full bg-[#A6A6A6] h-full pt-10">
            <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">數據/報表</h1>
                <YearQuarterSelector onSelectionChange={handleSelectionChange} />
                <div className="mt-6">
                    <Report year={year} quarter={quarter} />
                </div>
                <div className="mt-6">
                    <GaugeChart />
                </div>
            </div>
        </div>
    );
};

export default IncomeStatement;