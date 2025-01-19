import React from 'react';

const Report = ({ year, quarter, month, data }) => {

    // 動態標題顯示邏輯
    const generateTitle = () => {
        if (year && month) {
            return `${year} 年 ${month} 月的報表`;
        } else if (year && quarter) {
            return `${year} 年第 ${quarter} 季的報表`;
        } else if (year) {
            return `${year} 年的報表`;
        } else {
            return "請選擇日期以查看報表";
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">損益表</h2>
            <p className="text-sm text-gray-500">{generateTitle()}</p>
            {data ? (
                <table className="min-w-full mt-4 border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 border border-gray-200 text-left text-sm font-medium text-gray-600">項目</th>
                            <th className="px-4 py-2 border border-gray-200 text-right text-sm font-medium text-gray-600">金額（單位：仟元）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id='revenue' className="px-4 py-2 border border-gray-200 text-left">營業收入</td>
                            <td className="px-4 py-2 border border-gray-200 text-right">${data.revenue.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td id='cost' className="px-4 py-2 border border-gray-200 text-left">營業成本</td>
                            <td className="px-4 py-2 border border-gray-200 text-right">${data.cost.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td id='profit' className="px-4 py-2 border border-gray-200 text-left">營業毛利</td>
                            <td className="px-4 py-2 border border-gray-200 text-right">${data.profit.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p className="mt-4 text-gray-500">尚無數據可呈現。</p>
            )}
        </div>
    );
};

export default Report;