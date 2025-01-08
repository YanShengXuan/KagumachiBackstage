import React from "react";
import ShipRateTable from "../components/ShipRateTable";
import ShipOrderTable from "../components/ShipOrderTable";

const Ship = () => {
  return (
    <div>
      <div className="w-full bg-[#A6A6A6] h-full pt-10">
        <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">各地運費表</h1>
            <ShipRateTable />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#A6A6A6] h-full pt-10">
        <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">訂單配送表</h1>
            <ShipOrderTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ship;
