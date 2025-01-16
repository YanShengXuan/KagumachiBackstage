import { useState, useEffect } from "react";
import FinanceItemDate from "./FinanceItemDate.jsx";

const tableTdBtnStyle =
  "px-2 my-2 w-20 rounded-xl bg-[rgb(83,87,89)] text-white text-base hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
const tableTdStyle = "border-2 border-black text-center";
function FinanceItem(props) {
  useEffect(() => {
    if (props.isCheck) {
      if (props.item == "收入") {
        props.setIncome((prev) => [...prev, props.money]);
      } else if (props.item == "支出") {
        props.setExpenditure((prev) => [...prev, props.money]);
      }
    }else{
      if (props.item == "收入") {
        props.setIncome((prev) => [...prev, props.money]);
      } else if (props.item == "支出") {
        props.setExpenditure((prev) => [...prev, props.money]);
      }
    }
  }, [props.financeData]);
  const [isEdit, setIsEdit] = useState(false);
  const [itemDate, setItemDate] = useState(null);

  const [formData, setFormData] = useState({
    financeid: props.id,
    date: props.date,
    item: props.item,
    details: props.details,
    money: props.money,
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name == "money" ? parseFloat(value) : value}));
  };

  const confirmEdit = () => {
    props.handleEdit(props.id, formData);
    setIsEdit(false);
  };

  const cancelEdit = () => {
    setFormData({
      date: props.date,
      item: props.item,
      details: props.details,
      money: props.money,
    });
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <tr>
          <td className={tableTdStyle}>
            <FinanceItemDate
              name="date"
              onChange={inputChange}
              setItemDate={setItemDate}
              date={props.date}
            />
          </td>
          <td className={tableTdStyle}>
            <select
              name="item"
              value={formData.item}
              onChange={inputChange}
              className="rounded-xl text-center text-lg w-[50%]"
            >
              <option value="支出">支出</option>
              <option value="收入">收入</option>
            </select>
          </td>
          <td className={tableTdStyle}>
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={inputChange}
              className="rounded-xl text-center text-lg"
            />
          </td>
          <td className={tableTdStyle}>
            <input
              type="number"
              name="money"
              value={formData.money}
              onChange={inputChange}
              className="rounded-xl text-center text-lg"
            />
          </td>
          <td className={tableTdStyle}>
            <div className="flex justify-center">
              <button
                className={`${tableTdBtnStyle} mr-2`}
                onClick={confirmEdit}
              >
                確認
              </button>
              <button className={tableTdBtnStyle} onClick={cancelEdit}>
                取消
              </button>
            </div>
          </td>
        </tr>
      ) : (
        <tr>
          <td className={props.tableTdStyle}>{props.date}</td>
          <td className={props.tableTdStyle}>{props.item}</td>
          <td className={props.tableTdStyle}>{props.details}</td>
          <td className={props.tableTdStyle}>{props.money}</td>
          <td className={props.tableTdStyle}>
            <button
              className={`${tableTdBtnStyle} w-[100%]`}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              修改
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default FinanceItem;
