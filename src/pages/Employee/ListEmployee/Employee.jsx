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
  const [loading, setLoading] = useState(false);

  const subroute = useSelector((state) => state.employees.subroute);

  const options = {
    name: "NAME",
    phone: "PHONE",
    email: "EMAIL",
    "emloyee code": "CODE",
  };

  // table states
  const selectedRowIds = useSelector((state) => state.employees.selectedRowIds);

  // search states

  const searchResults = useSelector((state) => state.employees.searchResults);
  const showSearchResults = useSelector(
    (state) => state.employees.showSearchResults
  );
  const searchQuery = useSelector((state) => state.employees.searchQuery);
  const filterOption = useSelector((state) => state.employees.filterOption);
  const employees = useSelector((state) => state.employees.employees);
  const paginationModel = useSelector(
    (state) => state.employees.paginationModel
  );
  const searchPaginationModel = useSelector(
    (state) => state.employees.searchPaginationModel
  );
  console.log("showSearchResults: ", showSearchResults);

  const fetchEmployees = async (page, size) => {
    console.log("fetching employees");
    try {
      setLoading(true);
      const response = await fetch(
        `${API_CONST}/users/employees?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_EMPLOYEES_PAGE_EMPLOYEES", payload: data.results });
      dispatch({
        type: "SET_EMPLOYEES_PAGE_PAGINATION_MODEL",
        payload: {
          ...paginationModel,
          total: data.total,
        },
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    setLoading(false);
  };

  const handleSearch = async (page, size) => {
    try {
      setLoading(true);
      let query = `&page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}&keyword=${searchQuery}&searchBy=${filterOption}`;
      console.log(`QUERY: ${query}`);
      const response = await fetch(
        `${API_CONST}/users/employees/search?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const employees = data.results;
      console.log("search results: ", employees);
      dispatch({
        type: "SET_EMPLOYEES_PAGE_SEARCH_RESULTS",
        payload: employees,
      });
      dispatch({
        type: "SET_EMPLOYEES_PAGE_SHOW_SEARCH_RESULTS",
        payload: true,
      });
      dispatch({
        type: "SET_EMPLOYEES_PAGE_SEARCH_PAGINATION_MODEL",
        payload: { ...searchPaginationModel, total: data.total },
      });
    } catch (e) {
      console.log("error ", e);
      dispatch({
        type: "SET_EMPLOYEES_PAGE_SHOW_SEARCH_RESULTS",
        payload: true,
      });
      dispatch({ type: "SET_EMPLOYEES_PAGE_SEARCH_RESULTS", payload: [] });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClick = () => {
    navigate("/employees/add");
  };

  //get employee list
  useEffect(() => {
    fetchEmployees(paginationModel.page, paginationModel.pageSize);
    setLoading(false);
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    handleSearch();
  }, [searchPaginationModel.page, searchPaginationModel.pageSize]);

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
      dispatch({
        type: "SET_EMPLOYEES_PAGE_SEARCH_RESULTS",
        payload: searchResults.filter(
          (employee) => !selectedRowIds.includes(employee.id)
        ),
      });
      dispatch({
        type: "SET_EMPLOYEES_PAGE_SEARCH_PAGINATION_MODEL",
        payload: {
          ...searchPaginationModel,
          total: searchPaginationModel.total - selectedRowIds.length,
        },
      });
    } else {
      dispatch({
        type: "SET_EMPLOYEES_PAGE_EMPLOYEES",
        payload: employees.filter(
          (employee) => !selectedRowIds.includes(employee.id)
        ),
      });
      dispatch({
        type: "SET_EMPLOYEES_PAGE_PAGINATION_MODEL",
        payload: {
          ...paginationModel,
          total: paginationModel.total - selectedRowIds.length,
        },
      });
    }
  };

  const handleSearchQueryChange = (event) => {
    dispatch({
      type: "SET_EMPLOYEES_PAGE_SEARCH_QUERY",
      payload: event.target.value,
    });
    if (event.target.value === "" || event.target.value === null) {
      dispatch({
        type: "SET_EMPLOYEES_PAGE_SHOW_SEARCH_RESULTS",
        payload: false,
      });
      dispatch({ type: "SET_EMPLOYEES_PAGE_SEARCH_RESULTS", payload: [] });
      fetchProducts(paginationModel.page, paginationModel.pageSize);
    }
  };
  const employeeColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) =>
        showSearchResults
          ? searchPaginationModel.page * 10 +
            searchResults.indexOf(params.row) +
            1
          : paginationModel.page * 10 + employees.indexOf(params.row) + 1,
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
          placeholder="Search Employees"
          handleSearch={handleSearch}
          handleSearchQueryChange={handleSearchQueryChange}
          value={searchQuery}
          setFilter={(value) => {
            dispatch({
              type: "SET_EMPLOYEES_PAGE_FILTER_OPTION",
              payload: value,
            });
          }}
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
        rows={showSearchResults ? searchResults : employees}
        selectedRowIds={selectedRowIds}
        cellName="name"
        identifyRoute="id"
        onRowSelection={(newSelection) => {
          dispatch({
            type: "SET_EMPLOYEES_PAGE_SELECTED_ROW_IDS",
            payload: newSelection,
          });
        }}
        paginationModel={
          showSearchResults ? searchPaginationModel : paginationModel
        }
        onPaginationModelChange={
          showSearchResults
            ? (newPaginationModel) =>
                dispatch({
                  type: "SET_EMPLOYEES_PAGE_SEARCH_PAGINATION_MODEL",
                  payload: newPaginationModel,
                })
            : (newPaginationModel) =>
                dispatch({
                  type: "SET_EMPLOYEES_PAGE_PAGINATION_MODEL",
                  payload: newPaginationModel,
                })
        }
      />
    </div>
  );
}

export default Employee;
