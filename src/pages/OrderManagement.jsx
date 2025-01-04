import OrderMonthBarChart from "../components/OrderMonthBarChart.jsx";
import OrderCityBarChart from "../components/OrderCityBarChart.jsx";
import Date from "../components/Date.jsx";

function OrderManagement() {
  const buttonStyle =
    "px-16 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
  const tableThStyle = "border-2 border-black text-center text-xl";
  const tableTdStyle = "border-2 border-black text-center text-xl px-6";
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <tr key={i + 1}>
        <td className={tableTdStyle}>20241223001</td>
        <td className={tableTdStyle}>王小明</td>
        <td className={tableTdStyle}>台中市</td>
        <td className={tableTdStyle}>貨到付款</td>
        <td className={tableTdStyle}>宅配</td>
        <td className={tableTdStyle}>30000</td>
        <td className={tableTdStyle}>2024/12/23</td>
        <td className={tableTdStyle}>2024/12/25</td>
        <td className={tableTdStyle}>2024/12/31</td>
        <td className={tableTdStyle}>已送達</td>
        <td className={tableTdStyle}>黑貓</td>
        <td className={tableTdStyle}>20241229001</td>
      </tr>
    );
  }

  return (
    <>
      <div className="w-full bg-[#A6A6A6] h-full pt-10">
        <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
          <div className="flex">
            <div className="flex-1 m-4">
              <OrderMonthBarChart />
            </div>
            <div className="flex-1 m-4">
              <OrderCityBarChart />
            </div>
          </div>
          <div className="h-[25%] p-2">
            <div className="flex-row h-[85%]">
              <div className="flex justify-between">
                <div className="flex">
                  <Date className="p-1" />
                  <button className={`${buttonStyle} my-2`}>
                    確認
                  </button>
                </div>
                <div className="m-2">
                  <button className={`${buttonStyle} mr-2 py-2`}>
                    時間排序
                  </button>
                  <button className={`${buttonStyle} mr-2 py-2`}>
                    金額排序
                  </button>
                  <button className={`${buttonStyle} mr-2 py-2`}>
                    狀態排序
                  </button>
                </div>
              </div>
              <div className="flex overflow-auto h-[230%] mt-2">
                <table className="border-2 border-collapse mr-1 whitespace-nowrap">
                  <thead>
                    <tr>
                      <th className={tableThStyle}>訂單編號</th>
                      <th className={tableThStyle}>訂購人</th>
                      <th className={tableThStyle}>訂購城市</th>
                      <th className={tableThStyle}>付款方式</th>
                      <th className={tableThStyle}>出貨方式</th>
                      <th className={tableThStyle}>應付金額</th>
                      <th className={tableThStyle}>訂購日</th>
                      <th className={tableThStyle}>出貨日</th>
                      <th className={tableThStyle}>送達日</th>
                      <th className={tableThStyle}>處理進度</th>
                      <th className={tableThStyle}>物流公司</th>
                      <th className={tableThStyle}>物流單號</th>
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
