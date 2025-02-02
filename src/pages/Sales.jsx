import { useEffect, useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import WarningModal from "../components/WarningModal";

function Sales() {
  const buttonstyle =
    "mb-2 bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[7%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";

  const [editingKey, setEditingKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState({});

  const [saleSource, setSaleSource] = useState([]);
  const [total, setTotal] = useState(0); // 儲存資料總數

  // 新增的Modal相關
  const initialFormData = {
    saleName: "",
    saleDescription: "",
    discount: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const switchModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData(initialFormData);
  };
  const handleModalInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // 提示的Modal相關
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // 顯示活動
  useEffect(() => {
    fetch("http://localhost:8080/sales/getallsales")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => ({
          key: index + 1,
          salenumber: item.salesid,
          saleid: item.salesid,
          salename: item.name,
          saledesc: item.salesdesc,
          discount: item.discount,
        }));
        setSaleSource(formattedData);
        setTotal(data.length);
      })
      .catch((error) => console.error("Error Get Sales:", error));
  }, []);

  // 新增活動至資料庫
  const handleSaleModalSubmit = () => {
    console.log(formData);
    fetch("http://localhost:8080/sales/addsale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Updating Supplier Error:", error);
      });
    // 關閉 Modal
    setIsModalOpen(false);
  };

  // 分頁設定
  const paginationProps = {
    pageSize: 6,
    showTotal: (total) => `總共 ${total} 項`,
    total: total,
  };

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
      // render: (text, record) =>
      //   editingKey === record.key ? (
      //     <Input
      //       value={editingRecord.discount}
      //       onChange={(e) => handleInputChange(e, "discount")}
      //     />
      //   ) : (
      //     text
      //   ),
    },
    {
      title: "編輯",
      dataIndex: "editor",
      key: "editor",
      width: "30%",
      render: (_, record) => {
        // 判斷當 key === 1 時，不顯示按鈕
        if (record.key === 1) {
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
            <Button onClick={() => deleteSale(record)}>刪除</Button>
          </Space>
        );
      },
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
    fetch("http://localhost:8080/sales/updatesale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingRecord),
    })
      .then((response) => response.json)
      .then(() => {})
      .catch((error) => {
        console.error("Updating Sale Error:", error);
      });
    setSaleSource((prevData) =>
      prevData.map((item) =>
        item.key === editingKey ? { ...item, ...editingRecord } : item
      )
    );
    setEditingKey(null);
  };

  const deleteSale = (record) => {
    fetch("http://localhost:8080/sales/deletesale", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "Failed to delete sale");
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (error.message.includes("目前該活動被使用中")) {
          setWarningMessage("目前該活動被使用中，無法直接刪除");
          setWarningModalOpen(true);
        } else {
          setWarningMessage("刪除失敗，請稍後再試");
          setWarningModalOpen(true);
        }
      });
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

      {/* 刪除失敗警告Modal */}
      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        title="刪除失敗"
        message={warningMessage}
      />

      {/*新增的Modal開關*/}
      {isModalOpen && (
        <Modal
          onClose={switchModal}
          onSubmit={handleSaleModalSubmit}
          title="新增活動"
        >
          <div>
            活動名稱：
            <input
              type="text"
              className="border rounded mt-1"
              value={formData.saleName}
              onChange={(e) => handleModalInputChange(e, "saleName")}
              required
            />
            <br />
            活動敘述：
            <input
              type="text"
              className="border rounded mt-1 w-full h-24 p-2"
              value={formData.saleDescription}
              onChange={(e) => handleModalInputChange(e, "saleDescription")}
            />
            <br />
            折扣值：
            <input
              type="text"
              className="border rounded mt-1"
              value={formData.discount}
              onChange={(e) => handleModalInputChange(e, "discount")}
              required
              pattern="^\d+(\.\d{1,2})?$"
              title="請輸入有效的小數"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Sales;
