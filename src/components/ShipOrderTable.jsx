import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const ShipOrderTable = () => {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/shiporder');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.map((item, index) => ({ ...item, key: index.toString() })));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "訂單編號",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => <Link to="../../orderManagement">{text}</Link>,
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
