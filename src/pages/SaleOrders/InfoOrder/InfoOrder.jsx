import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./InfoOrder.css";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InformationLine from "../../../components/InformationLine/InformationLine";
import Table from "../../../components/core/table/table";
import { API_CONST } from "../../../constants/apiConstants";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";
import InvoiceButton from "../../../components/layouts/invoiceButton/InvoiceButton.jsx";

const InfoOrder = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
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

  const handleInvoice = async () => {
    fetch(API_CONST + "/orders/export/invoice/pdf/" + orderId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();
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
        setOrderId(order.id);
        setCustomerPhone(customer.phone);
        setCustomerName(customer.name);
        setDate(new Date(order.createdTime).toLocaleDateString());
        console.log(order);
        await order.orderItems.map(async (item) => {
          const orderedProductData = await fetch(
            API_CONST + "/products/" + item.productId,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );
          const orderedProduct = await orderedProductData.json();
          const product = {
            id: item.productId,
            name: orderedProduct.name,
            imageUrl: orderedProduct.imageUrl,
            unitPrice: orderedProduct.unitPrice,
            amount: item.quantity,
            total: item.quantity * orderedProduct.unitPrice,
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
    {
      headerName: "Price/Unit",
      field: "unitPrice",
      flex: 0.4,
      valueGetter: (params) => params.value.toFixed(2) + " $",
    },
    { headerName: "Amount", field: "amount", flex: 0.4 },
    {
      headerName: "Total",
      field: "total",
      flex: 0.4,
      valueGetter: (params) => params.value.toFixed(2) + " $",
    },
  ];

  return (
    <div>
      {loading && <LoadingScreen />}
      <div className="infoHeader">
        <BackButton content="Order information" />
        <InvoiceButton onClick={handleInvoice} />
      </div>

      <InformationLine label="Order ID:" content={orderId} />
      <InformationLine
        label="Customer's phone number:"
        content={customerPhone}
      />
      <InformationLine label="Customer's name:" content={customerName} />
      <InformationLine label="Date:" content={date} />
      <label>List of products:</label>
      <Table columns={productColumns} rows={products} noCheckboxSelection />

      <InformationLine label="Discounts:" content={discount + "%"} />
      <InformationLine
        label="Total:"
        content={<span style={{ color: "red" }}>{total.toFixed(2)} $</span>}
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
            setLoading(true);
            setOrderStatus(newStatus);
            handleChangeStatus(newStatus);
            dispatch({
              type: "SET_SALE_ORDERS",
              payload: [],
            });
            setLoading(false);
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
            handleChangeStatus("CANCELLED");
            setOrderStatus("CANCELLED");
            dispatch({
              type: "SET_SALE_ORDERS",
              payload: [],
            });
            setLoading(false);
            window.history.back();
          }}
        >
          Cancel this order
        </button>
      ) : null}
    </div>
  );
};

export default InfoOrder;
