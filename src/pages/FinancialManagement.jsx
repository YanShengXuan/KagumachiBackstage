import { useState, useEffect, useRef } from "react";
import Date from "../components/Date.jsx";
import FinanceItem from "../components/FinanceItem.jsx";

function FinancialManagement() {
  const buttonStyle =
    "px-2 my-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
  const tableThStyle = "border-2 border-black text-center text-2xl w-[25%]";
  const tableTdStyle = "border-2 border-black text-center text-2xl px-6";
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dateRange = { startDate: startDate, endDate: endDate };
  const dateRangeIncome = {
    startDate: startDate,
    endDate: endDate,
    item: "收入",
  };
  const dateRangeExpenditure = {
    startDate: startDate,
    endDate: endDate,
    item: "支出",
  };
  const [financeData, setFinanceData] = useState([]);
  const [income, setIncome] = useState([]);
  const incomeSum = income.reduce((sum, value) => sum + value, 0);
  const [expenditure, setExpenditure] = useState([]);
  const expenditureSum = expenditure.reduce((sum, value) => sum + value, 0);
  const [isCheck, setIsCheck] = useState(false);

  const financeBetweenUrl = "http://localhost:8080/finance/between";
  const financeRangUrl = "http://localhost:8080/finance/item";

  const financeBetween = () => {
    setIsCheck(true);
    fetch(financeBetweenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateRange),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setIncome([]);
        setExpenditure([]);
        setFinanceData(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

  const financeRangeIncome = () => {
    setIsCheck(false);
    fetch(financeRangUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateRangeIncome),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setFinanceData(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

  const financeRangeExpenditure = () => {
    setIsCheck(false);
    fetch(financeRangUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateRangeExpenditure),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setFinanceData(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

  return (
    <>
      <div className="w-full bg-[#A6A6A6] h-full pt-10">
        <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
          <div className="flex flex-col ">
            <div className="flex">
              <Date setStartDate={setStartDate} setEndDate={setEndDate} />
              <button
                className={
                  startDate == null || endDate == null
                    ? `${buttonStyle} cursor-not-allowed`
                    : `${buttonStyle}`
                }
                onClick={financeBetween}
                disabled={startDate == null || endDate == null}
              >
                確認
              </button>
              <button
                className={
                  financeData.length > 0
                    ? `ml-8 ${buttonStyle}`
                    : `ml-8 ${buttonStyle} cursor-not-allowed`
                }
                disabled={financeData.length <= 0}
                onClick={financeRangeExpenditure}
              >
                支出篩選
              </button>
              <button
                className={
                  financeData.length > 0
                    ? `ml-8 ${buttonStyle}`
                    : `ml-8 ${buttonStyle} cursor-not-allowed`
                }
                disabled={financeData.length <= 0}
                onClick={financeRangeIncome}
              >
                收入篩選
              </button>
            </div>
          </div>
          <div className="flex justify-center overflow-y-auto h-[80%]">
            <table className="border-2 border-collapse w-[100%]">
              <thead>
                <tr>
                  <th className={tableThStyle}>日期</th>
                  <th className={tableThStyle}>項目</th>
                  <th className={tableThStyle}>明細</th>
                  <th className={tableThStyle}>金額</th>
                </tr>
              </thead>
              <tbody>
                {financeData.map((data) => (
                  <FinanceItem
                    tableTdStyle={tableTdStyle}
                    key={data.financeid}
                    id={data.financeid}
                    date={data.date}
                    item={data.item}
                    details={data.details}
                    money={data.money}
                    isCheck={isCheck}
                    setIncome={setIncome}
                    setExpenditure={setExpenditure}
                    financeBetween={financeBetween}
                    financeData={financeData}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right text-4xl pr-4 pt-4">
            <span>總收入：{incomeSum}</span>
            <span className="pl-10">總支出：{expenditureSum}</span>
            <span className="pl-10 pr-10">
              小計:{incomeSum - expenditureSum}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FinancialManagement;
