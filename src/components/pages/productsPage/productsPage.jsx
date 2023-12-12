import React from "react";
import SearchBar from "../../layouts/searchBar/searchBar.jsx";
import Table from "../../core/table/table.jsx";
import ExportButton from "../../layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../layouts/newButton/newButton.jsx";
import "./productsPage.css";

function ProductsPage() {
  const options = ["product", "category", "brand", "price", "quantity"];
  const fetchProduct = function () {};
  const productRows = [
    {
      id: 1,
      productName: "brick",
      image: "https://picsum.photos/200",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 2,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 3,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 4,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 5,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 6,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 7,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 8,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 9,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 10,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 11,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 12,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
    {
      id: 13,
      productName: "brick",
      productPrice: "100",
      productCalculationUnit: "kg",
      productOrigin: "China",
    },
  ];
  const productColumns = [
    { field: "index", headerName: "No.", width: 50 },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1.5,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "productPrice", headerName: "Price", flex: 0.3 },
    {
      field: "productCalculationUnit",
      headerName: "Calculation unit",
      flex: 0.4,
    },
    { field: "productOrigin", headerName: "Origin", flex: 1 },
  ];
  return (
    <div className="pageContainer">
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search Products by name, ID or any related keywords"
        />
        <div className="buttonContainer">
          <ExportButton onClick={() => {}} />
          <DeleteButton onClick={() => {}} />
          <NewButton text="New Product" onClick={() => {}} />
        </div>
      </div>
      <Table className="table" columns={productColumns} rows={productRows} />
    </div>
  );
}

export default ProductsPage;
