import React, { useState } from "react";
import { Table, InputNumber, Button, Input } from "antd";

const ShipRateTable = () => {
  // ===========================
  const data = [
    { key: "1", region: "台北", rate: 1000 },
    { key: "2", region: "新北", rate: 1000 },
    { key: "3", region: "桃園", rate: 1000 },
    { key: "4", region: "宜蘭", rate: 1000 },
    { key: "5", region: "新竹", rate: 1100 },
    { key: "6", region: "苗栗", rate: 1100 },
    { key: "7", region: "台中", rate: 1200 },
    { key: "8", region: "彰化", rate: 1200 },
    { key: "9", region: "南投", rate: 1300 },
    { key: "10", region: "雲林", rate: 1300 },
    { key: "11", region: "嘉義", rate: 1400 },
    { key: "12", region: "台南", rate: 1400 },
    { key: "13", region: "高雄", rate: 1500 },
    { key: "14", region: "屏東", rate: 1600 },
    { key: "15", region: "台東", rate: 1700 },
    { key: "16", region: "花蓮", rate: 1800 },
    { key: "17", region: "澎湖", rate: 2000 },
    { key: "18", region: "金門", rate: 2000 },
    { key: "19", region: "馬祖", rate: 2000 },
  ];
  // ===========================

  const [shippingRates, setShippingRates] = useState(data);

  const [editingKey, setEditingKey] = useState("");
  const [editingRate, setEditingRate] = useState(0);
  const [editingRegion, setEditingRegion] = useState("");

  const handleEdit = (record) => {
    setEditingKey(record.key);
    setEditingRate(record.rate);
    setEditingRegion(record.region);
  };

  const handleSave = (key) => {
    const updatedRates = shippingRates.map((item) =>
      item.key === key ? { ...item, rate: editingRate, region: editingRegion } : item
    );
    setShippingRates(updatedRates);
    setEditingKey("");
  };

  const columns = [
    {
      title: "地區",
      dataIndex: "region",
      key: "region",
      render: (text, record) => (
        editingKey === record.key ? (
          <Input
            value={editingRegion}
            onChange={(e) => setEditingRegion(e.target.value)}
          />
        ) : (
          text
        )
      ),
    },
    {
      title: "金額",
      dataIndex: "rate",
      key: "rate",
      render: (text, record) => (
        editingKey === record.key ? (
          <InputNumber
            value={editingRate}
            onChange={(value) => setEditingRate(value)}
          />
        ) : (
          text
        )
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        editingKey === record.key ? (
          <Button onClick={() => handleSave(record.key)}>Save</Button>
        ) : (
          <Button onClick={() => handleEdit(record)}>Edit</Button>
        )
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table 
        dataSource={shippingRates} 
        columns={columns} 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default ShipRateTable;
