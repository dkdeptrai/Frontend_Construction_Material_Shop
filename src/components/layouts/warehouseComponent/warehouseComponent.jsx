import React from "react";
import WarehouseIcon from "../../../assets/icons/warehouse.svg?react";
import NextIcon from "../../../assets/icons/next.svg?react";

import "./warehouseComponent.css";

function WarehouseComponent() {
  return (
    <div className="warehouseComponent">
      <WarehouseIcon className="warehouseIcon" />
      <div> This is warehouse number 1</div>
      <NextIcon className="nextIcon" />
    </div>
  );
}

export default WarehouseComponent;
