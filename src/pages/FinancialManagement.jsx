import Date from "../components/Date.jsx";

function FinancialManagement() {
  return (
    <>
      <div className="flex bg-gray-400 h-screen">
        <div className="basis-1/4 border-2 border-black text-center">
          我是選單
        </div>
        <div className="flex flex-col basis-3/4 border-2 border-black">
          <div className="flex">
            <Date />
            <button className="px-2 my-2 w-32 bg-amber-600 text-black rounded hover:bg-lime-600">
              確認
            </button>
            <select className="w-[25%] h-[75%] mt-1.5 ml-2 text-center text-2xl" name="" id="">
              <option value="">支出</option>
              <option value="">收入</option>
              <option value="">淨利</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default FinancialManagement;
