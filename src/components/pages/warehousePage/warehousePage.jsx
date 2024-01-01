import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../layouts/searchBar/searchBar";
import WarehouseComponent from "../../layouts/warehouseComponent/warehouseComponent";

import "./warehousePage.css";
import NewButton from "../../layouts/newButton/newButton";

function Warehouse() {
  const navigate = useNavigate();
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
    { id: 1, name: "Warehouse 1", address: "Address 1", capacity: 100 },
    {
      id: 2,
      name: "Warehouse 2",
      address: "Address 2",
      capacity: 100,
    },
    { id: 3, name: "Warehouse 3", address: "Address 3", capacity: 100 },
    { id: 4, name: "Warehouse 4", address: "Address 4", capacity: 100 },
    { id: 5, name: "Warehouse 5", address: "Address 5", capacity: 100 },
    { id: 6, name: "Warehouse 6", address: "Address 6", capacity: 100 },
    { id: 7, name: "Warehouse 7", address: "Address 7", capacity: 100 },
    { id: 8, name: "Warehouse 8", address: "Address 8", capacity: 100 },
    { id: 9, name: "Warehouse 9", address: "Address 9", capacity: 100 },
    { id: 10, name: "Warehouse 10", address: "Address 10", capacity: 100 },
  ];

  const navigateToNewWarehouse = () => {
    navigate("/warehouses/add");
  };
  return (
    <div className="warehousePageContainer">
      <div className="toolbar">
        <SearchBar
          className="warehouseSearch"
          placeholder="Search Warehouse by address"
          options={[]}
        />
        <NewButton
          className="newWarehouseButton"
          text="New Warehouse"
          onClick={() => navigateToNewWarehouse()}
        />
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
