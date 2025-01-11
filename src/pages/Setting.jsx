import React, { useState } from "react";
import { Table, Input, Button, Form, Modal } from "antd";

// ====== 測試用初始資料，後端可傳回資料後此段將刪除。 ======
const data = {
  websiteName: "KaguMachi",
  aboutUs:
    "家具町的品牌定位將結合上述競爭者的優勢並突破其局限，以日系極簡設計為核心，融入自然材質與耐用工藝，提供具有設計美感且功能實用的家具，同時將以合理的價格策略和精緻的細節滿足多層次客群的需求，填補高端與平價市場之間的空白，建立一個具有專屬品牌魅力的家具網站。",
  QA: `Q:我需要註冊帳號才能購物嗎？
A:是的，您可以點擊網站右上角的「註冊」按鈕，填寫基本信息完成註冊。部分網站支持訪客結帳。

Q:如果忘記密碼，該怎麼辦？
A:請點擊「忘記密碼」並輸入您的註冊郵箱，我們會發送重設密碼的鏈接到您的郵箱。

Q:有哪些支付方式可以選擇？
A:我們支持多種支付方式，包括信用卡、支付寶、微信支付、Apple Pay 以及銀行轉賬等。

Q:運費是多少？是否提供免費運送？
A:運費視您的訂單金額和配送地址而定。訂單滿 NT$1,000 可享免費配送，詳細運費資訊請參考配送政策。

Q:下單後多久能收到商品？
A:一般情況下，訂單會在 1-2 個工作日內處理，配送時間視地區而定，通常需 3-7 個工作日。

Q:下單後可以修改或取消訂單嗎？
A:如果訂單尚未發貨，您可以聯繫我們的客服進行修改或取消。一旦訂單已發貨，則無法更改。

Q:如何查詢訂單的配送進度？
A:您可以登入帳戶並進入「我的訂單」頁面查看配送狀態。訂單發貨後，我們會通過郵件提供追蹤號。

Q:商品不滿意，可以退換貨嗎？
A:是的，您可以在收到商品後的 7 天內申請退換貨，但商品需保持原狀。詳情請參考退換貨政策。

Q:有問題需要幫助，該如何聯繫客服？
A:您可以通過「聯繫我們」頁面提交表單，或撥打客服熱線（0800-XXX-XXX）。我們的工作時間為每週一至五，上午 9:00 至下午 6:00。
`,
  logo: "https://i.imgur.com/e0PrRkG.jpg",
  footerInstagramLink: "https://www.instagram.com/",
  footerFacebookLink: "https://www.facebook.com/",
};
// ====== 測試用初始資料，後端可傳回資料後此段將刪除。 ======

const Setting = () => {
  // ====== 向後端拿初始資料，後端可傳回資料後此段將取消註解。 ======
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('後端url');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const result = await response.json();
  //       setData({
  //         websiteName: result.websiteName,
  //         aboutUs: result.aboutUs,
  //         QA: result.QA,
  //         logo: result.logo,
  //         footerInstagramLink: result.footerInstagramLink,
  //         footerFacebookLink: result.footerFacebookLink,
  //       });
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // ====== 向後端拿初始資料，後端可傳回資料後此段將取消註解。 ======

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

      // 按下 save 將資料傳遞到後端
      // const response = await fetch('後端url', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(row),
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const result = await response.json();
      // console.log('Success:', result);
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
