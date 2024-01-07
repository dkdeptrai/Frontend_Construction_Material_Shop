import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

//pages
//components
import InfoContainer from "../../components/InfoContainer/InfoContainer";
import Table from "../../components/core/table/table.jsx";
import StatusContainer from "../../components/StatusContainer/StatusContainer.jsx";
import { API_CONST } from "../../constants/apiConstants.jsx";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle.jsx";
import CircularProgess from "../../components/CircularProgess/CircularProgress.jsx";

function InStockCapacity() {
  return (
    <div className="instock-capacity-info">
      <div className="instock-capacity"></div>
      <span>In stock capacity</span>
    </div>
  );
}

function AvailableCapacity() {
  return <div className="available-capacity-info">
    <div className="available-capacity"></div>
    <span>Available capacity</span>
  </div>;
}

function Dashboard() {
  const navigate = useNavigate();
  const [customerNumber, setCustomerNumber] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [saleOrders, setSaleOrders] = useState([]);
  const [productNumber, setProductNumber] = useState(0);

  const [loading, setLoading] = useState(true);

  //count customer
  useEffect(() => {
    fetch(API_CONST + "/customers", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerNumber(data.results.length);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //get order number
  useEffect(() => {
    fetch(API_CONST + "/orders", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderNumber(data.results.length);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //count products
  useEffect(() => {
    fetch(API_CONST + "/products", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })

      .then((response) => response.json())
      .then((data) => {
        setProductNumber(data.results.length);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //get all sale orders
  useEffect(() => {
    fetch(API_CONST + "/orders?size=5", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        const newSaleOrders = [];
        for (let i = data.results.length - 1; i >= 0; i--) {
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
          newSaleOrders.push(newOrder);
        }
        setSaleOrders(newSaleOrders);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  const handleViewAll = () => {
    navigate("/orders");
  };

  return (
    <>
      {loading && <LoadingCircle />}

      <div className="statistic">
        <div className="info-bundle">
          <div className="upper-info">
            <InfoContainer
              className="info-container"
              title="Customer"
              info={customerNumber}
            />
            <InfoContainer
              className="info-container"
              title="Orders"
              info={orderNumber}
            />
          </div>
          <div className="lower-info">
            <InfoContainer
              className="info-container"
              title="Earning"
              info="2500"
            />
            <InfoContainer
              className="info-container"
              title="Products"
              info={productNumber}
            />
          </div>
        </div>
        <div className="capacity-indicator">
          <CircularProgess value={90} max={100} />
          <div className="capacity-info">
            <InStockCapacity />
            <AvailableCapacity />
          </div>
        </div>
      </div>

      <div className="table-header">
        <label className="newest-order-label">Newest Orders</label>
        <span onClick={handleViewAll}>View All</span>
      </div>
      <Table columns={productColumns} rows={saleOrders} noCheckboxSelection />
    </>
  );
}

export default Dashboard;
