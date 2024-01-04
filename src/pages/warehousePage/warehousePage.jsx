import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/layouts/searchBar/searchBar";
import WarehouseComponent from "../../components/layouts/warehouseComponent/warehouseComponent";

import "./warehousePage.css";
import NewButton from "../../components/layouts/newButton/newButton";

function Warehouse() {
  const navigate = useNavigate();
  // TODO: handle api call
  const [warehouses, setWarehouses] = useState([]);
  // useEffect(() => {
  //   fetch("YOUR_API_URL")
  //     .then((response) => response.json())
  //     .then((data) => setWarehouses(data))
  //     .catch((error) => console.error(error));
  // }, []);
  const fetchWarehouses = async () => {
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch("http://localhost:8080/api/v1/warehouses", {
        method: "GET",
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const warehouses = data.results.map;
      setWarehouses(warehouses);
      console.log(warehouses);
    } catch (e) {}
  };
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
