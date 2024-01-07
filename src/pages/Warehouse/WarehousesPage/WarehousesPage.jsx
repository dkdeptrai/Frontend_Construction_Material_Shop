import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../../components/layouts/searchBar/searchBar";
import WarehouseComponent from "../../../components/layouts/warehouseComponent/warehouseComponent";
import { setSubroute } from "../WarehousesSlice";
import "./WarehousesPage.css";
import NewButton from "../../../components/layouts/newButton/newButton";
import { API_CONST } from "../../../constants/apiConstants";
import Warehouse from "../../../models/Warehouse";

function WarehousesPage() {
  const dispatch = useDispatch();
  const subRoute = useSelector((state) => state.warehouses.subRoute);
  const navigate = useNavigate();

  const [warehouses, setWarehouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchWarehouses = async () => {
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(`${API_CONST}/warehouses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const warehouses = data.map(
        (item) => new Warehouse(item.id, item.address, item.capacity)
      );
      setWarehouses(warehouses);
      console.log(warehouses);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchQueryChange = (event) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };

  const handleSearch = () => {
    const searchResults = warehouses.filter((warehouse) =>
      warehouse.address.includes(searchQuery)
    );
    setWarehouses(searchResults);
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (subRoute) {
      navigate(`/warehouses/${subRoute}`);
    } else {
      navigate("/warehouses");
    }
  }, [subRoute]);

  const navigateToNewWarehouse = () => {
    dispatch(setSubroute("new"));
    navigate("/warehouses/new");
  };
  return (
    <div className="warehousePageContainer">
      <div className="toolbar">
        <SearchBar
          handleSearch={handleSearch}
          className="warehouseSearch"
          placeholder="Search Warehouse by address"
          handleSearchQueryChange={handleSearchQueryChange}
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

export default WarehousesPage;
