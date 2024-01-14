import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";

//pages
//components
import InfoContainer from "../../components/InfoContainer/InfoContainer";
import Table from "../../components/core/table/table.jsx";
import StatusContainer from "../../components/StatusContainer/StatusContainer.jsx";
import { API_CONST } from "../../constants/apiConstants.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import CircularProgess from "../../components/CircularProgess/CircularProgress.jsx";

//icons
import CustomerIcon from "../../assets/icons/customer.svg?react";
import OrderIcon from "../../assets/icons/order.svg?react";
import ProductIcon from "../../assets/icons/product.svg?react";
import EarningIcon from "../../assets/icons/earning.svg?react";
import DefaultAvatar from "../../assets/icons/customer_default.png";
import Pic from "../../assets/icons/pic.jpg";

function InStockCapacity() {
  return (
    <div className="instock-capacity-info">
      <div className="instock-capacity"></div>
      <span>In stock capacity</span>
    </div>
  );
}

function AvailableCapacity() {
  return (
    <div className="available-capacity-info">
      <div className="available-capacity"></div>
      <span>Available capacity</span>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [customerNumber, setCustomerNumber] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [saleOrders, setSaleOrders] = useState([]);
  const [productNumber, setProductNumber] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [capacity, setCapacity] = useState(100);
  const [usedCapacity, setUsedCapacity] = useState(0);

  const [loading, setLoading] = useState(true);

  const userType = useSelector((state) => state.user.userData?.userType) || "";

  //get all sale orders
  useEffect(() => {
    fetch(API_CONST + "/dashboard", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setCustomerNumber(data.customerCount);
        setOrderNumber(data.orderCount);
        setProductNumber(data.productCount);
        setRevenue(data.revenue);
        const newSaleOrders = [];
        for (let i = 0; i <= data.newestOrders.length - 1; i++) {
          const order = data.newestOrders[i];
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
        setUsedCapacity(data.remainingQuantity);
        setCapacity(data.totalQuantity);
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
    { field: "id", headerName: "ID", flex: 0.2 },
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
          <img
            className="productImage"
            src={params.row.image || DefaultAvatar}
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
      valueGetter: (params) => params.value.toFixed(2) + " $",
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
      {loading && <LoadingScreen />}

      <div className="statistic">
        {userType === "MANAGER" ? (
          <div className="info-bundle">
            <div className="upper-info">
              <InfoContainer
                className="info-container"
                title="Customer"
                info={customerNumber}
                icon={<CustomerIcon />}
              />
              <InfoContainer
                className="info-container"
                title="Orders"
                info={orderNumber}
                icon={<OrderIcon />}
              />
            </div>
            <div className="lower-info">
              <InfoContainer
                className="info-container"
                title="Earning"
                info={revenue}
                icon={<EarningIcon />}
              />
              <InfoContainer
                className="info-container"
                title="Products"
                info={productNumber}
                icon={<ProductIcon />}
              />
            </div>
          </div>
        ) : (
          <img className="cat-pics" src={Pic}/>
        )}

        <div className="capacity-indicator">
          <CircularProgess value={usedCapacity} max={capacity} />
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
      <Table
        columns={productColumns}
        rows={saleOrders}
        noCheckboxSelection
        cellName="id"
        identifyRoute="id"
        longNavigate
      />
    </>
  );
}

export default Dashboard;
