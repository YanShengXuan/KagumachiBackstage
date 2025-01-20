import React from "react";
import { Link, useMatch, Outlet } from "react-router-dom";

const Ship = () => {
  const isShipRateTable = useMatch("/ship/shipratetable");
  const isShipOrderTable = useMatch("/ship/shipordertable");

  return (
    <div className="w-full bg-[#A6A6A6] h-full pt-10">
      <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
        <div className="text-2xl my-2">
          <Link to="/ship/shipratetable" className="hover:font-bold">
            <span
              className={`${
                isShipRateTable ? "bg-[#27333f] p-2 text-white rounded-xl" : ""
              }`}
            >
              各地運費設定
            </span>
          </Link>
          <span className="m-2">/</span>
          <Link to="/ship/shipordertable" className="hover:font-bold">
            <span
              className={`${
                isShipOrderTable ? "bg-[#27333f] p-2 text-white rounded-xl" : ""
              }`}
            >
              訂單配送表
            </span>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Ship;
