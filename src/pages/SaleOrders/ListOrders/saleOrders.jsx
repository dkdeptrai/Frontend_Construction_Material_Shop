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
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";

import "./SaleOrders.css";

function SaleOrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saleOrdersFromStore = useSelector(
    (state) => state.saleOrders.saleOrdersData
  );
  console.log(saleOrdersFromStore);

  const [saleOrders, setSaleOrders] = useState([]);

  //loadiing circle
  const [loading, setLoading] = useState(true);

  //get all sale orders
  useEffect(() => {
    if (saleOrdersFromStore.length > 0) {
      console.log("get sale orders from store");
      setSaleOrders(saleOrdersFromStore);
      setLoading(false);
      return;
    }
    fetch(API_CONST + "/orders", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
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
        console.log("get sale orders from api");
        setSaleOrders(newSaleOrders);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Navigate to add new sale order page
  const handleClick = () => {
    navigate("/orders/add");
  };

  //table
  const options = [
    "Customer's phone number",
    "Customer's name",
    "Total",
    "Date",
    "Status",
  ];

  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => saleOrders.indexOf(params.row) + 1,
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
          <img className="productImage" src={params.row.image} />
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
      {loading && <LoadingCircle />}
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search Products by name, ID or any related keywords"
        />
        <div className="buttonContainer-order">
          <ExportButton onClick={() => {}} />
          <NewButton text="New Order" onClick={handleClick} />
        </div>
      </div>
      <Table
        className="table"
        columns={productColumns}
        rows={saleOrders}
        cellName="customerPhone"
        identifyRoute="id"
        noCheckboxSelection
      />
    </div>
  );
}

export default SaleOrdersPage;
