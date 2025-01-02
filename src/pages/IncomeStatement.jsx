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
        <div className=" bg-color3 min-h-screen">
            <div className="flex p-10 rounded-xl">
                <div className="p-6 bg-color2 rounded-xl w-[95vw] h-[95vh]">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">數據/報表</h1>
                        <YearQuarterSelector onSelectionChange={handleSelectionChange} />
                    <div className="mt-6">
                        <Report year={year} quarter={quarter} />
                    </div>
                    <div className=" flex items-center ">
                        <GaugeChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeStatement;