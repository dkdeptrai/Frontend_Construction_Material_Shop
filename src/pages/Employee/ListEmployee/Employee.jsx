import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";

import "./Employee.css";

function Employee() {
  const navigate = useNavigate();
  const [employeeRows, setEmployeeRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleClick = () => {
    navigate("/employees/add");
  };

  useEffect(() => {
    fetch(API_CONST + "/users/employees?page=0&size=5", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setEmployeeRows(data.results);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleExport = async () => {
    const response = await fetch(API_CONST + "/users/employees/export/excel", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.xls'; // or any other filename
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the selected employees?") !== true) r;
    for (const id of selectedRows) {
      await fetch(API_CONST + "/users/employees/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
    }

    const newEmployeeRows = employeeRows.filter(
      (employee) => !selectedRows.includes(employee.id)
    );
    setEmployeeRows(newEmployeeRows);
  };

  const options = ["Name", "Phone number", "Address", "Position"];

  const employeeColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => employeeRows.indexOf(params.row) + 1,
    },
    {
      field: "name",
      headerName: "Employee Name",
      flex: 0.5,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.imageUrl} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "phone", headerName: "Phone Number", flex: 0.3 },
    {
      field: "contactAddress",
      headerName: "Address",
      flex: 0.6,
    },
    { field: "employeeType", headerName: "Position", flex: 0.4 },
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
          <ExportButton onClick={handleExport} />
          <DeleteButton onClick={handleDelete} />
          <NewButton text="New Employee" onClick={handleClick} />
        </div>
      </div>
      <Table
        className="table"
        columns={employeeColumns}
        rows={employeeRows}
        cellName="name"
        identifyRoute="id"
        onRowSelection={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
    </div>
  );
}

export default Employee;
