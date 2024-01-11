import React from "react";
import WarehouseIcon from "../../../assets/icons/warehouse.svg?react";
import NextIcon from "../../../assets/icons/next.svg?react";
import { useNavigate } from "react-router-dom";

import "./warehouseComponent.css";

function WarehouseComponent(props) {
  return (
    <div className="warehouseComponent" onClick={props.onClick}>
      <WarehouseIcon className="warehouseIcon" />
      <div> {props.warehouse.address} </div>
      <NextIcon className="nextIcon" />
    </div>
  );
}

export default WarehouseComponent;
