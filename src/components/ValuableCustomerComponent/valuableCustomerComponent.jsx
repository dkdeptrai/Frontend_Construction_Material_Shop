import React from "react";
import NextIcon from "../../assets/icons/next.svg?react";

import "./valuableCustomerComponent.css";

function ValuableCustomerComponent(props) {
  const customer = props.customer;
  const handleClick = () => {};
  return (
    <div className="valuableCustomer">
      <img src={customer.img} />

      <div className="valuableCustomerInfo">
        <div className="customerName">{customer.name}</div>
        <div>{customer.phone}</div>
      </div>

      <div className="valuableCustomerOrder">{customer.orderCount} Orders</div>

      <div className="valuableCustomerTotal">${customer.totalSpent}</div>

      <button className="valuableCustomerMoreButton" onClick={handleClick}>
        <NextIcon />
      </button>
    </div>
  );
}

export default ValuableCustomerComponent;
