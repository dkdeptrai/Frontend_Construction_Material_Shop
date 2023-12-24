import React from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";


import "./Employee.css";

function Employee() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/employees/add");
  };
  
  const options = ["Name", "Phone number", "Address", "Position"];
  const productRows = [
    {
      id: 1,
      employeeName: "John Doe",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Bishkek",
      position: "Employee",
    },
    {
      id: 2,
      employeeName: "John Smith",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Ha Noi",
      position: "Employee",
    },
    {
      id: 3,
      employeeName: "John Doe",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Bishkek",
      position: "Employee",
    },
    {
      id: 4,
      employeeName: "John Smith",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Ha Noi",
      position: "Employee",
    },
    {
      id: 5,
      employeeName: "John Doe",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Bishkek",
      position: "Employee",
    },
    {
      id: 6,
      employeeName: "John Smith",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Ha Noi",
      position: "Employee",
    },
    {
      id: 7,
      employeeName: "John Doe",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Bishkek",
      position: "Employee",
    },
    {
      id: 8,
      employeeName: "John Smith",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Ha Noi",
      position: "Employee",
    },
    {
      id: 9,
      employeeName: "John Doe",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Bishkek",
      position: "Employee",
    },
    {
      id: 10,
      employeeName: "John Smith",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Ha Noi",
      position: "Employee",
    },
    {
      id: 11,
      employeeName: "John Doe",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Bishkek",
      position: "Employee",
    },
    {
      id: 12,
      employeeName: "John Smith",
      image: "https://picsum.photos/200",
      phoneNumber: "123456789",
      address: "Ha Noi",
      position: "Employee",
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
      field: "employeeName",
      headerName: "Employee Name",
      flex: 0.5,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "phoneNumber", headerName: "Phone Number", flex: 0.3 },
    {
      field: "address",
      headerName: "Address",
      flex: 0.6,
    },
    { field: "position", headerName: "Position", flex: 0.4 },
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
          <NewButton text="New Employee" onClick={handleClick} />
        </div>
      </div>
      <Table className="table" columns={productColumns} rows={productRows} />
    </div>
  );
}

export default Employee;
