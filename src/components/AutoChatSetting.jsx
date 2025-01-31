import React, { useState, useEffect } from "react";
import { Table, Input, Button, Form, Modal, Popconfirm, Switch } from "antd";

const AutoChatSetting = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/autochat");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      const formattedData = result.map((item) => ({
        ...item,
        id: item.autochatid,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      keywords: "",
      answer: "",
      isautochat: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = form.getFieldsValue();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");

        const response = await fetch(`http://localhost:8080/autochat/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const result = await response.json();
        console.log("Success:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/autochat/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const row = form.getFieldsValue();
      const response = await fetch("http://localhost:8080/autochat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      setData([...data, { ...result, id: result.autochatid }]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSwitchChange = async (checked, record) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => record.id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, isautochat: checked });
        setData(newData);

        const response = await fetch(
          `http://localhost:8080/autochat/${record.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...item, isautochat: checked }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const result = await response.json();
        console.log("Success:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "關鍵字 (多個請以英文逗號分隔)",
      dataIndex: "keywords",
      key: "keywords",
      editable: true,
      width: "25%",
    },
    {
      title: "回覆訊息",
      dataIndex: "answer",
      key: "answer",
      editable: true,
      render: (text) => (
        <div className="whitespace-pre-wrap break-words">{text}</div>
      ),
      width: "40%",
    },
    {
      title: "編輯",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.id)} className="mr-2">
              儲存
            </Button>
            <Button onClick={cancel}>取消</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record)} className="mr-2">
              編輯
            </Button>
            <Popconfirm
              title="確定刪除?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button>刪除</Button>
            </Popconfirm>
          </span>
        );
      },
      width: "20%",
    },
    {
      title: "是否自動回覆",
      dataIndex: "isautochat",
      key: "isautochat",
      editable: true,
      render: (text, record) => (
        <Switch
          checked={text}
          onChange={(checked) => handleSwitchChange(checked, record)}
        />
      ),
      width: "15%",
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
            {dataIndex === "isautochat" ? (
              <Switch defaultChecked={record[dataIndex]} />
            ) : dataIndex === "answer" ? (
              <Input.TextArea autoSize={{ minRows: 10, maxRows: 20 }} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div className="p-8">
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setIsModalVisible(true);
        }}
        className="mb-4"
      >
        新增回覆訊息
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </Form>
      <Modal
        title="新增回覆訊息"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="keywords"
            label="關鍵字 (多個請以英文逗號分隔)"
            rules={[{ required: true, message: "請輸入關鍵字" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="answer"
            label="回覆訊息"
            rules={[{ required: true, message: "請輸入回覆訊息" }]}
          >
            <Input.TextArea autoSize={{ minRows: 10, maxRows: 20 }} />
          </Form.Item>
          <Form.Item
            name="isautochat"
            label="是否自動回覆 (請輸入true或false)"
            rules={[{ required: true, message: "請輸入是否自動回覆" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AutoChatSetting;
