import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProductsModal.css";

//states
import { useDispatch, useSelector } from "react-redux";
import { addSelectedProducts } from "../../../../actions/selectedProductsAction.jsx";

//pages and components
import SearchBar from "../../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../../components/core/table/table.jsx";
import { API_CONST } from "../../../../constants/apiConstants.jsx";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent.jsx";
import ExitButton from "../../../../assets/icons/exitbutton.svg?react";
import Select from "react-select";

const NewProductsModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //loading
  const [isLoading, setIsLoading] = useState(true);

  const inventoryItems = useSelector(
    (state) => state.newProductsModal.inventoryItemsData
  );
  const selectedInventoryItems = useSelector(
    (state) => state.newProductsModal.selectedInventoryItems
  );
  const handleAddProducts = () => {
    const selectedProducts = selectedInventoryItems.map((item) => {
      const product = {
        id: item.id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        unitPrice: item.product.unitPrice,
        amount: 1,
        mfg: item.manufacturingDate,
        exp: item.expiryDate,
      };

      return product;
    });
    dispatch(addSelectedProducts(selectedProducts));
    handleClose(false);
  };

  const paginationModel = useSelector(
    (state) => state.newProductsModal.paginationModel
  );
  const searchPaginationModel = useSelector(
    (state) => state.newProductsModal.searchPaginationModel
  );
  const searchQuery = useSelector(
    (state) => state.newProductsModal.searchQuery
  );
  const showSearchResults = useSelector(
    (state) => state.newProductsModal.showSearchResults
  );
  const searchResults = useSelector(
    (state) => state.newProductsModal.searchResults
  );

  const warehouseOptions = useSelector(
    (state) => state.newProductsModal.warehousesOption
  );

  const warehouses = useSelector((state) => state.newProductsModal.warehouses);

  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const options = ["Name", "Warehouse"];

  useEffect(() => {
    let warehouseOptions = [];
    warehouses.map((warehouse) => {
      warehouseOptions.push({
        value: warehouse.id,
        label: warehouse.address,
      });
    });
    dispatch({
      type: "SET_NEW_PRODUCTS_MODAL_WAREHOUSES_OPTION",
      payload: warehouseOptions,
    });
  }, [warehouses]);

  const handleSearch = async (page, size) => {
    try {
      setIsLoading(true);
      let query = `page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}&keyword=${searchQuery}`;
      if (currentWarehouse) {
        query += `&warehouseId=${currentWarehouse}`;
      }
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
        type: "SET_NEW_PRODUCTS_MODAL_SEARCH_RESULTS",
        payload: data.results,
      });
      dispatch({ type: "SET_NEW_PRODUCTS_MODAL_SHOW_RESULTS", payload: true });
      dispatch({
        type: "SET_NEW_PRODUCTS_MODAL_SEARCH_PAGINATION_MODEL",
        payload: { ...searchPaginationModel, total: data.total },
      });
    } catch (error) {
      dispatch({ type: "SET_NEW_PRODUCTS_MODAL_SHOW_RESULTS", payload: true });
      dispatch({ type: "SET_NEW_PRODUCTS_MODAL_SEARCH_RESULTS", payload: [] });
      setIsLoading(false);
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

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
      dispatch({
        type: "SET_NEW_PRODUCTS_MODAL_WAREHOUSES",
        payload: warehouses,
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const fetchInventoryItems = async (page, size) => {
    try {
      setIsLoading(true);
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
        type: "SET_NEW_PRODUCTS_MODAL_INVENTORY_ITEM",
        payload: data.results,
      });
      dispatch({
        type: "SET_NEW_PRODUCTS_MODAL_PAGINATION_MODEL",
        payload: { ...paginationModel, total: data.total },
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

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

  const inventoryItemsColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) =>
        showSearchResults
          ? searchPaginationModel.page * searchPaginationModel.pageSize +
            inventoryItems.indexOf(params.row) +
            1
          : paginationModel.page * paginationModel.pageSize +
            inventoryItems.indexOf(params.row) +
            1,
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 0.4,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.product.imageUrl} />
          <span>{params.row.product.name}</span>
        </div>
      ),
    },
    {
      field: "mfg",
      headerName: "MFG",
      flex: 0.3,
      renderCell: (params) => params.row.manufacturingDate,
    },
    {
      field: "exp",
      headerName: "Expiry Date",
      flex: 0.3,
      renderCell: (params) => params.row.expiryDate,
    },
    {
      field: "calculationUnit",
      headerName: "Unit",
      flex: 0.2,
      renderCell: (params) => params.row.product.calculationUnit,
    },
    {
      field: "unitPrice",
      headerName: "Price",
      flex: 0.3,
      renderCell: (params) => params.row.product.unitPrice,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.3,
    },
    {
      field: "warehouseAddress",
      headerName: "Warehouse",
      flex: 0.6,
      renderCell: (params) => params.row.warehouse.address,
    },
  ];

  const handleSearchQueryChange = (event) => {
    dispatch({
      type: "SET_NEW_PRODUCTS_MODAL_SEARCH_QUERY",
      payload: event.target.value,
    });
    if (event.target.value === "" || event.target.value === null) {
      dispatch({
        type: "SET_NEW_PRODUCTS_MODAL_SHOW_RESULTS",
        payload: false,
      });
      dispatch({ type: "SET_NEW_PRODUCTS_MODAL_SEARCH_RESULTS", payload: [] });
      fetchInventoryItems(paginationModel.page, paginationModel.pageSize);
    }
  };

  return (
    <div className="new-products-modal-overlay">
      <div className="new-products-modal-content">
        <div className="new-products-modal-header">
          <h2>Select Products</h2>
          <div className="exit-button" onClick={() => handleClose(false)}>
            <ExitButton />
          </div>
        </div>

        <SearchBar
          className="searchBar"
          placeholder="Search Inventory Items by Product Name"
          value={searchQuery}
          handleSearch={handleSearch}
          handleSearchQueryChange={handleSearchQueryChange}
          setFilter={(value) =>
            dispatch({
              type: "SET_NEW_PRODUCTS_MODAL_FILTER_OPTION",
              payload: value,
            })
          }
        />
        <div className="filter" width="40%">
          <Select
            isClearable={true}
            options={warehouseOptions}
            onChange={handleSelectionChange}
          ></Select>
        </div>
        {!isLoading ? (
          <Table
            columns={inventoryItemsColumns}
            rows={showSearchResults ? searchResults : inventoryItems}
            selectedRowIds={selectedInventoryItems.map((item) => item.id)}
            onRowSelection={(newSelection) => {
              const selectedItems = newSelection.map((id) => {
                const item = inventoryItems.find((item) => item.id === id);

                return item;
              });
              console.log(selectedItems);
              dispatch({
                type: "SET_NEW_PRODUCTS_MODAL_SELECTED_INVENTORY_ITEMS",
                payload: selectedItems,
              });
            }}
            className="table"
            paginationModel={
              showSearchResults ? searchPaginationModel : paginationModel
            }
            onPaginationModelChange={
              showSearchResults
                ? (newPaginationModel) =>
                    dispatch({
                      type: "SET_NEW_PRODUCTS_MODAL_SEARCH_PAGINATION_MODEL",
                      payload: newPaginationModel,
                    })
                : (newPaginationModel) =>
                    dispatch({
                      type: "SET_NEW_PRODUCTS_MODAL_PAGINATION_MODEL",
                      payload: newPaginationModel,
                    })
            }
          />
        ) : (
          <LoadingComponent />
        )}

        <label style={{ marginTop: "80px" }}>Selected Items</label>
        <Table
          columns={inventoryItemsColumns}
          rows={selectedInventoryItems}
          noCheckboxSelection
        />
        <button
          style={{
            marginTop: "80px",
            marginLeft: "auto",
            marginRight: "60px",
            marginBottom: "80px",
            height: "50px",
          }}
          onClick={handleAddProducts}
        >
          Add products
        </button>
      </div>
    </div>
  );
};

export default NewProductsModal;
