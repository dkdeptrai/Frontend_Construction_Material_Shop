import React, { useState, useEffect } from "react";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar";
import ExportButton from "../../../components/layouts/exportButton/exportButton";
import Table from "../../../components/core/table/table"; // Change the import statement to use lowercase 'table' instead of uppercase 'Table'
import { API_CONST } from "../../../constants/apiConstants";

const InventoryItemList = () => {
  const options = ["Name", "Quantity", "Unit", "Unit Price", "Total"];

  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    fetch(API_CONST + "/inventories?page=0&size=2", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setInventoryItems(data.results);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const inventoryColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => inventoryItems.indexOf(params.row) + 1,
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
      valueGetter: (params) =>
        params.row.expiryDate[1] +
        "/" +
        params.row.expiryDate[2] +
        "/" +
        params.row.expiryDate[0],
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
      <Table columns={inventoryColumns} rows={inventoryItems} noCheckboxSelection/>
    </div>
  );
};

export default InventoryItemList;
