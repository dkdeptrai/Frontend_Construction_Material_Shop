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
}) => {
  if (!label || !type) {
    throw new Error("InputComponent: label and type are required");
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  if (type === "select") {
    return (
      <div>
        <label>{label}</label>
        <select value={value} onChange={handleChange}>
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
      />
    </div>
  );
};

export default InputComponent;
