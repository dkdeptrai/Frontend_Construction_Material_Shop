import React from "react";
import "./Customer.css";
import { useNavigate } from "react-router-dom";

//pages and components
import Table from "../../../core/table/table";
import SearchBar from "../../../layouts/searchBar/searchBar";
import ExportButton from "../../../layouts/exportButton/exportButton";
import DeleteButton from "../../../layouts/deleteButton/deleteButton";
import NewButton from "../../../layouts/newButton/newButton";

function Customer(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/customers/add");
  };

  const options = ["Name", "Phone", "Address", "Orders"];
  const customerRows = [
    {
      id: 1,
      customerName: "John Doe",
      phoneNumber: "123456789",
      address: "Bishkek",
      orders: "2",
    },
    {
      id: 2,
      customerName: "John Smith",
      phoneNumber: "123456789",
      address: "Ha Noi",
      orders: "2",
    },
    {
      id: 3,
      customerName: "John Doe",
      phoneNumber: "123456789",
      address: "Bishkek",
      orders: "2",
    },
    {
      id: 4,
      customerName: "John Smith",
      phoneNumber: "123456789",
      address: "Ha Noi",
      orders: "2",
    },
    {
      id: 5,
      customerName: "John Doe",
      phoneNumber: "123456789",
      address: "Bishkek",
      orders: "2",
    },
    {
      id: 6,
      customerName: "John Smith",
      phoneNumber: "123456789",
      address: "Ha Noi",
      orders: "2",
    },
    {
      id: 7,
      customerName: "John Doe",
      phoneNumber: "123456789",
      address: "Bishkek",
      orders: "2",
    },
    {
      id: 8,
      customerName: "John Smith",
      phoneNumber: "123456789",
      address: "Ha Noi",
      orders: "2",
    },
    {
      id: 9,
      customerName: "John Doe",
      phoneNumber: "123456789",
      address: "Bishkek",
      orders: "2",
    },
    {
      id: 10,
      customerName: "John Smith",
      phoneNumber: "123456789",
      address: "Ha Noi",
      orders: "2",
    },
  ];

  const customerColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => params.row.id,
    },
    {
      field: "customerName",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "phoneNumber", headerName: "Phone", flex: 0.3 },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
    },
    { field: "orders", headerName: "Orders", flex: 0.2 },
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
          <NewButton text="New Product" onClick={handleClick} />
        </div>
      </div>
      <Table
        className="table"
        columns={customerColumns}
        rows={customerRows}
        cellName="customerName"
        identifyRoute="phoneNumber"
      />
    </div>
  );
}

export default Customer;
