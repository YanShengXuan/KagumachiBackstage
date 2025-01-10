import { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { Link } from "react-router-dom";

function Sales() {
  const buttonstyle =
    "mb-2 bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[7%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";

  const [editingKey, setEditingKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const switchModal = () => setIsModalOpen(!isModalOpen);

  // 分頁設定
  const paginationProps = {
    pageSize: 6,
    showTotal: (total) => `總共 ${total} 項`,
    total: 7,
  };

  // 表單設計:新增/編輯優惠活動
  const saleSource = [
    {
      key: "1",
      salenumber: "0",
      salename: "無活動",
      saledesc: "無活動說明",
      discount: "1",
    },
    {
      key: "2",
      salenumber: "1",
      salename: "全館櫃子類別商品九折",
      saledesc: "全館櫃子類別商品九折的活動目的",
      discount: "0.9",
    },
    {
      key: "3",
      salenumber: "2",
      salename: "全館椅子類別商品八折",
      saledesc: "全館椅子類別商品八折的活動目的",
      discount: "0.8",
    },
    {
      key: "4",
      salenumber: "3",
      salename: "測試活動三",
      saledesc: "測試活動三敘述",
      discount: "0.5",
    },
    {
      key: "5",
      salenumber: "4",
      salename: "測試活動四",
      saledesc: "測試活動四敘述",
      discount: "0.5",
    },
    {
      key: "6",
      salenumber: "5",
      salename: "測試活動五",
      saledesc: "測試活動五敘述",
      discount: "0.5",
    },
    {
      key: "7",
      salenumber: "6",
      salename: "測試活動六",
      saledesc: "測試活動六敘述",
      discount: "0.5",
    },
  ];

  const saleColumns = [
    {
      title: "活動編號",
      dataIndex: "salenumber",
      key: "salenumber",
      width: "10%",
    },
    {
      title: "活動名稱",
      dataIndex: "salename",
      key: "salename",
      width: "20%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.salename}
            onChange={(e) => handleInputChange(e, "salename")}
          />
        ) : (
          text
        ),
    },
    {
      title: "活動敘述",
      dataIndex: "saledesc",
      key: "saledesc",
      width: "35%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.saledesc}
            onChange={(e) => handleInputChange(e, "saledesc")}
          />
        ) : (
          text
        ),
    },
    {
      title: "折扣值",
      dataIndex: "discount",
      key: "discount",
      width: "15%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={editingRecord.discount}
            onChange={(e) => handleInputChange(e, "discount")}
          />
        ) : (
          text
        ),
    },
    {
      title: "編輯",
      dataIndex: "editor",
      key: "editor",
      width: "30%",
      render: (_, record) => {
        // 判斷當 key === 1 時，不顯示按鈕
        if (record.key === "1") {
          return null; // 不渲染任何內容
        }

        return editingKey === record.key ? (
          <Space>
            <Button onClick={saveChanges} type="primary">
              儲存
            </Button>
            <Button onClick={cancelEditing}>取消</Button>
          </Space>
        ) : (
          <Space>
            <Button onClick={() => startEditing(record)}>編輯</Button>
            <Button onClick={() => startDeleting(record)}>刪除</Button>
          </Space>
        );
      },
    },
  ];

  const startEditing = (record) => {
    setEditingKey(record.key);
    setEditingRecord({ ...record });
  };

  const startDeleting = (record) => {
    console.log(record);
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

  return (
    <div className="w-full bg-[#A6A6A6] h-full pt-10">
      <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
        {/*新增切換頁面按鈕*/}
        <div className="text-2xl my-2">
          <Link to="/sales" className="hover:font-bold">
            <span className="bg-[#27333f] p-2 text-white rounded-xl">
              活動設定
            </span>
          </Link>
          <span className="m-2">/</span>
          <Link to="/salesforclasses" className="hover:font-bold">
            分類活動設定
          </Link>
        </div>

        {/* 分隔線 */}
        <hr className="my-3 border-gray-400" />
        {/*新增廠商控制modal開關*/}
        <button onClick={switchModal} className={buttonstyle}>
          新增活動
        </button>
        <Table
          dataSource={saleSource}
          columns={saleColumns}
          pagination={paginationProps}
          scroll={{
            y: 50 * 10,
          }}
        />
      </div>
    </div>
  );
}

export default Sales;
