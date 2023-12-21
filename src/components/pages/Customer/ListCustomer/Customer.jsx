import React, { useEffect, useState } from "react";
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
  const [customerRows, setCustomerRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/customers", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newCustomerRows = data.map((customer) => ({
          id: customer.id,
          customerName: customer.name,
          phoneNumber: customer.phone,
          address: customer.contactAddress,
          orders: 0,
        }));
        setCustomerRows(newCustomerRows);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleClick = () => {
    navigate("/customers/add");
  };

  const options = ["Name", "Phone", "Address", "Orders"];

  const customerColumns = [
    {
      field: "id",
      headerName: "No.",
      width: 50,
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
        identifyRoute="id"      
      />
    </div>
  );
}

export default Customer;
