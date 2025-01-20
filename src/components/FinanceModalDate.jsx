import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../components/FinanceModalDate.css";

function FinanceModalDate(props) {
  const [date, setDate] = useState(null);
  const formatStartDate = date ? format(date, "yyyy-MM-dd") : null;

  useEffect(() => {
    props.setModalDate(formatStartDate);
  }, [date]);

  const dateChange = (date) => {
    setDate(date);
  };

  return (
    <>
      <div className="flex m-2 pt-0.5">
        <DatePicker
          selected={date}
          onChange={dateChange}
          showIcon
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="yyyy-MM-dd"
          selectsStart
          placeholderText="選擇日期"
          className="rounded-xl w-[80%]"
        />
      </div>
    </>
  );
}

export default FinanceModalDate;
