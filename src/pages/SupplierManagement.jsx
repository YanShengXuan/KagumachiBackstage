import { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import Modal from "../components/Modal";

function SupplierManagement() {
  const buttonstyle =
    "mt-1 bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[7%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
  const categories = {
    櫃子: ["衣櫃", "鞋櫃", "書櫃", "櫥櫃", "電視櫃", "浴櫃"],
    桌子: ["餐桌", "茶几", "書桌", "升降桌"],
    椅子: ["餐椅", "椅凳", "辦公椅", "電競椅", "吧檯椅"],
    沙發: ["單人", "雙人", "L型"],
    燈具: ["坎燈", "吊燈", "檯燈", "壁燈"],
    寢具: ["床架", "床墊", "床包/棉被/枕頭"],
  };

  const [supplier, setSupplier] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState({});

  const handleSupplierChange = (e) => setSupplier(e.target.value);
  const handleMainCategoryChange = (e) => setMainCategory(e.target.value);
  const handleSearch = () => {
    // 搜尋廠商API
    console.log({ supplier, mainCategory });
  };
  const switchModal = () => setIsModalOpen(!isModalOpen);

  const dataSource = [
    {
      key: "1",
      number: "1",
      name: "廠商A",
      category: "椅子",
      address: "10 Downing Street",
      phonenumber: "0412345678",
      contactor: "Mr.資",
      status: "上架中",
    },
    {
      key: "2",
      number: "2",
      name: "廠商A",
      category: "椅子",
      address: "10 Downing Street",
      phonenumber: "0412345678",
      contactor: "Mr.資",
      status: "上架中",
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

  const handleInputChange = (e, field) => {
    setEditingRecord({
      ...editingRecord,
      [field]: e.target.value,
    });
  };

  const columns = [
    {
      title: "數量",
      dataIndex: "number",
      key: "number",
      width: "6%",
    },
    {
      title: "廠商名稱",
      dataIndex: "name",
      key: "name",
      width: "9%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
        ) : (
          text
        ),
    },
    {
      title: "分類",
      dataIndex: "category",
      key: "category",
      width: "8%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.category}
            onChange={(e) => handleInputChange(e, "category")}
          />
        ) : (
          text
        ),
    },
    {
      title: "廠商地址",
      dataIndex: "address",
      key: "address",
      width: "25%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.address}
            onChange={(e) => handleInputChange(e, "address")}
          />
        ) : (
          text
        ),
    },
    {
      title: "廠商聯絡電話",
      dataIndex: "phonenumber",
      key: "phonenumber",
      width: "15%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.phonenumber}
            onChange={(e) => handleInputChange(e, "phonenumber")}
          />
        ) : (
          text
        ),
    },
    {
      title: "廠商聯絡人",
      dataIndex: "contactor",
      key: "contactor",
      width: "10%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.contactor}
            onChange={(e) => handleInputChange(e, "contactor")}
          />
        ) : (
          text
        ),
    },
    {
      title: "商品狀態",
      dataIndex: "status",
      key: "status",
      width: "9%",
    },
    {
      title: "編輯",
      dataIndex: "editor",
      key: "editor",
      width: "17%",
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

  return (
    <div className="w-full bg-[#A6A6A6] h-full pt-10">
      <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
        {/* 廠商選單 */}
        <div>
          <label className="block font-medium mb-2">
            廠商:
            <select
              value={supplier}
              onChange={handleSupplierChange}
              className="block mt-1 w-full p-2 rounded border border-gray-300 text-black"
            >
              <option value="">請選擇廠商</option>
              <option value="廠商A">廠商A</option>
              <option value="廠商B">廠商B</option>
              <option value="廠商C">廠商C</option>
            </select>
          </label>
        </div>
        {/* 家具分類 */}
        <div>
          <label className="block font-medium mb-2">
            家具分類:
            <select
              value={mainCategory}
              onChange={handleMainCategoryChange}
              className="block mt-1 w-full p-2 rounded border border-gray-300 text-black"
            >
              <option value="">請選擇分類</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* 搜尋按鈕 */}
        <div>
          <button onClick={handleSearch} className={buttonstyle}>
            搜尋
          </button>
        </div>
        <div>
          {/*新增廠商控制modal開關*/}
          <button onClick={switchModal} className={buttonstyle}>
            新增廠商
          </button>
        </div>
        {/* 分隔線 */}
        <hr className="my-4 border-gray-400" />
        {/* 搜尋結果表格 */}
        <Table dataSource={dataSource} columns={columns} />
      </div>
      {/*modal開關*/}
      {isModalOpen ? <Modal onClose={switchModal} /> : null}
    </div>
  );
}

export default SupplierManagement;
