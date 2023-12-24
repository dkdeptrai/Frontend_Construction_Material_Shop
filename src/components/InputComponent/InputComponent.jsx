import React from "react";
import "./InputComponent.css";

const InputComponent = ({
  label,
  type,
  accept,
  defaultValue,
  value,
  setValue,
  options,
  className,
}) => {
  if (!label || !type) {
    throw new Error("InputComponent: label and type are required");
  }

  const handleChange = (e) => {
    value = e.target.value;
    setValue(e.target.value);
  };

  if (type === "select") {
    return (
      <div>
        <label>{label}</label>
        <select value={value} onChange={handleChange} className={className}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        accept={accept}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        className={className}
      />
    </div>
  );
};

export default InputComponent;
