import { useEffect, useState } from "react";
import { Table, Button, Space, Input } from "antd";
import Modal from "../components/Modal";
import {
  Combobox,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";

function SupplierManagement() {
  const buttonstyle =
    "m-1 bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[7%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";

  const [allcategories, setAllcategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openGroup, setOpenGroup] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/subcategories/getall")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllcategories(data);
      });
  }, []);
  const wholeCategories = allcategories.reduce((acc, curr, idx) => {
    const mainGroup = curr.mainCategory.categoryname;
    if (!acc[mainGroup]) acc[mainGroup] = [];
    acc[mainGroup].push({
      id: idx + 1,
      subGroup: curr.categoryname,
      mainGroup: mainGroup,
    });
    return acc;
  }, {});

  const [supplier, setSupplier] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState([]);

  // const [subcategory, setSubcategory] = useState("");
  // const [selectedSubcategory, setSelectedSubcategory] = useState([]);

  const [total, setTotal] = useState(0); // 搜尋到的廠商總數

  // 分頁設定
  const paginationProps = {
    pageSize: 4,
    showTotal: (total) => `總共 ${total} 項`,
    total: total,
  };

  // 廠商資料格式
  const formatData = (data) => {
    return data.map((item, index) => ({
      key: index + 1,
      number: index + 1,
      name: item.name,
      // category: item.subCategory.categoryname,
      category: item.subCategory?.categoryname,
      address: item.address,
      phonenumber: item.phone,
      contactor: item.contact,
      status: item.status,
      supplierid: item.supplierid,
    }));
  };

  // modal相關
  const initialFormData = {
    supplierName: "",
    subcategoryName: "",
    supplierAddress: "",
    supplierPhone: "",
    contactor: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const switchModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData(initialFormData);
    // setSubcategory("");
    setSelected("");
  };
  const handleModalInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const [editingKey, setEditingKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState({});

  const [dataSource, setDataSource] = useState([]);

  // const handleSupplierChange = (e) => setSupplier(e.target.value);
  // const handleCategoryChange = (e) => setSubcategory(e.target.value);
  const handleSupplierChange = (e) => {
    const value = e.target.value === "null" ? null : e.target.value;
    setSupplier(value);
  };

  // 顯示所有廠商
  useEffect(() => {
    try {
      fetch("http://localhost:8080/suppliers/allsuppliers")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setDataSource(formatData(data));
        });
    } catch (error) {
      console.error("Error geting all suppliers:", error);
    }
  }, []);

  // 搜尋廠商
  const handleSearch = () => {
    const payload = {
      supplierName: supplier || null,
      // subcategoryName: subcategory,
      subcategoryName: selected?.subGroup || null,
    };

    fetch("http://localhost:8080/suppliers/getbysearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setDataSource(formatData(data));
        setTotal(data.length);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  };

  // 獲取下拉式廠商名單
  useEffect(() => {
    fetch("http://localhost:8080/suppliers/getallnames")
      .then((response) => response.json())
      .then((data) => {
        setSelectedSupplier(data);
      })
      .catch((error) => console.error("Error fetching supplier names:", error));
  }, []);

  // // 獲取下拉式分類名單
  // useEffect(() => {
  //   fetch("http://localhost:8080/subcategories/getallnames")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSelectedSubcategory(data);
  //     })
  //     .catch((error) => console.error("Error fetching supplier names:", error));
  // }, []);

  // 新增廠商至資料庫
  const handleModalSubmit = () => {
    const payload = {
      supplierName: formData.supplierName,
      subcategoryName: selected?.subGroup || null,
      supplierAddress: formData.supplierAddress,
      supplierPhone: formData.supplierPhone,
      contactor: formData.contactor,
    };

    fetch("http://localhost:8080/suppliers/addsupplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("新增:" + result.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Updating Supplier Error:", error);
      });
    // 關閉 Modal
    setIsModalOpen(false);
  };

  const startEditing = (record) => {
    setEditingKey(record.key);
    setEditingRecord({ ...record });
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditingRecord({});
  };

  // 編輯廠商
  const saveChanges = () => {
    fetch("http://localhost:8080/suppliers/updatesupplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingRecord),
    })
      .then((response) => response.json)
      .then((result) => {
        console.log("Update successful:", result);
      })
      .catch((error) => {
        console.error("Updating Supplier Error:", error);
      });
    setDataSource((prevData) =>
      prevData.map((item) =>
        item.key === editingKey ? { ...item, ...editingRecord } : item
      )
    );
    setEditingKey(null);
  };

  // 刪除廠商
  const deleteSupplier = (record) => {
    fetch("http://localhost:8080/suppliers/deletesupplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete supplier");
        return response.json();
      })
      .then((result) => {
        console.log("刪除:" + result.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Deleting Supplier Error:", error);
      });
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
      // render: (text, record) =>
      //   editingKey === record.key ? (
      //     <Input
      //       value={editingRecord.category}
      //       onChange={(e) => handleInputChange(e, "category")}
      //     />
      //   ) : (
      //     text
      //   ),
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
          <Space>
            <Button onClick={() => startEditing(record)}>編輯</Button>
            <Button onClick={() => deleteSupplier(record)}>刪除</Button>
          </Space>
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
              <option value="null">所有廠商</option>
              {selectedSupplier.map((supplier, index) => (
                <option value={supplier} key={index}>
                  {supplier}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* 家具分類 */}
        <div>
          <label className="block font-medium mb-2">
            家具分類:
            <Combobox
              as="div"
              className="relative"
              value={selected}
              onChange={setSelected}
            >
              <ComboboxButton className="bg-white border p-2 rounded w-full text-left mt-1">
                {selected === null
                  ? "所有分類"
                  : selected.subGroup || "請選擇分類"}
              </ComboboxButton>
              <ComboboxOptions className="absolute z-10 w-full mt-1 bg-white shadow-md border rounded">
                <ComboboxOption
                  value={null}
                  className="px-3 py-1 cursor-pointer bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  所有分類
                </ComboboxOption>
                {Object.entries(wholeCategories).map(([group, items]) => (
                  <div key={group}>
                    {/* 大分類標題 */}
                    <div
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-2 text-gray-700 cursor-pointer flex justify-between"
                      onClick={() =>
                        setOpenGroup(openGroup === group ? null : group)
                      }
                    >
                      {group}
                      <span>{openGroup === group ? "▲" : "▼"}</span>
                    </div>
                    {/* 子分類 */}
                    {openGroup === group && (
                      <div className="pl-4">
                        {items.map((item) => (
                          <ComboboxOption
                            key={item.id}
                            value={item}
                            className="px-3 py-1 cursor-pointer hover:bg-blue-500 hover:text-white"
                          >
                            {item.subGroup}
                          </ComboboxOption>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </ComboboxOptions>
            </Combobox>
            {/* <select
              value={subcategory}
              onChange={handleCategoryChange}
              className="block mt-1 w-full p-2 rounded border border-gray-300 text-black"
            >
              <option value="">請選擇分類</option>
              {selectedSubcategory.map((subcategory, index) => (
                <option value={subcategory} key={index}>
                  {subcategory}
                </option>
              ))}
            </select> */}
          </label>
        </div>
        {/* 按鈕 */}
        <div>
          <button onClick={handleSearch} className={buttonstyle}>
            搜尋
          </button>
          <button onClick={switchModal} className={buttonstyle}>
            新增廠商
          </button>
        </div>
        {/* 分隔線 */}
        <hr className="my-4 border-gray-400" />
        {/* 搜尋結果表格 */}
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={paginationProps}
          scroll={{
            y: 50 * 10,
          }}
        />
      </div>
      {/*modal開關*/}
      {isModalOpen && (
        <Modal
          onClose={switchModal}
          onSubmit={handleModalSubmit}
          title="新增廠商"
        >
          <div>
            廠商名稱：
            <input
              type="text"
              className="border rounded mt-1"
              value={formData.supplierName}
              onChange={(e) => handleModalInputChange(e, "supplierName")}
            />
            <br />
            <label className="block font-medium mb-2">
              家具分類:
              <Combobox
                as="div"
                className="relative"
                value={selected}
                // onChange={setSelected}
                onChange={(selectedCategory) => {
                  setSelected(selectedCategory);
                  handleModalInputChange({
                    target: { value: selectedCategory.subGroup },
                    currentTarget: { name: "category" },
                  });
                }}
              >
                <ComboboxButton className="bg-white border p-2 rounded w-full text-left mt-1">
                  {selected ? selected.subGroup : "請選擇分類"}
                </ComboboxButton>
                <ComboboxOptions className="absolute z-10 w-full mt-1 bg-white shadow-md border rounded">
                  {Object.entries(wholeCategories).map(([group, items]) => (
                    <div key={group}>
                      {/* 大分類標題 */}
                      <div
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-2 text-gray-700 cursor-pointer flex justify-between"
                        onClick={() =>
                          setOpenGroup(openGroup === group ? null : group)
                        }
                      >
                        {group}
                        <span>{openGroup === group ? "▲" : "▼"}</span>
                      </div>
                      {/* 子分類 */}
                      {openGroup === group && (
                        <div className="pl-4">
                          {items.map((item) => (
                            <ComboboxOption
                              key={item.id}
                              value={item}
                              className="px-3 py-1 cursor-pointer hover:bg-blue-500 hover:text-white"
                            >
                              {item.subGroup}
                            </ComboboxOption>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </ComboboxOptions>
              </Combobox>
              {/* <select
                value={subcategory}
                onChange={(e) => {
                  handleModalInputChange(e, "subcategoryName");
                  setSubcategory(e.target.value);
                }}
                className="block mt-1 w-full p-2 rounded border border-gray-300 text-black"
              >
                <option value="">請選擇分類</option>
                {selectedSubcategory.map((subcategory, index) => (
                  <option value={subcategory} key={index}>
                    {subcategory}
                  </option>
                ))}
              </select> */}
            </label>
            <br />
            廠商地址：
            <input
              type="text"
              className="border rounded mt-1"
              value={formData.supplierAddress}
              onChange={(e) => handleModalInputChange(e, "supplierAddress")}
            />
            <br />
            廠商聯絡電話：
            <input
              type="text"
              className="border rounded mt-1"
              value={formData.supplierPhone}
              onChange={(e) => handleModalInputChange(e, "supplierPhone")}
            />
            <br />
            廠商聯絡人：
            <input
              type="text"
              className="border rounded mt-1"
              value={formData.contactor}
              onChange={(e) => handleModalInputChange(e, "contactor")}
            />
            <br />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SupplierManagement;
