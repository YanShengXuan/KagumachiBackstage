import React, { useState, useEffect } from "react";
import { Table, Input, Button, Form, Modal } from "antd";

const Setting = () => {
  const [data, setData] = useState({});
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/setting');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData({
        websiteName: result.websitename,
        aboutUs: result.aboutus,
        QA: result.qa,
        logo: result.logo,
        footerInstagramLink: result.footerinstagramlink,
        footerFacebookLink: result.footerfacebooklink
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDataSource([
      { key: "1", option: "網站名稱", content: data.websiteName },
      {
        key: "2",
        option: "關於我們",
        content: data.aboutUs,
      },
      {
        key: "3",
        option: "Q&A",
        content: data.QA,
      },
      { key: "4", option: "Logo", content: data.logo },
      {
        key: "5",
        option: "Footer Instagram Link",
        content: data.footerInstagramLink,
      },
      {
        key: "6",
        option: "Footer Facebook Link",
        content: data.footerFacebookLink,
      },
    ]);
  }, [data]);

  const [dataSource, setDataSource] = useState([
    { key: "1", option: "網站名稱", content: data.websiteName },
    {
      key: "2",
      option: "關於我們",
      content: data.aboutUs,
    },
    {
      key: "3",
      option: "Q&A",
      content: data.QA,
    },
    { key: "4", option: "Logo", content: data.logo },
    {
      key: "5",
      option: "Footer Instagram Link",
      content: data.footerInstagramLink,
    },
    {
      key: "6",
      option: "Footer Facebook Link",
      content: data.footerFacebookLink,
    },
  ]);

  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ option: "", content: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = form.getFieldsValue();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }

      const payload = { ...row, option: newData[index].option };
      console.log('Sending JSON data:', payload);

      const response = await fetch('http://localhost:8080/setting/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.text();
      console.log('Success:', result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePreview = (image) => {
    setPreviewImage(image);
    setPreviewVisible(true);
  };

  const columns = [
    {
      title: "修改選項",
      dataIndex: "option",
      key: "option",
      editable: false,
      width: "10%",
    },
    {
      title: "內容",
      dataIndex: "content",
      key: "content",
      editable: true,
      width: "70%",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item name="content" className="m-0" initialValue={text}>
            <Input.TextArea
              autoSize={{ minRows: 10, maxRows: 20 }}
              className="whitespace-pre-wrap break-words"
            />
          </Form.Item>
        ) : record.option === "Logo" ? (
          <img
            src={text}
            alt="logo"
            className="w-36 cursor-pointer"
            onClick={() => handlePreview(text)}
          />
        ) : (
          <div className="whitespace-pre-wrap break-words">{text}</div>
        );
      },
    },
    {
      title: "編輯",
      dataIndex: "edit",
      width: "20%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.key)} className="mr-2">
              儲存
            </Button>
            <Button onClick={cancel}>取消</Button>
          </span>
        ) : (
          <Button onClick={() => edit(record)}>編輯</Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            className="m-0"
            initialValue={record[dataIndex]}
          >
            <Input.TextArea
              autoSize={{ minRows: 10, maxRows: 20 }}
              className="whitespace-pre-wrap break-words"
            />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div className="w-full bg-[#A6A6A6] h-full pt-10">
      <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
        <h1 className="text-2xl font-bold mb-4">網站設定</h1>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            scroll={{ y: "calc(100vh - 200px)" }}
          />
        </Form>
        <Modal
          open={previewVisible}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="logo" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
};

export default Setting;
