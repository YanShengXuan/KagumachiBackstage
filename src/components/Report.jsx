import React from 'react';

const Report = ({ year, quarter }) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">損益表</h2>
            <p className="text-sm text-gray-500">顯示 {year} 年第 {quarter} 季的報表</p>
            {/* 模擬報表資料 */}
            <table className="min-w-full mt-4 border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 border border-gray-200 text-left text-sm font-medium text-gray-600">項目</th>
                        <th className="px-4 py-2 border border-gray-200 text-right text-sm font-medium text-gray-600">金額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 border border-gray-200 text-left">營業收入</td>
                        <td className="px-4 py-2 border border-gray-200 text-right">$100,000</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border border-gray-200 text-left">營業成本</td>
                        <td className="px-4 py-2 border border-gray-200 text-right">$60,000</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border border-gray-200 text-left">營業毛利</td>
                        <td className="px-4 py-2 border border-gray-200 text-right">$40,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Report;