import { useState } from "react";

import OrderMonthBarChart from "../components/OrderMonthBarChart.jsx";
import OrderCityBarChart from "../components/OrderCityBarChart.jsx";
import Dates from "../components/Dates.jsx";
import OrderItem from "../components/OrderItem.jsx";

const buttonStyle =
  "px-16 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
const tableThStyle = "border-2 border-black text-center text-xl";

function OrderManagement() {
  const [orderData, setOrderData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dateRange = {
    startDate: startDate,
    endDate: endDate,
  };

  const orderBetweenUrl = "http://localhost:8080/order/between";
  const orderTotalPriceASCUrl = "http://localhost:8080/order/totalpriceASC";
  const orderStatusASCUrl = "http://localhost:8080/order/totalpriceASC";
  const ordersBetween = () => {
    fetch(orderBetweenUrl, {
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
        setOrderData(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

  const orderstotalpriceASC = () => {
    fetch(orderTotalPriceASCUrl, {
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
        setOrderData(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };
  const orderStatusASC = () => {
    fetch(orderStatusASCUrl, {
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
        setOrderData(data);
      })
      .catch((error) => {
        console.Error(error.message);
      });
  };

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
                  <Dates
                    className="p-1"
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                  <button
                    className={
                      (startDate != null) | (endDate != null)
                        ? `${buttonStyle} my-2`
                        : `${buttonStyle} my-2 cursor-not-allowed`
                    }
                    disabled={(startDate == null) | (endDate == null)}
                    onClick={ordersBetween}
                  >
                    確認
                  </button>
                </div>
                <div className="m-2">
                  <button
                    className={
                      (startDate != null) | (endDate != null)
                        ? `${buttonStyle} mr-2 py-2`
                        : `${buttonStyle} mr-2 py-2 cursor-not-allowed`
                    }
                    disabled={(startDate == null) | (endDate == null)}
                    onClick={orderstotalpriceASC}
                  >
                    金額排序
                  </button>
                  <button
                    className={
                      (startDate != null) | (endDate != null)
                        ? `${buttonStyle} mr-2 py-2`
                        : `${buttonStyle} mr-2 py-2 cursor-not-allowed`
                    }
                    disabled={(startDate == null) | (endDate == null)}
                    onClick={orderStatusASC}
                  >
                    狀態排序
                  </button>
                </div>
              </div>
              <div className="flex overflow-auto h-[220%] mt-2">
                <table className="border-2 border-collapse mr-1 w-[100%]">
                  <thead>
                    <tr>
                      <th className={tableThStyle}>訂購日</th>
                      <th className={tableThStyle}>訂單編號</th>
                      <th className={tableThStyle}>訂購人</th>
                      <th className={tableThStyle}>訂購城市</th>
                      <th className={tableThStyle}>付款方式</th>
                      <th className={tableThStyle}>應付金額</th>
                      <th className={tableThStyle}>處理進度</th>
                      <th className={tableThStyle}>物流單號</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((data) => (
                      <OrderItem
                        key={data.orderid}
                        id={data.orderid}
                        date={data.orderdate}
                        orderSerial={data.orderserial}
                        name={data.member.realname}
                        city={data.member.city}
                        payMethod={data.paymentmethod}
                        totalPrice={data.totalprice}
                        status={data.orderstatus}
                        logisticsSerial={data.logisticsnumber}
                      />
                    ))}
                  </tbody>
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
