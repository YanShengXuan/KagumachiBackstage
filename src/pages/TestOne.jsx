import React from 'react'
import { useState, useEffect } from "react";
import ChartFour from '../components/ChartFour'
import ChartOne from '../components/ChartOne'

const TestOne = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/myback`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log(result);
      setData(result);
      // console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productnames = data.map(item => item.productname);
  // console.log(productnames);

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 p-10 bg-color3 min-h-screen">
        {/* 會員新增數量 */}
        <div className="bg-color2 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4 ">會員新增數量</h3>
          <div className="h-32 bg-color2 flex items-center justify-center text-gray-500 ">
            <ChartOne />
          </div>
        </div>

        {/* 熱銷商品排行 */}
        <div className="bg-color2 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">熱銷商品排行</h3>
          <ol className="list-decimal ml-6 space-y-1 text-gray-700">

            {productnames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ol>
        </div>
        {/* 數據與報表分析 */}
        <div className="bg-color2 rounded-lg shadow p-4 col-span-2 row-span-2">
          <h3 className="text-lg font-semibold mb-4">數據與報表分析</h3>
          <p className="text-gray-700">總收入: <span className="font-semibold">1,000,000</span></p>
          <p className="text-gray-700">總支出: <span className="font-semibold">5,000</span></p>
          <p className="text-gray-700">利潤: <span className="font-semibold">5,000,000</span></p>
          <div className="bg-red-500 h-4 rounded-full text-xs text-center text-white" style={{ width: "80%" }}>
            80%
          </div>
          {/* <progress className="bg-red-500 h-4 rounded-full text-xs text-center text-white" max="100" value="80" style={{backgroundcolor:"rgb(250, 8, 8)",width: "100%" }} >80%</progress> */}
        </div>

        {/* 需補貨商品 */}
        <div className="bg-color2 rounded-lg shadow p-4 col-span-2 ">
          <h3 className="text-lg font-semibold mb-4">需補貨商品</h3>
          <table className="table-auto w-full text-left border-collapse ">
            <thead>
              <tr className="bg-color2 border-black">
                <th className="px-4 py-2">產品編號</th>
                <th className="px-4 py-2">目前庫存</th>
                <th className="px-4 py-2">低於庫存數量</th>
                <th className="px-4 py-2">供應商</th>
                <th className="px-4 py-2">供應商電話</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">101</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">10</td>
                <td className="border px-4 py-2">布萊德大公司</td>
                <td className="border px-4 py-2">123-4567</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">101</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">10</td>
                <td className="border px-4 py-2">布萊德大公司</td>
                <td className="border px-4 py-2">123-4567</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">101</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">10</td>
                <td className="border px-4 py-2">布萊德大公司</td>
                <td className="border px-4 py-2">123-4567</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 客戶投訴 */}
        <div className="bg-color2 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">客戶投訴</h3>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>1.不給投訴</li>
          </ul>
        </div>

        {/* 目前優惠活動 */}
        <div className="bg-color2 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">目前優惠活動</h3>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>全館九折</li>
            <li>滿千送百</li>
          </ul>
        </div>

        {/* 今日訂單數量 */}
        <div className="bg-color2 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">今日訂單數量</h3>
          <div className="h-32 bg-color2 flex items-center justify-center text-gray-500">
            < ChartFour />
          </div>
        </div>

        {/* 系統通知 */}
        <div className="bg-color2 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">系統通知</h3>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>目前網站維修中</li>
            <li>預計2/19前會修好</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TestOne
