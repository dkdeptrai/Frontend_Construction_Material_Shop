import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent.jsx";
import CustomerIcon from "../../../assets/icons/customer_default.png";
import { API_CONST } from "../../../constants/apiConstants.jsx";

import "./Employee.css";

function Employee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // table states
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
    total: 0,
  });
  const [searchPaginationModel, setSearchPaginationModel] = useState({
    pageSize: 10,
    page: 0,
    total: 0,
  });

  //search query
  const [searchQuery, setSearchQuery] = useState("");

  // search states
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [employees, setEmployees] = useState([]);

  // filter options
  const options = ["Code", "Name", "Phone"];
  const [filter, setFilter] = useState(options[0]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");

  //handle search

  const fetchEmployees = async (page, size) => {
    try {
      const response = await fetch(
        `${API_CONST}/users/employees?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      setEmployees(data.results);
      setPaginationModel({
        ...paginationModel,
        total: data.total,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = async (page, size) => {
    try {
      let query = `page=${page}&size=${size}`;
      if (filter === "Code") {
        query += `&keyword=${searchQuery}&searchBy=CODE`;
      }
      if (filter === "Name") {
        query += `&keyword=${searchQuery}&searchBy=NAME`;
      }
      if (filter === "Phone") {
        query += `&keyword=${searchQuery}&searchBy=PHONE`;
      }

      const response = await fetch(
        `${API_CONST}/users/employees/search?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      const searchedEmployees = await response.json();
      setSearchResults(searchedEmployees.results);
      setShowSearchResults(true);
      setSearchPaginationModel({
        ...searchPaginationModel,
        total: searchedEmployees.total,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    navigate("/employees/add");
  };

  //get employee list
  useEffect(() => {
    fetchEmployees(paginationModel.page, paginationModel.pageSize);
    setLoading(false);
  }, [paginationModel.page, paginationModel.pageSize]);

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
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.xls"; // or any other filename
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete the selected employees?"
      ) !== true
    )
      return;
    for (const id of selectedRowIds) {
      await fetch(API_CONST + "/users/employees/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
    }
    if (searchResults.length > 0) {
      setSearchResults(
        searchResults.filter(
          (employee) => !selectedRowIds.includes(employee.id)
        )
      );
      setSearchPaginationModel((prevState) => ({
        ...prevState,
        total: prevState.total - selectedRowIds.length,
      }));
    } else {
      setEmployees(
        employees.filter((employee) => !selectedRowIds.includes(employee.id))
      );
      setPaginationModel((prevState) => ({
        ...prevState,
        total: prevState.total - selectedRowIds.length,
      }));
    }
  };

  const employeeColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => employees.indexOf(params.row) + 1,
    },
    {
      field: "employeeCode",
      headerName: "Employee Code",
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Employee Name",
      flex: 0.5,
      renderCell: (params) => (
        <div className="productNameCell">
          <img
            className="productImage"
            src={params.row.imageUrl || CustomerIcon}
          />
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
          placeholder="Search Employee"
          handleSearch={() => {
            handleSearch(paginationModel.page, paginationModel.pageSize);
          }}
          value={searchQuery}
          handleSearchQueryChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === "" || e.target.value == null) {
              setShowSearchResults(false);
              setSearchResults([]);
              fetchEmployees(paginationModel.page, paginationModel.pageSize);
            }
          }}
          setFilter={(filter) => setFilter(filter)}
        />
        <div className="buttonContainer">
          <ExportButton onClick={handleExport} />
          <DeleteButton onClick={handleDelete} />
          <NewButton text="New Employee" onClick={handleClick} />
        </div>
      </div>
      {!loading ? (
        <Table
          className="table"
          columns={employeeColumns}
          rows={showSearchResults ? searchResults : employees}
          cellName="employeeCode"
          identifyRoute="id"
          onRowSelection={(newSelection) => {
            setSelectedRowIds(newSelection);
          }}
          paginationModel={
            showSearchResults ? searchPaginationModel : paginationModel
          }
          onPaginationModelChange={
            showSearchResults ? setSearchPaginationModel : setPaginationModel
          }
        />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}

export default Employee;
