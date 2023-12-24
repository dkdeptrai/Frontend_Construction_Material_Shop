import React from "react";
import "./InlineInputComponent.css";

const InlineInputComponent = (props) => {
  const { label, type, min, max, isPercentage } = props;

  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} min={min} max={max}/>
      {isPercentage && <span>%</span>}
    </div>
  );
};

export default InlineInputComponent;
