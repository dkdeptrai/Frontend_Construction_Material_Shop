import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./InfoOrder.css";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InformationLine from "../../../components/InformationLine/InformationLine";
import InlineInputComponent from "../../../components/inlineInputComponent/inlineInputComponent";
import Table from "../../../components/core/table/table";
import { API_CONST } from "../../../constants/apiConstants";

const InfoOrder = () => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("COMPLETED");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [orderStatus, setOrderStatus] = useState();

  const handleChangeStatus = async (newStatus) => {
    await fetch(API_CONST + "/orders/" + id + "?status=" + newStatus, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  };

  useEffect(() => {
    fetch(API_CONST + "/orders/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newOrder = {
          id: data.id,
          customerPhone: data.customer.phone,
          customerName: data.customer.name,
          date:
            data.createdTime[2] +
            "/" +
            data.createdTime[1] +
            "/" +
            data.createdTime[0],
          orderItems: data.orderItems,
          discount: data.discount,
          status: data.status,
        };
        setOrderId(newOrder.id);
        setCustomerPhone(newOrder.customerPhone);
        setCustomerName(newOrder.customerName);
        setDate(newOrder.date);
        newOrder.orderItems.map((item) => {
          const product = {
            id: item.product.id,
            name: item.product.name,
            unitPrice: item.product.unitPrice,
            amount: item.quantity,
          };
          setProducts((products) => [...products, product]);
        });
        setDiscount(newOrder.discount);
        setStatus(newOrder.status);
        setOrderStatus(newOrder.status);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (products) {
      const newTotal = products.reduce(
        (sum, product) => sum + product.unitPrice * product.amount,
        0
      );
      setTotal(newTotal);
    }
  }, [products]);

  const productColumns = [
    { headerName: "Product name", field: "name", flex: 0.7 },
    { headerName: "Price/Unit", field: "unitPrice", flex: 0.4 },
    { headerName: "Amount", field: "amount", flex: 0.4 },
    {
      headerName: "Total",
      field: "total",
      flex: 0.4,
      valueGetter: (params) => params.row.unitPrice * params.row.amount,
    },
  ];

  return (
    <div>
      <BackButton content="Order information" />
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
        content={<span style={{ color: "red" }}>{total} $</span>}
      />

      <div className="order-state-line">
        <label>Order status:</label>
        <select
          className={
            {
              PROCESSING: "processing",
              DELIVERING: "delivering",
              COMPLETED: "completed",
            }[orderStatus]
          }
          value={orderStatus}
          onChange={(event) => {
            const newStatus = event.target.value;
            setOrderStatus(newStatus);
            handleChangeStatus(newStatus);
          }}
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

          {/* Add more options for other statuses if necessary */}
        </select>
      </div>

      {status !== "COMPLETED" && status !== "CANCELLED" ? (
        <button className="cancel-button">Cancel this order</button>
      ) : null}
    </div>
  );
};

export default InfoOrder;
