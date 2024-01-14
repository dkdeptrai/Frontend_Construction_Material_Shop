import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar";
import ExportButton from "../../../components/layouts/exportButton/exportButton";
import Table from "../../../components/core/table/table"; // Change the import statement to use lowercase 'table' instead of uppercase 'Table'
import { API_CONST } from "../../../constants/apiConstants";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";

const InventoryItemList = () => {
  const dispatch = useDispatch();
  const inventoryItemsFromStore = useSelector(
    (state) => state.inventoryItems.inventoryItemsData
  );
  console.log("inventory items from store", inventoryItemsFromStore);
  const [loading, setLoading] = useState(false);

  const options = ["Name", "Warehouse"];

  //search
  const paginationModel = useSelector(
    (state) => state.inventoryItems.paginationModel
  );
  const searchPaginationModel = useSelector(
    (state) => state.inventoryItems.searchPaginationModel
  );
  const searchQuery = useSelector((state) => state.inventoryItems.searchQuery);

  const handleSearch = async () => {
    try {
      let query = `page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}`;
      if (filter == "Name") {
        query = query + `&customerName=${searchQuery}`;
      }
      if (filter == "Warehouse") {
        query = query + `&phone=${searchQuery}`;
      }
      console.log("query", query);
      const response = await fetch(`${API_CONST}/customers?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const customers = data.results;
      dispatch({
        type: "SET_CUSTOMERS_PAGE_SEARCH_RESULTS",
        payload: customers,
      });
      dispatch({ type: "SET_CUSTOMERS_PAGE_SHOW_RESULTS", payload: true });
      dispatch({
        type: "SET_CUSTOMERS_PAGE_SEARCH_PAGINATION_MODEL",
        payload: { ...searchPaginationModel, total: data.total },
      });
    } catch (error) {
      dispatch({ type: "SET_CUSTOMERS_PAGE_SHOW_RESULTS", payload: false });

      console.log("Error searching customers: ", error);
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
  }, [paginationModel.page, paginationModel.pageSize]);

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

  return (
    <div className="pageContainer">
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search inventory items by "
          value={searchQuery}
          setFilter={(value) =>
            dispatch({
              type: "SET_INVENTORY_ITEM_PAGE_FILTER_OPTION",
              payload: value,
            })
          }
        />

        <ExportButton onClick={() => {}} />
      </div>
      {!loading ? (
        <Table
          paginationModel={paginationModel}
          onPaginationModelChange={(newPaginationModel) =>
            dispatch({
              type: "SET_INVENTORY_PAGE_PAGINATION_MODEL",
              payload: newPaginationModel,
            })
          }
          columns={inventoryColumns}
          rows={inventoryItemsFromStore}
          noCheckboxSelection
        />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default InventoryItemList;
