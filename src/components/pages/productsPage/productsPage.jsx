import React from "react";
import SearchBar from "../../layouts/searchBar/searchBar.jsx";
import Table from "../../core/table/table.jsx";
import "./productsPage.css";

function ProductsPage() {
  const options = ["product", "category", "brand", "price", "quantity"];
  const productRows = [
    {
      id: 1,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 2,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 3,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 4,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 5,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 6,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 7,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 8,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
    {
      id: 9,
      col1: "brick",
      col2: "100",
      col3: "kg",
      col4: "China",
    },
  ];
  const productColumns = [
    {
      field: "col1",
      headerName: "Product Name",
      width: 200,
    },
    { field: "col2", headerName: "Price", flex: 1 },
    { field: "col3", headerName: "Calculation unit", flex: 1 },
    { field: "col4", headerName: "Origin", flex: 1 },
  ];
  return (
    <div className="pageContainer">
      <SearchBar
        options={options}
        placeholder="Search Inventory by name, ID or any related keywords"
      />
      <Table columns={productColumns} rows={productRows} />
    </div>
  );
}

export default ProductsPage;
