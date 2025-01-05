import React from "react";
import ShipRateTable from "../components/ShipRateTable";
import ShipOrderTable from "../components/ShipOrderTable";

const Ship = () => {
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">各地運費表</h1>
        <ShipRateTable />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">訂單配送表</h1>
        <ShipOrderTable />
      </div>
    </div>
  );
};

export default Ship;
