import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const ShipOrderTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [logisticsNumber, setLogisticsNumber] = useState("");
  const buttonstyle = "mb-2 bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[7%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/shiporder');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.map((item, index) => ({ ...item, key: index.toString() })));
      setFilteredData(result.map((item, index) => ({ ...item, key: index.toString() })));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderNumberSearch = () => {
    const filtered = data.filter(item => 
      item.orderNumber.includes(orderNumber)
    );
    setFilteredData(filtered);
  };

  const handleLogisticsNumberSearch = () => {
    const filtered = data.filter(item => 
      item.logisticsNumber.includes(logisticsNumber)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "訂單編號",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text, record) => (
        <Link 
          to={{
            pathname: "/orderManagement",
          }} 
          state={{ orderId: record.orderid }}
        >
          {record.orderNumber}
        </Link>
      ),
    },
    {
      title: "訂購日期",
      dataIndex: "orderdate",
      key: "orderdate",
    },
    {
      title: "出貨日期",
      dataIndex: "deliverydate",
      key: "deliverydate",
    },
    {
      title: "(預計)送達日期",
      dataIndex: "estimateddeliverydate",
      key: "estimateddeliverydate",
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
    }
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <label>訂單編號: </label>
        <Input
          placeholder="以訂單編號搜尋"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="w-52 mr-4"
        />
        <Button
          icon={<SearchOutlined />}
          onClick={handleOrderNumberSearch}
          className={buttonstyle}
        >
          搜尋
        </Button>
        <br />
        <label>物流編號: </label>
        <Input
          placeholder="以物流編號搜尋"
          value={logisticsNumber}
          onChange={(e) => setLogisticsNumber(e.target.value)}
          className="w-52 mr-4"
        />
        <Button
          icon={<SearchOutlined />}
          onClick={handleLogisticsNumberSearch}
          className={buttonstyle}
        >
          搜尋
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ShipOrderTable;
