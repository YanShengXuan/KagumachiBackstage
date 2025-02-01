import { useEffect, useState } from "react";
import { Table, Button, Space, Select } from "antd";
import { Link } from "react-router-dom";

function SalesforClasses() {
  const [classSource, setClassSource] = useState([]);
  const [options, setOptions] = useState([]);

  const [editingKey, setEditingKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/sales/getmaincategories")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => {
          return {
            key: index + 1,
            class: item.categoryname,
            salenumber: item.sales.salesid,
            salename: item.sales.name,
            saleoption: `${item.sales.salesid} - ${item.sales.name}`,
          };
        });
        setClassSource(formattedData);
      })
      .catch((error) =>
        console.error("Error fetching main categories:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/sales/getallsales")
      .then((response) => response.json())
      .then((saleData) => {
        const saleoptions = saleData.map((item) => ({
          label: `${item.salesid} - ${item.name}`,
          value: item.salesid,
        }));

        setOptions(saleoptions);
      })
      .catch((error) => console.error("Error fetching sales:", error));
  }, []);

  const classColumns = [
    {
      title: "分類名稱",
      dataIndex: "class",
      key: "class",
      width: "15%",
    },
    {
      title: "活動編號",
      dataIndex: "saleoption",
      key: "saleoption",
      width: "30%",
      render: (text, record) => {
        return editingKey === record.key ? (
          <Select
            defaultValue={record.saleoption}
            options={options}
            onChange={(e) => handleSelectChange(e, "saleoption")}
            style={{ width: "100%" }}
          />
        ) : (
          text
        );
      },
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
    const updatedClassSource = classSource.map((item) => {
      if (item.key === editingKey) {
        return {
          ...item,
          saleoption: `${editingRecord.salenumber} - ${editingRecord.salename}`,
          salename: editingRecord.salename,
          salenumber: editingRecord.salenumber,
        };
      }
      return item;
    });

    // 更新分類活動&商品折扣價
    fetch("http://localhost:8080/sales/updatecategoryanddiscount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryid: editingKey,
        salesid: editingRecord.salenumber,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update category");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Update successful:", result);

        setClassSource(updatedClassSource);
        setEditingKey(null);
        setEditingRecord({});
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  const handleSelectChange = (value, field) => {
    const selectedSale = options.find((option) => option.value === value);
    setEditingRecord({
      ...editingRecord,
      [field]: value,
      salename: selectedSale ? selectedSale.label.split(" - ")[1] : "",
      salenumber: selectedSale.label.split(" - ")[0],
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
