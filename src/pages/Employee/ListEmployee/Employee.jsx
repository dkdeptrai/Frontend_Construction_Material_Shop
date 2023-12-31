import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import ImageInputComponent from "../../../components/imageInputComponent/imageInputComponent.jsx";
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

  const handleDelete = async () => {
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
          <ExportButton onClick={() => {}} />
          <DeleteButton onClick={handleDelete} />
          <NewButton text="New Employee" onClick={handleClick} />
        </div>
      </div>
      <Table
        className="table"
        columns={employeeColumns}
        rows={employeeRows}
        onRowSelection={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
    </div>
  );
}

export default Employee;
