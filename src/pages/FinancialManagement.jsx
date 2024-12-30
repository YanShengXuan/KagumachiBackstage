import Date from "../components/Date.jsx";

function FinancialManagement() {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <tr key={i + 1}>
        <td className="border-2 border-black text-center text-4xl px-6">2024-12-31</td>
        <td className="border-2 border-black text-center text-4xl px-6">123</td>
        <td className="border-2 border-black text-center text-4xl px-6">123</td>
        <td className="border-2 border-black text-center text-4xl px-6">123</td>
      </tr>
    );
  }

  return (
    <>
      <div className="bg-color2 h-[100%] pt-10">
        <div className="flex flex-col">
          <div className="flex">
            <Date />
            <button className="px-2 my-2 w-32 bg-amber-600 text-black rounded hover:bg-lime-600">
              確認
            </button>
          </div>
        </div>
        <div className="flex justify-center overflow-y-auto h-[80%]">
          <table className="border-2 border-collapse w-[100%]">
            <thead>
              <tr>
                <th className="border-2 border-black text-center text-4xl w-[25%]">日期</th>
                <th className="border-2 border-black text-center text-4xl w-[25%]">支出</th>
                <th className="border-2 border-black text-center text-4xl w-[25%]">收入</th>
                <th className="border-2 border-black text-center text-4xl w-[25%]">淨利</th>
              </tr>
            </thead>
            {/* 測試內容 */}
            <tbody>{rows}</tbody>
            {/* 測試內容 */}
          </table>
        </div>
        <div className="text-right text-4xl pr-4">小計:10</div>
      </div>
    </>
  );
}

export default FinancialManagement;
