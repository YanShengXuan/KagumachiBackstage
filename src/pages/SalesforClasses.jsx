import { useState } from "react";
import { Table, Button, Space, Select } from "antd";
import { Link } from "react-router-dom";

function SalesforClasses() {
  const [editingKey, setEditingKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState({});

  // 表單設計:類別對應之活動
  const classSource = [
    {
      key: "1",
      class: "櫃子",
      salenumber: "1",
      salename: "全館櫃子類別商品九折",
    },
    {
      key: "2",
      class: "桌子",
      salenumber: "0",
      salename: "無活動",
    },
    {
      key: "3",
      class: "椅子",
      salenumber: "0",
      salename: "無活動",
    },
    {
      key: "4",
      class: "沙發",
      salenumber: "0",
      salename: "無活動",
    },
    {
      key: "5",
      class: "燈具",
      salenumber: "0",
      salename: "無活動",
    },
    {
      key: "6",
      class: "寢具",
      salenumber: "0",
      salename: "無活動",
    },
  ];

  const classColumns = [
    {
      title: "分類名稱",
      dataIndex: "class",
      key: "class",
      width: "15%",
    },
    {
      title: "活動編號",
      dataIndex: "salenumber",
      key: "salenumber",
      width: "10%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Select
            defaultValue={editingRecord.salenumber}
            options={[
              { label: "0", value: "0" },
              { label: "1", value: "1" },
              { label: "2", value: "2" },
            ]}
            onChange={(e) => handleSelectChange(e, "salenumber")}
          />
        ) : (
          text
        ),
    },
    {
      title: "活動名稱",
      dataIndex: "salename",
      key: "salename",
      width: "45%",
    },
    {
      title: "編輯",
      dataIndex: "editor",
      key: "editor",
      width: "30%",
      render: (_, record) =>
        editingKey === record.key ? (
          <Space>
            <Button onClick={saveChanges} type="primary">
              儲存
            </Button>
            <Button onClick={cancelEditing}>取消</Button>
          </Space>
        ) : (
          <Button onClick={() => startEditing(record)}>編輯</Button>
        ),
    },
  ];

  const startEditing = (record) => {
    setEditingKey(record.key);
    setEditingRecord({ ...record });
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditingRecord({});
  };

  const saveChanges = () => {
    // console.log("Saved record:", editingRecord);
    setEditingKey(null);
  };

  const handleSelectChange = (e, field) => {
    setEditingRecord({
      ...editingRecord,
      [field]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-[#A6A6A6] h-full pt-10">
      <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
        {/*新增切換頁面按鈕*/}
        <div className="text-2xl my-2">
          <Link to="/sales" className="hover:font-bold">
            活動設定
          </Link>
          <span className="m-2">/</span>
          <Link to="/salesforclasses" className="hover:font-bold">
            <span className="bg-[#27333f] p-2 text-white rounded-xl">
              分類活動設定
            </span>
          </Link>
        </div>

        {/* 分隔線 */}
        <hr className="my-4 border-gray-400" />
        <Table
          dataSource={classSource}
          columns={classColumns}
          pagination={false}
          scroll={{
            y: 50 * 10,
          }}
        />
      </div>
    </div>
  );
}

export default SalesforClasses;
