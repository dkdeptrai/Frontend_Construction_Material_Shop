import React from "react";
import "./InlineInputComponent.css";

const InlineInputComponent = (props) => {
  const { label, type, min, max, value, setValue } = props;

  const handleSetValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={handleSetValue}
      />
    </div>
  );
};

export default InlineInputComponent;
