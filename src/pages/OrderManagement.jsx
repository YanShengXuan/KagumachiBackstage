import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import OrderMonthBarChart from "../components/OrderMonthBarChart.jsx";
import OrderCityBarChart from "../components/OrderCityBarChart.jsx";
import Dates from "../components/Dates.jsx";
import OrderItem from "../components/OrderItem.jsx";

const buttonStyle =
  "px-16 rounded-xl bg-[rgb(83,87,89)] text-white hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
const tableThStyle = "border-2 border-black text-center text-xl";

function OrderManagement() {
  const tempOrderId = useLocation();
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState(0);
  const [orderMemberData, setOrderMemberData] = useState([]);
  const [tempOrderIdState, setTempOrderIdState] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    if (tempOrderId.state != null) {
      setTempOrderIdState(true);
      setOrderId(tempOrderId.state?.orderId);
    } else {
      setTempOrderIdState(false);
      setOrderId();
    }
  }, [tempOrderId]);

  useEffect(() => {
    if (tempOrderId.state != null) {
      setOrderId(tempOrderId.state?.orderId);
      fetch(orderMemberUrl, { method: "GET" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error:" + response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setOrderMemberData(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [orderId]);

  const dateRange = {
    startDate: startDate,
    endDate: endDate,
  };

  const orderMemberUrl = `http://localhost:8080/order/member/${orderId}`;
  const orderBetweenUrl = "http://localhost:8080/order/between";
  const orderTotalPriceASCUrl = "http://localhost:8080/order/totalpriceASC";
  const orderStatusASCUrl = "http://localhost:8080/order/totalpriceASC";

  const ordersBetween = () => {
    setTempOrderIdState(false);
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
  const showOrderData =
    tempOrderIdState != true
      ? orderData.map((data) => (
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
        ))
      : orderMemberData.map((data) => (
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
        ));
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
                      <th className={`${tableThStyle} w-[12%]`}>訂購日</th>
                      <th className={`${tableThStyle} w-[13%]`}>訂單編號</th>
                      <th className={`${tableThStyle} w-[8%]`}>訂購人</th>
                      <th className={`${tableThStyle} w-[10%]`}>訂購城市</th>
                      <th className={`${tableThStyle} w-[10%]`}>付款方式</th>
                      <th className={`${tableThStyle} w-[20%]`}>應付金額</th>
                      <th className={`${tableThStyle} w-[8%]`}>處理進度</th>
                      <th className={`${tableThStyle} w-[19%]`}>物流單號</th>
                    </tr>
                  </thead>
                  <tbody>{showOrderData}</tbody>
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
