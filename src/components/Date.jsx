import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
function Date() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatStartDate = startDate ? format(startDate, "yyyy-MM-dd") : null;
  const formatEndtDate = endDate ? format(endDate, "yyyy-MM-dd") : null;

  const startDateChange = (date) => {
    setStartDate(date);
  };

  const setEndDateChange = (date) => {
    setEndDate(date);
    if (!date) {
      setStartDate(null);
    }
  };

  return (
    <>
      <div className="flex m-2">
        <div>
          <DatePicker
            selected={startDate}
            onChange={startDateChange}
            startDate={startDate}
            endDate={endDate}
            showIcon
            dateFormat="yyyy/MM/dd"
            selectsStart
            placeholderText="選擇開始日期"
          />
        </div>
        <div className="ml-2">
          <DatePicker
            selected={endDate}
            onChange={setEndDateChange}
            startDate={startDate}
            endDate={endDate}
            showIcon
            dateFormat="yyyy/MM/dd"
            selectsEnd
            isClearable
            placeholderText="選擇結束日期"
            minDate={startDate}
          />
        </div>
      </div>
    </>
  );
}

export default Date;
