import React from "react";
import "./InputComponent.css";
import { render } from "react-dom";

const InputComponent = ({
  label,
  type,
  accept,
  defaultValue,
  value = "",
  setValue,
  options,
  className,
  placeholder,
}) => {
  if (!type) {
    throw new Error("InputComponent: type is required!");
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  let renderedLabel = null;
  if (label) {
    renderedLabel = <label>{label}</label>;
  }

  if (type === "select") {
    options.sort((a, b) => a.localeCompare(b));
    return (
      <div>
        {renderedLabel}
        <select value={value} onChange={handleChange} className={className}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      {renderedLabel}
      <input
        type={type}
        placeholder={placeholder}
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
