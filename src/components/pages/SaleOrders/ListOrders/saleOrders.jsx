import React from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../layouts/searchBar/searchBar.jsx";
import Table from "../../../core/table/table.jsx";
import ExportButton from "../../../layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../../layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../../layouts/newButton/newButton.jsx";

import "./saleOrders.css";

function SaleOrdersPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/orders/add");
  };

  const options = [
    "Customer's phone number",
    "Customer's name",
    "Total",
    "Date",
    "Status",
  ];
  const productRows = [
    {
      id: 1,
      customerPhone: "123456789",
      customerName: "John Doe",
      total: "1000$",
      date: "2021-09-01",
      status: "Processing",
    },
    {
      id: 2,
      customerPhone: "123456789",
      customerName: "John Smith",
      total: "1000$",
      date: "2021-09-01",
      status: "Processing",
    },
    {
      id: 3,
      customerPhone: "123456789",
      customerName: "John Doe",
      total: "1000$",
      date: "2021-09-01",
      status: "Processing",
    },
    {
      id: 4,
      customerPhone: "123456789",
      customerName: "John Smith",
      total: "1000$",
      date: "2021-09-01",
      status: "Processing",
    },
    {
      id: 5,
      customerPhone: "123456789",
      customerName: "John Doe",
      total: "1000$",
      date: "2021-09-01",
      status: "Processing",
    },
  ];
  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => params.row.id,
    },
    {
      field: "customerPhone",
      headerName: "Customer's phone number",
      flex: 0.4,
    },
    {
      field: "customerName",
      headerName: "Customer's name",
      flex: 0.6,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
    },
    { field: "date", headerName: "Date", flex: 0.4 },
    { field: "status", headerName: "Status", flex: 0.4 },
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
          <NewButton text="New Order" onClick={handleClick} />
        </div>
      </div>
      <Table className="table" columns={productColumns} rows={productRows} />
    </div>
  );
}

export default SaleOrdersPage;
