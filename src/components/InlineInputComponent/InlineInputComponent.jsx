import React, { useEffect } from "react";
import "./InlineInputComponent.css";

const InlineInputComponent = (props) => {
  const { label, type, min, max, value, setValue, className, onBlur } = props;

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
        className={className}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InlineInputComponent;
