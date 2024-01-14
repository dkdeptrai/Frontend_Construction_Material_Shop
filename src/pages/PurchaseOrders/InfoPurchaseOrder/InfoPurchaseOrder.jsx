import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InformationLine from "../../../components/InformationLine/InformationLine";
import Table from "../../../components/core/table/table";
import { API_CONST } from "../../../constants/apiConstants";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";

const InfoPurchaseOrder = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState();

  const [loading, setLoading] = useState(true);

  const handleChangeStatus = async (newStatus) => {
    await fetch(API_CONST + "/orders/" + id + "?status=" + newStatus, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  };

  //get order information
  useEffect(() => {
    fetch(API_CONST + "/orders/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(async (order) => {
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
        setOrderId(order.id);
        setEmployeeCode(employee.employeeCode);
        setEmployeeName(employee.name);
        setDate(new Date(order.createdTime).toLocaleDateString());
        await order.newInventoryItems.map(async (item) => {
          const orderedInventoryItemData = await fetch(
            API_CONST + "/inventories/" + item.id,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );
          const orderedInventoryItem = await orderedInventoryItemData.json();
          const product = {
            id: item.productId,
            name: orderedInventoryItem.product.name,
            imageUrl: orderedInventoryItem.product.imageUrl,
            unitPrice: orderedInventoryItem.product.unitPrice,
            amount: item.quantity,
            total: item.quantity * orderedInventoryItem.product.unitPrice,
          };
          setProducts((products) => [...products, product]);
        });
        setDiscount(order.discount);
        setOrderStatus(order.status);
        setTotal(order.total);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const productColumns = [
    {
      headerName: "Product name",
      field: "name",
      flex: 0.7,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.imageUrl} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { headerName: "Price/Unit", field: "unitPrice", flex: 0.4 },
    { headerName: "Amount", field: "amount", flex: 0.4 },
    {
      headerName: "Total",
      field: "total",
      flex: 0.4,
      valueGetter: (params) => Math.floor(params.value) + " $",
    },
  ];

  return (
    <div>
      {loading && <LoadingScreen />}

      <BackButton content="Order information" />

      <InformationLine label="Order ID:" content={orderId} />
      <InformationLine label="Employee's Code:" content={employeeCode} />
      <InformationLine label="Employee's name:" content={employeeName} />
      <InformationLine label="Date:" content={date} />
      <label>List of products:</label>
      <Table columns={productColumns} rows={products} noCheckboxSelection />

      <InformationLine label="Discounts:" content={discount + "%"} />
      <InformationLine
        label="Total:"
        content={<span style={{ color: "red" }}>{Math.floor(total)} $</span>}
      />

      <div className="order-state-line">
        <label>Order status:</label>
        <select
          className={
            {
              PROCESSING: "processing",
              DELIVERING: "delivering",
              COMPLETED: "completed",
              CANCELLED: "cancelled",
            }[orderStatus]
          }
          value={orderStatus}
          onChange={(event) => {
            const newStatus = event.target.value;
            if (
              window.confirm(
                "Are you sure to change the status to " + newStatus + "?"
              ) === false
            )
              return;
            setOrderStatus(newStatus);
            handleChangeStatus(newStatus);
            dispatch({
              type: "SET_PURCHASE_ORDERS",
              payload: [],
            });
            window.history.back();
          }}
          disabled={orderStatus === "CANCELLED" || orderStatus === "COMPLETED"}
        >
          <option value="PROCESSING" className="processing">
            Processing
          </option>
          <option value="DELIVERING" className="delivering">
            Delivering
          </option>
          <option value="COMPLETED" className="completed">
            Completed
          </option>
          {orderStatus === "CANCELLED" ? (
            <option value="CANCELLED" className="cancelled" disabled>
              Cancelled
            </option>
          ) : null}

          {/* Add more options for other statuses if necessary */}
        </select>
      </div>

      {orderStatus === "PROCESSING" || orderStatus === "DELIVERING" ? (
        <button
          className="cancel-button"
          onClick={async () => {
            if (window.confirm("Are you sure to cancel this order?") === false)
              return;
            setLoading(true);
            await handleChangeStatus("CANCELLED");
            setOrderStatus("CANCELLED");
            dispatch({
              type: "SET_PURCHASE_ORDERS",
              payload: [],
            });
            window.history.back();
            setLoading(false);
          }}
        >
          Cancel this order
        </button>
      ) : null}
    </div>
  );
};

export default InfoPurchaseOrder;
