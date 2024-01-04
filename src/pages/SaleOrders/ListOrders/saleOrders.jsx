import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton.jsx";
import StatusContainer from "../../../components/StatusContainer/StatusContainer.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";

import "./SaleOrders.css";

function SaleOrdersPage() {
  const navigate = useNavigate();
  const [saleOrders, setSaleOrders] = useState([]);

  //get all sale orders
  useEffect(() => {
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
          const customerData = await fetch(API_CONST + "/customers/" + order.customerId, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })

          const customer = await customerData.json();

          const newOrder = {
            id: order.id,
            customerPhone: customer.phone,
            customerName: customer.name,
            total: order.total,
            date:
              order.createdTime[0] +
              "/" +
              order.createdTime[1] +
              "/" +
              order.createdTime[2],
            status: order.status,
          };
          newSaleOrders.push(newOrder);
        }
        setSaleOrders(newSaleOrders);
      })
      .catch((error) => console.error("Error:", error));
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
