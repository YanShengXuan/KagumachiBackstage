import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../components/Date.css"

function Date(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatStartDate = startDate ? format(startDate, "yyyy-MM-dd") : null;
  const formatEndtDate = endDate ? format(endDate, "yyyy-MM-dd") : null;
  useEffect(()=>{
    props.setStartDate(formatStartDate);
  },[startDate])
  useEffect(()=>{
    props.setEndDate(formatEndtDate);
  },[endDate])

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
      <div className="flex m-2 pt-0.5">
        <div>
          <DatePicker
            selected={startDate}
            onChange={startDateChange}
            startDate={startDate}
            endDate={endDate}
            showIcon
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="yyyy-MM-dd"
            selectsStart
            placeholderText="選擇開始日期"
            className="rounded-xl"
          />
        </div>
        <div className="ml-2">
          <DatePicker
            selected={endDate}
            onChange={setEndDateChange}
            startDate={startDate}
            endDate={endDate}
            showIcon
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="yyyy-MM-dd"
            selectsEnd
            isClearable
            placeholderText="選擇結束日期"
            minDate={startDate}
            className="rounded-xl"
          />
        </div>
      </div>
    </>
  );
}

export default Date;
