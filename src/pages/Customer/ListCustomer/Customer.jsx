import React, { useEffect, useState } from "react";
import "./Customer.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//pages and components
import Table from "../../../components/core/table/table";
import SearchBar from "../../../components/layouts/searchBar/searchBar";
import ExportButton from "../../../components/layouts/exportButton/exportButton";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton";
import NewButton from "../../../components/layouts/newButton/newButton";
import CustomerIcon from "../../../assets/icons/customer_default.png";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import { API_CONST } from "../../../constants/apiConstants";

function Customer() {
  const dispatch = useDispatch();
  const subroute = useSelector((state) => state.customers.subroute);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const customers = useSelector((state) => state.customers.customers);
  const selectedRowIds = useSelector((state) => state.customers.selectedRowIds);

  //table states
  const paginationModel = useSelector(
    (state) => state.customers.paginationModel
  );
  const searchPaginationModel = useSelector(
    (state) => state.customers.searchPaginationModel
  );

  //search states
  const searchOptions = ["name", "phone"];

  const searchResults = useSelector((state) => state.customers.searchResults);

  const showSearchResults = useSelector(
    (state) => state.customers.showSearchResults
  );
  console.log("showSearchResults", showSearchResults);
  // filter options
  const filter = useSelector((state) => state.customers.filterOption);
  const searchQuery = useSelector((state) => state.customers.searchQuery);

  console.log(useSelector((state) => state.customers.searchResults));

  const fetchCustomers = async (page, size) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_CONST}/customers?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      const customers = data.results;
      dispatch({
        type: "SET_CUSTOMERS_PAGE_CUSTOMERS",
        payload: customers,
      });
      const total = data.total;
      dispatch({
        type: "SET_CUSTOMERS_PAGE_PAGINATION_MODEL",
        payload: {
          ...paginationModel,
          total: total,
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error fetching customers: ", error);
    }
  };

  const handleSearch = async (page, size) => {
    try {
      let query = `page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}`;
      if (filter == "name") {
        query = query + `&customerName=${searchQuery}`;
      }
      if (filter == "phone") {
        query = query + `&phone=${searchQuery}`;
      }
      console.log("query", query);
      const response = await fetch(`${API_CONST}/customers?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const customers = data.results;
      dispatch({
        type: "SET_CUSTOMERS_PAGE_SEARCH_RESULTS",
        payload: customers,
      });
      dispatch({ type: "SET_CUSTOMERS_PAGE_SHOW_RESULTS", payload: true });
      dispatch({
        type: "SET_CUSTOMERS_PAGE_SEARCH_PAGINATION_MODEL",
        payload: { ...searchPaginationModel, total: data.total },
      });
    } catch (error) {
      dispatch({ type: "SET_CUSTOMERS_PAGE_SHOW_RESULTS", payload: false });

      console.log("Error searching customers: ", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_CONST}/customers/export/excel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log("Exported customers: ", data);
    } catch (error) {
      console.log("Error exporting customers: ", error);
    }
  };

  useEffect(() => {
    if (subroute) {
      let id = subroute.split("/")[1];
      if (id) {
        navigate(`/customers/${id}`);
      } else if (subroute === "add") {
        navigate("/customers/add");
      }
    }
  }, [subroute]);

  //get customer list
  useEffect(() => {
    fetchCustomers(paginationModel.page, paginationModel.pageSize);
    dispatch({
      type: "SET_CUSTOMERS_PAGE_SHOW_SEARCH_RESULTS",
      payload: false,
    });
  }, [paginationModel.page, paginationModel.pageSize]);

  // useEffect(() => {
  //   handleSearch();
  // }, [searchPaginationModel.page, searchPaginationModel.pageSize]);

  //Add customer
  const navigateToNewCustomer = () => {
    dispatch({ type: "SET_CUSTOMERS_PAGE_SUBROUTE", payload: "add" });
    navigate("/customers/add");
  };

  //Delete customer
  const handleDelete = async (selectedRowIds) => {
    try {
      if (
        window.confirm(
          "Are you sure you want to delete the selected customer?"
        ) !== true
      )
        return;
      await Promise.all(
        selectedRowIds.map((id) =>
          fetch(`${API_CONST}/customers/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          })
        )
      );
      if (searchResults.length > 0) {
        dispatch({
          type: "SET_CUSTOMERS_PAGE_SEARCH_RESULTS",
          payload: searchResults.filter(
            (customer) => !selectedRowIds.includes(customer.id)
          ),
        });
        dispatch({
          type: "SET_CUSTOMERS_PAGE_SEARCH_PAGINATION_MODEL",
          payload: {
            ...searchPaginationModel,
            total: searchPaginationModel.total - selectedRowIds.length,
          },
        });
      } else {
        dispatch({
          type: "SET_CUSTOMERS_PAGE_CUSTOMERS",
          payload: customers.filter(
            (customer) => !selectedRowIds.includes(customer.id)
          ),
        });
        dispatch({
          type: "SET_CUSTOMERS_PAGE_PAGINATION_MODEL",
          payload: {
            ...paginationModel,
            total: paginationModel.total - selectedRowIds.length,
          },
        });
      }
    } catch (error) {
      console.log("Error deleting customers: ", error);
    }
  };

  const handleSearchQueryChange = (event) => {
    console.log("filter", filter);
    dispatch({
      type: "SET_CUSTOMERS_PAGE_SEARCH_QUERY",
      payload: event.target.value,
    });
    if (event.target.value === "" || event.target.value == null) {
      dispatch({ type: "SET_CUSTOMERS_PAGE_SHOW_RESULTS", payload: false });
      dispatch({ type: "SET_CUSTOMERS_PAGE_SEARCH_RESULTS", payload: [] });
      fetchCustomers(paginationModel.page, paginationModel.pageSize);
    }
  };

  const handleCellClick = (params, event) => {
    if (params.field === "name") {
      dispatch({
        type: "SET_CUSTOMERS_PAGE_SUBROUTE",
        payload: `add/${params.id}`,
      });
      navigate(`/customers/${params.id}`);
      event.stopPropagation();
    }
  };

  const customerColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) =>
        showSearchResults
          ? searchPaginationModel.page * 10 +
            searchResults.indexOf(params.row) +
            1
          : paginationModel.page * 10 + customers.indexOf(params.row) + 1,
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
    {
      headerName: "Orders",
      flex: 0.2,
      valueGetter: (params) => params.row.orderIds.length || 0,
    },
  ];

  return (
    <div className="customerPageContainer">
      <div className="toolBar">
        <SearchBar
          options={searchOptions}
          handleSearch={handleSearch}
          className="searchBar"
          placeholder="Search Customer by name"
          handleSearchQueryChange={handleSearchQueryChange}
          value={searchQuery}
          setFilter={(value) =>
            dispatch({
              type: "SET_CUSTOMERS_PAGE_FILTER_OPTION",
              payload: value,
            })
          }
        />
        <div className="buttonContainer">
          <ExportButton onClick={handleExport} />
          <DeleteButton onClick={() => handleDelete(selectedRowIds)} />
          <NewButton text=" New Customer" onClick={navigateToNewCustomer} />
        </div>
      </div>
      {!isLoading ? (
        <Table
          className="table"
          columns={customerColumns}
          rows={showSearchResults ? searchResults : customers}
          handleCellClick={handleCellClick}
          selectedRowIds={selectedRowIds}
          cellName="name"
          identifyRoute="id"
          onRowSelection={(newSelection) => {
            dispatch({
              type: "SET_CUSTOMERS_PAGE_SELECTED_ROW_IDS",
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
                    type: "SET_CUSTOMERS_PAGE_SEARCH_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
              : (newPaginationModel) =>
                  dispatch({
                    type: "SET_CUSTOMERS_PAGE_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
          }
        />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}

export default Customer;
