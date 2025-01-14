import { useEffect } from "react";

function FinanceItem(props) {
  useEffect(() => {
    if (props.isCheck) {
      if (props.item == "收入") {
        props.setIncome((prev) => [...prev, props.money]);
      } else if (props.item == "支出") {
        props.setExpenditure((prev) => [...prev, props.money]);
      }
    }
  }, [props.financeData]);
  return (
    <>
      <tr>
        <td className={props.tableTdStyle}>{props.date}</td>
        <td className={props.tableTdStyle}>{props.item}</td>
        <td className={props.tableTdStyle}>{props.details}</td>
        <td className={props.tableTdStyle}>{props.money}</td>
      </tr>
    </>
  );
}

export default FinanceItem;
