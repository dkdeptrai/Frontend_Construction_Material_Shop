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

  const options = ["Name", "Quantity", "Unit", "Unit Price", "Total"];

  const paginationModel = useSelector(
    (state) => state.inventoryItems.paginationModel
  );
  console.log(paginationModel);
  //get all inventory items
  useEffect(() => {
    setLoading(true);
    fetch(
      API_CONST +
        `/inventories?page=${paginationModel.page}&size=${paginationModel.pageSize}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({
          type: "SET_INVENTORY_PAGE_INVENTORY_ITEM",
          payload: data.results,
        });
        dispatch({
          type: "SET_INVENTORY_PAGE_PAGINATION_MODEL",
          payload: { ...paginationModel, total: data.total },
        });
        console.log("get inventory items from api", data.results);
      })
      .then(() => setLoading(false))
      .catch((error) => console.error("Error:", error));
  }, [paginationModel.page, paginationModel.pageSize]);

  const inventoryColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => inventoryItemsFromStore.indexOf(params.row) + 1,
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
      valueGetter: (params) => params.row.manufacturingDate[0],
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
          placeholder="Search Products by name, ID or any related keywords"
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
