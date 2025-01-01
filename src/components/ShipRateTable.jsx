import React, { useState, useEffect } from "react";
import { Table, InputNumber, Button, Input, Form } from "antd";

 // ====== 測試用初始資料，後端可傳回資料後此段將刪除。 ======
 const data = [
  { region: "台北", rate: 1000 },
  { region: "新北", rate: 1000 },
  { region: "桃園", rate: 1000 },
  { region: "宜蘭", rate: 1000 },
  { region: "新竹", rate: 1100 },
  { region: "苗栗", rate: 1100 },
  { region: "台中", rate: 1200 },
  { region: "彰化", rate: 1200 },
  { region: "南投", rate: 1300 },
  { region: "雲林", rate: 1300 },
  { region: "嘉義", rate: 1400 },
  { region: "台南", rate: 1400 },
  { region: "高雄", rate: 1500 },
  { region: "屏東", rate: 1600 },
  { region: "台東", rate: 1700 },
  { region: "花蓮", rate: 1800 },
  { region: "澎湖", rate: 2000 },
  { region: "金門", rate: 2000 },
  { region: "馬祖", rate: 2000 },
];
// ====== 測試用初始資料，後端可傳回資料後此段將刪除。 ======

const ShipRateTable = () => {
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
  //       const data = await response.json();
  //       setData(data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // ====== 向後端拿初始資料，後端可傳回資料後此段將取消註解。 ======

  const [shippingRates, setShippingRates] = useState(data.map((item, index) => ({ ...item, key: index.toString() })));
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

    // 按下 save 將資料傳遞到後端
    // try {
    //   const response = await fetch('後端url', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(updatedRates.find(item => item.key === key)),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const result = await response.json();
    //   console.log('Success:', result);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
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
      render: (text, record) => {
        const editable = editingKey === record.key;
        return editable ? (
          <Form.Item name="region" className="m-0" initialValue={text}>
            <Input.TextArea
              value={editingRegion}
              onChange={(e) => setEditingRegion(e.target.value)}
              autoSize={{ minRows: 1, maxRows: 6 }}
              className="whitespace-pre-wrap break-words"
            />
          </Form.Item>
        ) : (
          <div className="whitespace-pre-wrap break-words">{text}</div>
        );
      },
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
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </span>
        ) : (
          <Button onClick={() => handleEdit(record)}>Edit</Button>
        ),
    },
  ];

  return (
    <div className="p-4">
      <Form component={false}>
        <Table
          dataSource={shippingRates}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Form>
    </div>
  );
};

export default ShipRateTable;
