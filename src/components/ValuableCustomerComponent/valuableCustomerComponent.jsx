import React from "react";
import NextIcon from "../../assets/icons/next.svg?react";
import { useNavigate } from "react-router-dom";

import "./valuableCustomerComponent.css";
import CustomerIcon from "../../assets/icons/customer_default.png";

function ValuableCustomerComponent(props) {
  const customer = props.customer;
  const navigate = useNavigate;

  return (
    <div className="valuableCustomer">
      <img src={CustomerIcon} />

      <div className="valuableCustomerInfo">
        <div className="customerName">{customer.name}</div>
        <div>{customer.phone}</div>
      </div>

      <div className="valuableCustomerOrder">
        {customer.ordersCount ? customer.ordersCount : 0} Orders
      </div>

      <div className="valuableCustomerTotal">
        ${customer.ordersValue ? customer.ordersValue : 0}
      </div>

      <button
        className="valuableCustomerMoreButton"
        onClick={props.handleClick}
      >
        <NextIcon className="nextIcon" />
      </button>
    </div>
  );
}

export default ValuableCustomerComponent;
