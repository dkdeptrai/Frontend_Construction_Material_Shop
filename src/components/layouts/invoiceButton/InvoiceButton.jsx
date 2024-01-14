import React from "react";
import InvoiceIcon from "../../../assets/icons/file-invoice.svg?react";

function InvoiceButton(props) {
  const handleClick = props.onClick;
  return (
    <button className="exportButton" onClick={handleClick}>
      <InvoiceIcon className="exportIcon" /> <div>Invoice</div>
    </button>
  );
}

export default InvoiceButton;