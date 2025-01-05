import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

// ====== 測試用初始資料，後端可傳回資料後此段將刪除。 ======
const data = [
  {
    key: "1",
    orderNumber: "241119011501",
    logisticsCompany: "黑貓宅急便",
    logisticsNumber: "1002-6790-5761",
  },
  {
    key: "2",
    orderNumber: "241119011502",
    logisticsCompany: "宅配通",
    logisticsNumber: "1212-3434-5656",
  },
  {
    key: "3",
    orderNumber: "241119011503",
    logisticsCompany: "嘉里大榮",
    logisticsNumber: "8787-9090-2121",
  },
  {
    key: "4",
    orderNumber: "241119011501",
    logisticsCompany: "黑貓宅急便",
    logisticsNumber: "1002-6790-5761",
  },
  {
    key: "5",
    orderNumber: "241119011502",
    logisticsCompany: "宅配通",
    logisticsNumber: "1212-3434-5656",
  },
  {
    key: "6",
    orderNumber: "241119011503",
    logisticsCompany: "嘉里大榮",
    logisticsNumber: "8787-9090-2121",
  },
  {
    key: "7",
    orderNumber: "241119011501",
    logisticsCompany: "黑貓宅急便",
    logisticsNumber: "1002-6790-5761",
  },
  {
    key: "8",
    orderNumber: "241119011502",
    logisticsCompany: "宅配通",
    logisticsNumber: "1212-3434-5656",
  },
  {
    key: "9",
    orderNumber: "241119011503",
    logisticsCompany: "嘉里大榮",
    logisticsNumber: "8787-9090-2121",
  },
  {
    key: "10",
    orderNumber: "241119011501",
    logisticsCompany: "黑貓宅急便",
    logisticsNumber: "1002-6790-5761",
  },
  {
    key: "12",
    orderNumber: "241119011502",
    logisticsCompany: "宅配通",
    logisticsNumber: "1212-3434-5656",
  },
  {
    key: "13",
    orderNumber: "241119011503",
    logisticsCompany: "嘉里大榮",
    logisticsNumber: "8787-9090-2121",
  },
];
// ====== 測試用初始資料，後端可傳回資料後此段將刪除。 ======

const ShipOrderTable = () => {
  // ====== 向後端拿初始資料，後端可傳回資料後此段將取消註解。 ======
  // const [data, setData] = useState([]);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('後端url');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const result = await response.json();
  //       setData(result.map((item, index) => ({ ...item, key: index.toString() })));
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // ====== 向後端拿初始資料，後端可傳回資料後此段將取消註解。 ======

  const columns = [
    {
      title: "訂單編號",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => <Link to="../orderManagement">{text}</Link>,
    },
    {
      title: "物流公司",
      dataIndex: "logisticsCompany",
      key: "logisticsCompany",
    },
    {
      title: "物流編號",
      dataIndex: "logisticsNumber",
      key: "logisticsNumber",
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ShipOrderTable;
