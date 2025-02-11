import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { Select, Input, InputNumber, Button } from "antd";

import FinancialManagementDate from "../components/Dates.jsx";
import FinanceModalDate from "../components/FinanceModalDate.jsx";
import FinanceItem from "../components/FinanceItem.jsx";

Modal.setAppElement("#root");
const buttonStyle =
  "px-2 my-2 w-32 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
const tableThStyle = "border-2 border-black text-center text-2xl";
const tableTdStyle = "border-2 border-black text-center text-2xl px-6";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    width: "20%",
    height: "40%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
  },
};

function FinancialManagement() {
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
  const [income, setIncome] = useState(new Map());
  const incomeSum = [...income].reduce((acc, [key, value]) => {
    return (acc += value);
  }, 0);
  const [expenditure, setExpenditure] = useState(new Map());
  const expenditureSum = [...expenditure].reduce((acc, [key, value]) => {
    return (acc += value);
  }, 0);
  const [isCheck, setIsCheck] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [modalDate, setModalDate] = useState(null);
  const [modalItem, setModalItem] = useState(null);
  const modalChangeSelect = (value) => {
    setModalItem(value);
  };

  const [modalDetails, setModalDetails] = useState(null);
  const modalChangeDetails = (e) => {
    if (e.target.value.length > 0) {
      setModalDetails(e.target.value);
    } else {
      setModalDetails(null);
    }
  };
  const [modalMoney, setModalMoney] = useState(null);
  const modalChangeMoney = (value) => {
    setModalMoney(value);
  };

  const modalData = {
    date: modalDate,
    item: modalItem,
    details: modalDetails,
    money: modalMoney,
  };

  const handleEdit = (id, itemData) => {
    setFinanceData(
      financeData.map((data) => (data.financeid === id ? itemData : data))
    );
  };

  const financeBetweenUrl = "http://localhost:8080/finance/between";
  const financeRangUrl = "http://localhost:8080/finance/item";
  const financeCreateUrl = "http://localhost:8080/finance/create";
  const financeReviseUrl = "http://localhost:8080/finance/revise";

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
        setIncome(new Map());
        setExpenditure(new Map());
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
        setIncome(new Map());
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
        setExpenditure(new Map());
        setFinanceData(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

  const financeCreate = () => {
    fetch(financeCreateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modalData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        }
      })
      .then(() => {
        setModalIsOpen(false);
        setModalDate(null);
        setModalItem(null);
        setModalDetails(null);
        setModalMoney(null);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const financeRevise = (props) => {
    fetch(financeReviseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        }
      })
      .then(() => {
        financeBetween();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      <div className="w-full bg-[#A6A6A6] h-full pt-10">
        <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
          <div className="flex flex-col ">
            <div className="flex justify-between">
              <div className="flex">
                <FinancialManagementDate
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
                <button
                  className={
                    (startDate != null) | (endDate != null)
                      ? `${buttonStyle}`
                      : `${buttonStyle} cursor-not-allowed`
                  }
                  onClick={financeBetween}
                  disabled={(startDate == null) | (endDate == null)}
                >
                  確認
                </button>
              </div>
              <div className="flex">
                <button
                  className={
                    (startDate != null) | (endDate != null)
                      ? `ml-8 ${buttonStyle}`
                      : `ml-8 ${buttonStyle} cursor-not-allowed`
                  }
                  disabled={(startDate == null) | (endDate == null)}
                  onClick={financeRangeExpenditure}
                >
                  支出篩選
                </button>
                <button
                  className={
                    (startDate != null) | (endDate != null)
                      ? `ml-8 ${buttonStyle}`
                      : `ml-8 ${buttonStyle} cursor-not-allowed`
                  }
                  disabled={(startDate == null) | (endDate == null)}
                  onClick={financeRangeIncome}
                >
                  收入篩選
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center overflow-y-auto h-[80%]">
            <table className="border-2 border-collapse w-[100%]">
              <thead>
                <tr>
                  <th className={`${tableThStyle} w-[20%]`}>日期</th>
                  <th className={`${tableThStyle} w-[20%]`}>項目</th>
                  <th className={`${tableThStyle} w-[30%]`}>明細</th>
                  <th className={`${tableThStyle} w-[20%]`}>金額</th>
                  {/* <th className={`${tableThStyle} w-[10%]`}></th> */}
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
                    handleEdit={handleEdit}
                    financeRevise={financeRevise}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <button className={`${buttonStyle} py-2 mt-5`} onClick={openModal}>
              新增
            </button>
            <div className="text-right text-4xl pr-4 pt-4">
              <span>總收入：{incomeSum}</span>
              <span className="pl-10">總支出：{expenditureSum}</span>
              <span className="pl-10 pr-10">
                小計:{incomeSum - expenditureSum}
              </span>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="新增支出或收入"
        >
          <div className="flex-col">
            <div>
              <p className="">日期：</p>
              <FinanceModalDate setModalDate={setModalDate} />
            </div>
            <div>
              <p>項目：</p>
              <Select
                onChange={modalChangeSelect}
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "支出",
                    label: "支出",
                  },
                  {
                    value: "收入",
                    label: "收入",
                  },
                ]}
              />
            </div>
            <div>
              <p>明細：</p>
              <Input
                placeholder="請輸入內容"
                style={{
                  width: 200,
                }}
                onChange={modalChangeDetails}
              />
            </div>
            <div>
              <p>金額：</p>
              <InputNumber
                min={0}
                max={10000000}
                defaultValue={0}
                onChange={modalChangeMoney}
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button
                type="primary"
                className={
                  (modalDate != null) &
                  (modalItem != null) &
                  (modalDetails != null) &
                  (modalMoney != null)
                    ? `mr-4`
                    : `mr-4 cursor-not-allowed`
                }
                disabled={
                  (modalDate == null) |
                  (modalItem == null) |
                  (modalDetails == null) |
                  (modalMoney == null)
                }
                onClick={financeCreate}
              >
                確認
              </Button>
              <Button onClick={closeModal}>取消</Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default FinancialManagement;
