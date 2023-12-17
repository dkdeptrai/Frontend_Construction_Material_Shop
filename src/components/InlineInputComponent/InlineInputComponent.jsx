import React from "react";
import "./InlineInputComponent.css";

const InlineInputComponent = (props) => {
  const { label, type } = props;

  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} />
    </div>
  );
};

export default InlineInputComponent;
