import React, { useState, useEffect } from "react";
import { Table, InputNumber, Button, Form } from "antd";

const ShipRateTable = () => {
  const [data, setData] = useState([]);
  const [shippingRates, setShippingRates] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/shiprate");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      setShippingRates(
        data.map((item, index) => ({ ...item, key: index.toString() }))
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [editingKey, setEditingKey] = useState("");
  const [editingRate, setEditingRate] = useState(0);
  const [editingRegion, setEditingRegion] = useState("");

  const handleEdit = (record) => {
    setEditingKey(record.key);
    setEditingRate(record.rate);
    setEditingRegion(record.region);
  };

  const handleSave = async (key) => {
    const updatedRates = shippingRates.map((item) =>
      item.key === key
        ? { ...item, rate: editingRate, region: editingRegion }
        : item
    );
    setShippingRates(updatedRates);
    setEditingKey("");

    try {
      const response = await fetch('http://localhost:8080/shiprate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRates.find(item => item.key === key)),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "地區",
      dataIndex: "region",
      key: "region",
      width: "30%",
      render: (text) => (
        <div className="whitespace-pre-wrap break-words">{text}</div>
      ),
    },
    {
      title: "金額",
      dataIndex: "rate",
      key: "rate",
      width: "30%",
      render: (text, record) =>
        editingKey === record.key ? (
          <InputNumber
            value={editingRate}
            onChange={(value) => setEditingRate(value)}
            className="w-20"
          />
        ) : (
          text
        ),
    },
    {
      title: "編輯",
      key: "action",
      width: "40%",
      render: (text, record) =>
        editingKey === record.key ? (
          <span>
            <Button onClick={() => handleSave(record.key)} className="mr-2">
              儲存
            </Button>
            <Button onClick={handleCancel}>取消</Button>
          </span>
        ) : (
          <Button onClick={() => handleEdit(record)}>編輯</Button>
        ),
    },
  ];

  return (
    <div className="p-4">
      <Form component={false}>
        <Table
          dataSource={shippingRates}
          columns={columns}
          pagination={{ pageSize: 8 }}
        />
      </Form>
    </div>
  );
};

export default ShipRateTable;
