import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import StatusContainer from "../../../components/StatusContainer/StatusContainer.jsx";
import InputComponent from "../../../components/InputComponent/InputComponent.jsx";
import CustomerIcon from "../../../assets/icons/customer_default.png";
import { API_CONST } from "../../../constants/apiConstants.jsx";

//selected products state
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent.jsx";

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //loading circle
  const [loading, setLoading] = useState(true);

  const paginationModel = useSelector(
    (state) => state.purchaseOrders.paginationModel
  );
  console.log(paginationModel);

  const purchaseOrdersFromStore = useSelector(
    (state) => state.purchaseOrders.purchaseOrdersData
  );

  //search
  const searchQuery = useSelector((state) => state.purchaseOrders.searchQuery);
  const searchPaginationModel = useSelector(
    (state) => state.purchaseOrders.searchPaginationModel
  );
  const searchResults = useSelector(
    (state) => state.purchaseOrders.searchResults
  );
  const showSearchResults = useSelector(
    (state) => state.purchaseOrders.showSearchResults
  );

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (
        (searchQuery === "" || searchQuery === null) &&
        filterStartDate === "" &&
        filterEndDate === "" &&
        filterStatus === ""
      ) {
        dispatch({
          type: "SET_PURCHASE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
          payload: false,
        });
        setLoading(false);
        return;
      }
      let query = `&page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}&orderType=PURCHASE&id=${searchQuery}`;
      if (filterStartDate !== "") {
        query += `&startDate=${filterStartDate}`;
      }
      if (filterEndDate !== "") {
        query += `&endDate=${filterEndDate}`;
      }
      if (filterStatus !== "") {
        query += `&status=${filterStatus}`;
      }
      const response = await fetch(`${API_CONST}/orders?${query}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });

      const data = await response.json();

      const searchedPurchaseOrders = [];
      for (let i = 0; i < data.results.length; i++) {
        const order = data.results[i];
        const employeeData = await fetch(
          API_CONST + "/users/employees/" + order.createdUserId,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );

        const employee = await employeeData.json();

        const dateString = new Date(order.createdTime).toLocaleDateString();

        const newOrder = {
          id: order.id,
          employeeCode: employee.employeeCode,
          employeeName: employee.name,
          total: order.total,
          date: dateString,
          status: order.status,
        };
        searchedPurchaseOrders.push(newOrder);
      }

      dispatch({
        type: "SET_PURCHASE_ORDERS_PAGE_SEARCH_RESULTS",
        payload: searchedPurchaseOrders,
      });
      dispatch({
        type: "SET_PURCHASE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
        payload: true,
      });
      dispatch({
        type: "SET_PURCHASE_ORDERS_PAGE_SEARCH_PAGINATION_MODEL",
        payload: { ...searchPaginationModel, total: data.total },
      });
    } catch (e) {
      console.log("error ", e);
      dispatch({
        type: "SET_PURCHASE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
        payload: true,
      });
      dispatch({
        type: "SET_PURCHASE_ORDERS_PAGE_SEARCH_RESULTS",
        payload: [],
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSearchQueryChange = (event) => {
    dispatch({
      type: "SET_PURCHASE_ORDERS_PAGE_SEARCH_QUERY",
      payload: event.target.value,
    });
    if (event.target.value === "" || event.target.value === null) {
      dispatch({
        type: "SET_PURCHASE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
        payload: false,
      });
      dispatch({
        type: "SET_PURCHASE_ORDERS_PAGE_SEARCH_RESULTS",
        payload: [],
      });
    }
  };

  //filter
  const filterStartDate = useSelector(
    (state) => state.purchaseOrders.startDate
  );
  const filterEndDate = useSelector((state) => state.purchaseOrders.endDate);
  const filterStatus = useSelector((state) => state.purchaseOrders.status);
  const statusOptions = ["PROCESSING", "DELIVERING", "COMPLETED", "CANCELLED"];

  //get all sale orders
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "SET_PURCHASE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
      payload: false,
    });
    dispatch({
      type: "SET_PURCHASE_ORDERS_PAGE_START_DATE",
      payload: "",
    });
    dispatch({
      type: "SET_PURCHASE_ORDERS_PAGE_END_DATE",
      payload: "",
    });
    dispatch({
      type: "SET_PURCHASE_ORDERS_PAGE_STATUS",
      payload: "",
    });
    fetch(
      `${API_CONST}/orders?page=${paginationModel.page}&size=${paginationModel.pageSize}&orderType=PURCHASE`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then(async (data) => {
        const newPurchaseOrders = [];
        for (let i = 0; i < data.results.length; i++) {
          const order = data.results[i];
          const employeeData = await fetch(
            API_CONST + "/users/employees/" + order.createdUserId,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );

          const employee = await employeeData.json();

          const dateString = new Date(order.createdTime).toLocaleDateString();

          const newOrder = {
            id: order.id,
            employeeCode: employee.employeeCode,
            employeeName: employee.name,
            total: order.total,
            date: dateString,
            status: order.status,
          };
          newPurchaseOrders.push(newOrder);
        }
        dispatch({ type: "SET_PURCHASE_ORDERS", payload: newPurchaseOrders });
        dispatch({
          type: "SET_PURCHASE_ORDERS_PAGE_PAGINATION_MODEL",
          payload: { ...paginationModel, total: data.total },
        });
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  }, [paginationModel.page, paginationModel.pageSize]);

  const handleClick = () => {
    navigate("/purchase-orders/add");
  };

  const orderColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => {
        if (showSearchResults) {
          return searchResults.indexOf(params.row) + 1;
        }
        return purchaseOrdersFromStore.indexOf(params.row) + 1;
      },
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "employeeCode",
      headerName: "Employee's code",
      flex: 0.4,
      valueGetter: (params) => params.row.employeeCode || "MANAGER",
    },
    {
      field: "employeeName",
      headerName: "Employee's name",
      flex: 0.6,
      renderCell: (params) => (
        <div className="productNameCell">
          <img
            className="productImage"
            src={params.row.image || CustomerIcon}
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
      valueGetter: (params) =>
        params.row.total ? params.row.total.toLocaleString() + " $" : "0.0 $",
    },
    { field: "date", headerName: "Date", flex: 0.4 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      renderCell: (params) => <StatusContainer status={params.value} />,
    },
  ];

  return (
    <div className="pageContainer">
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          placeholder="Search for orders by id"
          value={searchQuery}
          handleSearch={handleSearch}
          handleSearchQueryChange={handleSearchQueryChange}
        />
        <div className="buttonContainer">
          <NewButton text="New Order" onClick={handleClick} />
        </div>
      </div>
      <div className="filters-container">
        <div className="filters">
          <InputComponent
            type="dateFilter"
            placeholder="Start date"
            value={filterStartDate}
            setValue={(value) =>
              dispatch({
                type: "SET_PURCHASE_ORDERS_PAGE_START_DATE",
                payload: value,
              })
            }
          />

          <InputComponent
            type="dateFilter"
            placeholder="Date"
            value={filterEndDate}
            setValue={(value) =>
              dispatch({
                type: "SET_PURCHASE_ORDERS_PAGE_END_DATE",
                payload: value,
              })
            }
          />

          <InputComponent
            type="select"
            options={statusOptions}
            placeholder="All status"
            value={filterStatus}
            setValue={(value) =>
              dispatch({
                type: "SET_PURCHASE_ORDERS_PAGE_STATUS",
                payload: value,
              })
            }
          />
        </div>
      </div>
      {!loading ? (
        <Table
          className="table"
          columns={orderColumns}
          rows={showSearchResults ? searchResults : purchaseOrdersFromStore}
          cellName="id"
          identifyRoute="id"
          paginationModel={
            showSearchResults ? searchPaginationModel : paginationModel
          }
          onPaginationModelChange={
            showSearchResults
              ? (newPaginationModel) =>
                  dispatch({
                    type: "SET_PURCHASE_ORDERS_PAGE_SEARCH_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
              : (newPaginationModel) =>
                  dispatch({
                    type: "SET_PURCHASE_ORDERS_PAGE_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
          }
          noCheckboxSelection
        />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default PurchaseOrders;
