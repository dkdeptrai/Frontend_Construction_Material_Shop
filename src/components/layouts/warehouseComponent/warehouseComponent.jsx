import React from "react";
import WarehouseIcon from "../../../assets/icons/warehouse.svg?react";
import NextIcon from "../../../assets/icons/next.svg?react";
import { useNavigate } from "react-router-dom";

import "./warehouseComponent.css";

function WarehouseComponent({ warehouse }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/warehouse/${warehouse.id}`);
  }

  return (
    <div className="warehouseComponent" onClick={handleClick}>
      <WarehouseIcon className="warehouseIcon" />
      <div> {warehouse.name} </div>
      <NextIcon className="nextIcon" />
    </div>
  );
}

export default WarehouseComponent;
