import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../components/FinanceItemDate.css";

function FinanceItemDate(props) {
  const [date, setDate] = useState(props.date);
  const formatStartDate = date ? format(date, "yyyy-MM-dd") : null;

  useEffect(() => {
    props.setItemDate(formatStartDate);
  }, [date]);

  const dateChange = (date) => {
    setDate(date);
  };

  return (
    <>
      <div className="center">
        <DatePicker
          value={date}
          selected={date}
          onChange={dateChange}
          showIcon
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="yyyy-MM-dd"
          selectsStart
          placeholderText="選擇日期"
          className="rounded-xl w-[100%] text-center text-lg"
        />
      </div>
    </>
  );
}

export default FinanceItemDate;
