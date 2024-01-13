import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../../components/layouts/searchBar/searchBar";
import WarehouseComponent from "../../../components/layouts/warehouseComponent/warehouseComponent";
import "./WarehousesPage.css";
import NewButton from "../../../components/layouts/newButton/newButton";
import { API_CONST } from "../../../constants/apiConstants";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";

function WarehousesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const subroute = useSelector((state) => state.warehouses.subroute);
  const warehouses = useSelector((state) => state.warehouses.warehouses);
  const searchQuery = useSelector((state) => state.warehouses.searchQuery);

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_CONST}/warehouses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const warehouses = data;
      console.log("warehouses", data);
      dispatch({ type: "SET_WAREHOUSES_PAGE_WAREHOUSES", payload: warehouses });
      setIsLoading(false);
      console.log(warehouses);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleSearchQueryChange = (event) => {
    const searchQuery = event.target.value;
    dispatch({
      type: "SET_WAREHOUSES_PAGE_SEARCH_QUERY",
      payload: searchQuery,
    });
    if (searchQuery === "") {
      fetchWarehouses();
    }
  };
  // TODO: add case insensitive
  const handleSearch = () => {
    const searchResults = warehouses.filter((warehouse) =>
      warehouse.address.includes(searchQuery)
    );
    dispatch({
      type: "SET_WAREHOUSES_PAGE_WAREHOUSES",
      payload: searchResults,
    });
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (subroute) {
      let id = subroute.split("/")[1];
      if (id) {
        navigate(`/warehouses/${id}`);
      } else if (subroute === "add") {
        navigate("/warehouses/add");
      }
    }
  }, [subroute]);
  const navigateToNewWarehouse = () => {
    dispatch({ type: "SET_WAREHOUSES_PAGE_SUBROUTE", payload: "add" });
    navigate("/warehouses/add");
  };

  const navigateToWarehouse = (warehouse) => {
    dispatch({
      type: "SET_WAREHOUSES_PAGE_SUBROUTE",
      payload: `${warehouse.id}`,
    });
    navigate(`/warehouses/${warehouse.id}`);
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
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="warehousesListContainer">
          {warehouses.map((warehouse) => (
            <WarehouseComponent
              onClick={() => navigateToWarehouse(warehouse)}
              className="warehouse"
              key={warehouse.id}
              warehouse={warehouse}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WarehousesPage;
