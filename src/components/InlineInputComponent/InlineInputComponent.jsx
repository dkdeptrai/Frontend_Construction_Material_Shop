import React, { useEffect } from "react";
import "./InlineInputComponent.css";

const InlineInputComponent = (props) => {
  const { label, type, min, max, value, setValue, className } = props;

  const handleSetValue = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value > max) {
      setValue(max);
    }
  }, [value]);

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
      />
    </div>
  );
};

export default InlineInputComponent;
