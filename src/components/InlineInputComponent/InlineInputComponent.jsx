import React from "react";
import "./InlineInputComponent.css";

const InlineInputComponent = (props) => {
  const { label, type, min, max, value } = props;

  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} min={min} max={max} value={value} />
    </div>
  );
};

export default InlineInputComponent;
