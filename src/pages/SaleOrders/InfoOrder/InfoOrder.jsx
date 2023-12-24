import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./InfoOrder.css";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InformationLine from "../../../components/layouts/InformationLine/InformationLine";
import Table from "../../../components/core/table/table";

const InfoOrder = () => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/orders/" + id, {
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
                quantity: item.quantity,
            };
            setProducts((products) => [...products, product]);
        });
        setDiscount(newOrder.discount);
        setStatus(newOrder.status);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const productColumns = [
    { headerName: "Product name", field: "name", flex: 1 },
    { headerName: "Quantity", field: "quantity", flex: 1 },
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
      <Table columns={productColumns} rows={products} />
      <div className="discount-total">
        <InformationLine label="Discounts:" content={discount} />
        <InformationLine label="Total:" content="" />
      </div>
      <InformationLine label="Status:" content={status} />
    </div>
  );
};

export default InfoOrder;
