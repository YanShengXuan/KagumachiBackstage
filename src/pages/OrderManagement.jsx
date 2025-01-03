import OrderMonthBarChart from "../components/OrderMonthBarChart.jsx";
import OrderCityBarChart from "../components/OrderCityBarChart.jsx";
import Date from "../components/Date.jsx";

function OrderManagement() {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <tr key={i + 1}>
        <td className="border-2 border-black text-center text-4xl px-6">20241229001</td>
        <td className="border-2 border-black text-center text-4xl px-6">王小明</td>
        <td className="border-2 border-black text-center text-4xl px-6">2024-12-29</td>
        <td className="border-2 border-black text-center text-4xl px-6">30000</td>
        <td className="border-2 border-black text-center text-4xl px-6">配送中</td>
      </tr>
    );
  }

  return (
    <>
      <div className="flex bg-gray-400 h-[100%]">
        <div className="flex flex-col w-[100%]">
          <div className="flex basis-1/4">
            <div className="flex-1 m-4">
              <OrderMonthBarChart />
            </div>
            <div className="flex-1 m-4">
              <OrderCityBarChart />
            </div>
          </div>
          <div className="basis-3/4 h-48 p-2">
            <div className="flex-row h-[100%]">
              <div className="flex justify-between basis-2/12">
                <div className="flex">
                  <Date className="p-1" />
                  <button className="px-2 my-2 w-32 bg-amber-600 text-black rounded hover:bg-lime-600">
                    確認
                  </button>
                </div>
                <div className="m-2">
                  <button className="mr-2 py-2 w-32 bg-amber-600 text-black rounded hover:bg-lime-600">
                    時間排序
                  </button>
                  <button className="mr-2 py-2 w-32 bg-amber-600 text-black rounded hover:bg-lime-600">
                    金額排序
                  </button>
                  <button className="py-2 w-32 bg-amber-600 text-black rounded hover:bg-lime-600">
                    狀態排序
                  </button>
                </div>
              </div>
              <div className="flex basis-10/12 justify-center overflow-y-auto h-[80%] mt-4">
                <table className="border-2 border-collapse w-[100%] mr-1">
                  <thead>
                    <tr>
                      <th className="border-2 border-black text-center text-4xl w-[20%]">
                        訂單編號
                      </th>
                      <th className="border-2 border-black text-center text-4xl w-[20%]">訂購人</th>
                      <th className="border-2 border-black text-center text-4xl w-[20%]">
                        訂購日期
                      </th>
                      <th className="border-2 border-black text-center text-4xl w-[20%]">
                        訂購金額
                      </th>
                      <th className="border-2 border-black text-center text-4xl w-[20%]">
                        配送狀態
                      </th>
                    </tr>
                  </thead>
                  {/* 測試內容 */}
                  <tbody>{rows}</tbody>
                  {/* 測試內容 */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderManagement;
