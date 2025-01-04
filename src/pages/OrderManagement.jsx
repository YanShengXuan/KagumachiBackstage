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
      <div className="w-full bg-[#A6A6A6] h-full pt-10">
        <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
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
                  <button className="px-2 my-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]">
                    確認
                  </button>
                </div>
                <div className="m-2">
                  <button className="mr-2 py-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]">
                    時間排序
                  </button>
                  <button className="mr-2 py-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]">
                    金額排序
                  </button>
                  <button className="py-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]">
                    狀態排序
                  </button>
                </div>
              </div>
              <div className="flex basis-10/12 justify-center overflow-y-auto h-[230%] mt-4">
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
