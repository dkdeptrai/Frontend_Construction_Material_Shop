import React, { useState, useEffect } from "react";
import SearchBar from "../../layouts/searchBar/searchBar";
import WarehouseComponent from "../../layouts/warehouseComponent/warehouseComponent";

import "./warehousePage.css";
import NewButton from "../../layouts/newButton/newButton";

function Warehouse() {
  // TODO: handle api call
  let warehouses = [];
  // let [warehouses, setWarehouses] = useState([]);
  // useEffect(() => {
  //   fetch("YOUR_API_URL")
  //     .then((response) => response.json())
  //     .then((data) => setWarehouses(data))
  //     .catch((error) => console.error(error));
  // }, []);
  warehouses = [
    { id: 1, name: "Warehouse 1", address: "Address 1" },
    {
      id: 2,
      name: "Warehouse 2",
      address: "Address 2",
    },
    { id: 3, name: "Warehouse 3", address: "Address 3" },
    { id: 4, name: "Warehouse 4", address: "Address 4" },
    { id: 5, name: "Warehouse 5", address: "Address 5" },
  ];
  return (
    <div className="warehousePageContainer">
      <div className="toolbar">
        <SearchBar
          className="warehouseSearch"
          placeholder="Search Warehouse by address"
          options={[]}
        />
        <NewButton className="newWarehouseButton" text="New Warehouse" />
      </div>
      <div className="warehousesListContainer">
        {warehouses.map((warehouse) => (
          <WarehouseComponent
            className="warehouse"
            key={warehouse.id}
            warehouse={warehouse}
          />
        ))}
      </div>
    </div>
  );
}

export default Warehouse;
