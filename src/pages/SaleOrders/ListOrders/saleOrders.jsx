import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSaleOrdersList } from "../../../actions/saleOrdersAction.jsx";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import StatusContainer from "../../../components/StatusContainer/StatusContainer.jsx";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import CustomerIcon from "../../../assets/icons/customer_default.png";
import InputComponent from "../../../components/InputComponent/InputComponent.jsx";

import "./SaleOrders.css";

function SaleOrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subroute = useSelector((state) => state.saleOrders.subroute);
  //loadiing circle
  const [loading, setLoading] = useState(false);

  const saleOrdersFromStore = useSelector(
    (state) => state.saleOrders.saleOrdersData
  );
  console.log(saleOrdersFromStore);

  // pagination
  const paginationModel = useSelector(
    (state) => state.saleOrders.paginationModel
  );

  //search
  const searchPaginationModel = useSelector(
    (state) => state.saleOrders.searchPaginationModel
  );
  const searchQuery = useSelector((state) => state.saleOrders.searchQuery);
  const showSearchResults = useSelector(
    (state) => state.saleOrders.showSearchResults
  );
  const searchResults = useSelector((state) => state.saleOrders.searchResults);

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
          type: "SET_SALE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
          payload: false,
        });
        setLoading(false);
        return;
      }
      let query = `&page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}&orderType=SALE&id=${searchQuery}`;
     
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

      const searchedSaleOrders = [];
      for (let i = 0; i < data.results.length; i++) {
        const order = data.results[i];

        const customerData = await fetch(
          API_CONST + "/customers/" + order.customerId,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );

        const customer = await customerData.json();

        const dateString = new Date(order.createdTime).toLocaleDateString();

        const newOrder = {
          id: order.id,
          customerPhone: customer.phone,
          customerName: customer.name,
          total: order.total,
          date: dateString,
          status: order.status,
        };
        searchedSaleOrders.push(newOrder);
      }

      dispatch({
        type: "SET_SALE_ORDERS_PAGE_SEARCH_RESULTS",
        payload: searchedSaleOrders,
      });
      dispatch({
        type: "SET_SALE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
        payload: true,
      });
      dispatch({
        type: "SET_SALE_ORDERS_PAGE_SEARCH_PAGINATION_MODEL",
        payload: { ...searchPaginationModel, total: data.total },
      });
    } catch (e) {
      console.log("error ", e);
      dispatch({
        type: "SET_SALE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
        payload: true,
      });
      dispatch({ type: "SET_SALE_ORDERS_PAGE_SEARCH_RESULTS", payload: [] });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSearchQueryChange = (event) => {
    dispatch({
      type: "SET_SALE_ORDERS_PAGE_SEARCH_QUERY",
      payload: event.target.value,
    });
    if (event.target.value === "" || event.target.value === null) {
      dispatch({
        type: "SET_SALE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
        payload: false,
      });
      dispatch({ type: "SET_SALE_ORDERS_PAGE_SEARCH_RESULTS", payload: [] });
    }
  };

  //filter
  const filterStartDate = useSelector((state) => state.saleOrders.startDate);
  const filterEndDate = useSelector((state) => state.saleOrders.endDate);
  const filterStatus = useSelector((state) => state.saleOrders.status);
  const statusOptions = ["PROCESSING", "DELIVERING", "COMPLETED", "CANCELLED"];

  //get all sale orders
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "SET_SALE_ORDERS_PAGE_SHOW_SEARCH_RESULTS",
      payload: false,
    });
    dispatch({ type: "SET_SALE_ORDERS_PAGE_START_DATE", payload: "" });
    dispatch({ type: "SET_SALE_ORDERS_PAGE_END_DATE", payload: "" });
    dispatch({ type: "SET_SALE_ORDERS_PAGE_STATUS", payload: "" });
    fetch(
      `${API_CONST}/orders?page=${paginationModel.page}&size=${paginationModel.pageSize}&orderType=SALE`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then(async (data) => {
        dispatch({
          type: "SET_SALE_ORDERS_PAGE_PAGINATION_MODEL",
          payload: { ...paginationModel, total: data.total },
        });
        const newSaleOrders = [];
        for (let i = 0; i < data.results.length; i++) {
          const order = data.results[i];
          if (order.orderType === "PURCHASE") {
            continue;
          }
          const customerData = await fetch(
            API_CONST + "/customers/" + order.customerId,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );

          const customer = await customerData.json();

          const dateString = new Date(order.createdTime).toLocaleDateString();

          const newOrder = {
            id: order.id,
            customerPhone: customer.phone,
            customerName: customer.name,
            total: order.total,
            date: dateString,
            status: order.status,
          };
          newSaleOrders.push(newOrder);
        }
        dispatch(setSaleOrdersList(newSaleOrders));
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  }, [paginationModel.page, paginationModel.pageSize]);

  //Navigate to add new sale order page
  const handleClick = () => {
    dispatch({ type: "SET_SALE_ORDERS_PAGE_SUBROUTE", payload: "add" });
    navigate("/orders/add");
  };

  useEffect(() => {}, [subroute]);

  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => {
        if (showSearchResults) {
          return searchResults.indexOf(params.row) + 1;
        }
        return saleOrdersFromStore.indexOf(params.row) + 1;
      },
    },
    {
      field: "id",
      headerName: "Order ID",
      flex: 0.2,
    },
    {
      field: "customerPhone",
      headerName: "Customer's phone number",
      flex: 0.4,
    },
    {
      field: "customerName",
      headerName: "Customer's name",
      flex: 0.6,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={CustomerIcon} />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
      valueGetter: (params) => params.value + " $",
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
          handleSearch={handleSearch}
          handleSearchQueryChange={handleSearchQueryChange}
          value={searchQuery}
        />
        <div className="buttonContainer-order">
          <ExportButton onClick={() => {}} />
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
                type: "SET_SALE_ORDERS_PAGE_START_DATE",
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
                type: "SET_SALE_ORDERS_PAGE_END_DATE",
                payload: value,
              })
            }
          />

          <InputComponent
            type="select"
            options={statusOptions}
            placeholder="All status"
            value={filterStatus}
            setValue={(value) => {
              dispatch({ type: "SET_SALE_ORDERS_PAGE_STATUS", payload: value });
            }}
          />
        </div>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <Table
          className="table"
          columns={productColumns}
          rows={showSearchResults ? searchResults : saleOrdersFromStore}
          cellName="customerPhone"
          identifyRoute="id"
          noCheckboxSelection
          paginationModel={
            showSearchResults ? searchPaginationModel : paginationModel
          }
          onPaginationModelChange={
            showSearchResults
              ? (newPaginationModel) => 
                  dispatch({
                    type: "SET_SALE_ORDERS_PAGE_SEARCH_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
              : (newPaginationModel) =>
                  dispatch({
                    type: "SET_SALE_ORDERS_PAGE_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
          }
        />
      )}
    </div>
  );
}

export default SaleOrdersPage;
