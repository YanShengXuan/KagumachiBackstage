import Date from "../components/Date.jsx";

function FinancialManagement() {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <tr key={i + 1}>
        <td className="border-2 border-black text-center text-4xl px-6">
          2024-12-31
        </td>
        <td className="border-2 border-black text-center text-4xl px-6">
          支出
        </td>
        <td className="border-2 border-black text-center text-4xl px-6">
          餐費
        </td>
        <td className="border-2 border-black text-center text-4xl px-6">300</td>
      </tr>
    );
  }

  return (
    <>
      <div className="w-full bg-[#A6A6A6] h-full pt-10">
        <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
          <div className="flex flex-col ">
            <div className="flex">
              <Date />
              <button className="px-2 my-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]">
                確認
              </button>
              <button className="px-2 my-2 ml-8 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]">
                支出篩選
              </button>
              <button className="px-2 my-2 ml-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]">
                收入篩選
              </button>
            </div>
          </div>
          <div className="flex justify-center overflow-y-auto h-[80%]">
            <table className="border-2 border-collapse w-[100%]">
              <thead>
                <tr>
                  <th className="border-2 border-black text-center text-4xl w-[25%]">
                    日期
                  </th>
                  <th className="border-2 border-black text-center text-4xl w-[25%]">
                    項目
                  </th>
                  <th className="border-2 border-black text-center text-4xl w-[25%]">
                    明細
                  </th>
                  <th className="border-2 border-black text-center text-4xl w-[25%]">
                    金額
                  </th>
                </tr>
              </thead>
              {/* 測試內容 */}
              <tbody>{rows}</tbody>
              {/* 測試內容 */}
            </table>
          </div>
          <div className="text-right text-4xl pr-4">
            <span>總支出：</span>
            <span className="pl-10">總收入：</span>
            <span className="pl-10 pr-10">小計:10</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FinancialManagement;
