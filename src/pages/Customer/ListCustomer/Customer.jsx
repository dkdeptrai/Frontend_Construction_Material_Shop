import React, { useEffect, useState } from "react";
import "./Customer.css";
import { useNavigate } from "react-router-dom";

//pages and components
import Table from "../../../components/core/table/table";
import SearchBar from "../../../components/layouts/searchBar/searchBar";
import ExportButton from "../../../components/layouts/exportButton/exportButton";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton";
import NewButton from "../../../components/layouts/newButton/newButton";
import CustomerIcon from "../../../assets/icons/customer_default.png";

function Customer(props) {
  const navigate = useNavigate();
  const [customerRows, setCustomerRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/customers", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerRows(data.results);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //Add customer
  const handleClick = () => {
    navigate("/customers/add");
  };

  //Delete customer
  const handleDelete = async () => {
    for (const id of selectedRows) {
      await fetch("http://localhost:8080/api/v1/customers/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
    }

    const newCustomerRows = customerRows.filter(
      (customer) => !selectedRows.includes(customer.id)
    );
    setCustomerRows(newCustomerRows);
  };

  //table
  const options = ["Name", "Phone", "Address", "Orders"];

  const customerColumns = [
    {
      field: "id",
      headerName: "No.",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => (
        <div className="customerNameCell">
          <img
            className="customerImage"
            src={params.row.image || CustomerIcon}
          />

          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "phone", headerName: "Phone", flex: 0.3 },
    {
      field: "contactAddress",
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
          <DeleteButton onClick={handleDelete} />
          <NewButton text=" New Customer" onClick={handleClick} />
        </div>
      </div>
      <Table
        className="table"
        columns={customerColumns}
        rows={customerRows}
        cellName="name"
        identifyRoute="id"
        onRowSelection={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
    </div>
  );
}

export default Customer;
