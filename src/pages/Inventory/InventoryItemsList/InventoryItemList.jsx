import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar";
import ExportButton from "../../../components/layouts/exportButton/exportButton";
import Table from "../../../components/core/table/table"; // Change the import statement to use lowercase 'table' instead of uppercase 'Table'
import { API_CONST } from "../../../constants/apiConstants";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";

import "./InventoryItemList.css";

const InventoryItemList = () => {
  const dispatch = useDispatch();
  const inventoryItemsFromStore = useSelector(
    (state) => state.inventoryItems.inventoryItemsData
  );
  const [loading, setLoading] = useState(false);

  const options = ["Name", "Warehouse"];
  const warehouses = useSelector((state) => state.inventoryItems.warehouses);
  console.log("warehouses", warehouses);
  //search
  const paginationModel = useSelector(
    (state) => state.inventoryItems.paginationModel
  );
  const searchPaginationModel = useSelector(
    (state) => state.inventoryItems.searchPaginationModel
  );
  const searchQuery = useSelector((state) => state.inventoryItems.searchQuery);
  const showSearchResults = useSelector(
    (state) => state.inventoryItems.showSearchResults
  );
  const searchResults = useSelector(
    (state) => state.inventoryItems.searchResults
  );

  const warehouseOptions = useSelector(
    (state) => state.inventoryItems.warehousesOption
  );

  console.log("paginationModel", paginationModel);
  console.log("searchPaginationModel", searchPaginationModel);

  const [currentWarehouse, setCurrentWarehouse] = useState(null);

  console.log(showSearchResults);

  useEffect(() => {
    let warehouseOptions = [];
    warehouses.map((warehouse) => {
      warehouseOptions.push({
        value: warehouse.id,
        label: warehouse.address,
      });
    });
    dispatch({
      type: "SET_INVENTORY_PAGE_WAREHOUSES_OPTION",
      payload: warehouseOptions,
    });
  }, [warehouses]);

  const handleSearch = async (page, size) => {
    try {
      setLoading(true);
      let query = `page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}&keyword=${searchQuery}`;
      if (currentWarehouse) {
        query += `&warehouseId=${currentWarehouse}`;
      }
      console.log("query", query);
      const response = await fetch(`${API_CONST}/inventories/search?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const inventoryItems = data.results;
      console.log("search results", inventoryItems);

      dispatch({
        type: "SET_INVENTORY_PAGE_SEARCH_RESULTS",
        payload: data.results,
      });
      dispatch({ type: "SET_INVENTORY_PAGE_SHOW_RESULTS", payload: true });
      dispatch({
        type: "SET_INVENTORY_PAGE_SEARCH_PAGINATION_MODEL",
        payload: { ...searchPaginationModel, total: data.total },
      });
    } catch (error) {
      dispatch({ type: "SET_INVENTORY_PAGE_SHOW_RESULTS", payload: true });
      dispatch({ type: "SET_INVENTORY_PAGE_SEARCH_RESULTS", payload: [] });
      setLoading(false);
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONST}/warehouses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const warehouses = data;
      console.log("warehouses", data);
      dispatch({ type: "SET_INVENTORY_PAGE_WAREHOUSES", payload: warehouses });
      setLoading(false);
      console.log(warehouses);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const fetchInventoryItems = async (page, size) => {
    try {
      setLoading(true);
      const response = await fetch(
        API_CONST + `/inventories?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("get inventory items from api", data.results);
      dispatch({
        type: "SET_INVENTORY_PAGE_INVENTORY_ITEM",
        payload: data.results,
      });
      dispatch({
        type: "SET_INVENTORY_PAGE_PAGINATION_MODEL",
        payload: { ...paginationModel, total: data.total },
      });
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
    setLoading(false);
  };
  //get all inventory items
  useEffect(() => {
    fetchInventoryItems(paginationModel.page, paginationModel.pageSize);
    fetchWarehouses();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (showSearchResults) {
      handleSearch(searchPaginationModel.page, searchPaginationModel.pageSize);
      fetchWarehouses();
    }
  }, [searchPaginationModel.page, searchPaginationModel.pageSize]);

  const handleSelectionChange = (option) => {
    if (option === null) {
      setCurrentWarehouse(null);
    } else {
      setCurrentWarehouse(option.value);
    }
    console.log("current warehouse", currentWarehouse);
  };

  const inventoryColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) =>
        paginationModel.page * 10 +
        inventoryItemsFromStore.indexOf(params.row) +
        1,
    },
    {
      headerName: "Name",
      field: "name",
      flex: 1,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.product.imageUrl} />
          <span>{params.row.product.name}</span>
        </div>
      ),
    },
    {
      headerName: "MFG",
      field: "mfg",
      flex: 1,
      valueGetter: (params) => params.row.manufacturingDate,
    },
    {
      headerName: "EXP",
      field: "exp",
      flex: 1,
      valueGetter: (params) => params.row.expiryDate,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      flex: 1,
    },
    {
      headerName: "Unit",
      field: "unit",
      flex: 1,
      valueGetter: (params) => params.row.product.calculationUnit,
    },
    {
      headerName: "Warehouse",
      field: "warehouse",
      flex: 1,
      valueGetter: (params) => params.row.warehouse.address,
    },
  ];
  const handleSearchQueryChange = (event) => {
    dispatch({
      type: "SET_INVENTORY_PAGE_SEARCH_QUERY",
      payload: event.target.value,
    });
    if (event.target.value === "" || event.target.value === null) {
      dispatch({
        type: "SET_INVENTORY_PAGE_SHOW_RESULTS",
        payload: false,
      });
      dispatch({ type: "SET_INVENTORY_PAGE_SEARCH_RESULTS", payload: [] });
      fetchInventoryItems(paginationModel.page, paginationModel.pageSize);
    }
  };

  return (
    <div className="pageContainer">
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search Inventory Items"
          value={searchQuery}
          handleSearch={handleSearch}
          handleSearchQueryChange={handleSearchQueryChange}
          setFilter={(value) =>
            dispatch({
              type: "SET_INVENTORY_PAGE_FILTER_OPTION",
              payload: value,
            })
          }
        />

        <ExportButton onClick={() => {}} />
      </div>
      <div className="filter">
        <Select
          isClearable={true}
          options={warehouseOptions}
          onChange={handleSelectionChange}
        ></Select>
      </div>
      {!loading ? (
        <Table
          className="table"
          paginationModel={
            showSearchResults ? searchPaginationModel : paginationModel
          }
          onPaginationModelChange={
            showSearchResults
              ? (newPaginationModel) =>
                  dispatch({
                    type: "SET_INVENTORY_PAGE_SEARCH_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
              : (newPaginationModel) =>
                  dispatch({
                    type: "SET_INVENTORY_PAGE_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
          }
          columns={inventoryColumns}
          rows={showSearchResults ? searchResults : inventoryItemsFromStore}
          noCheckboxSelection
        />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default InventoryItemList;
