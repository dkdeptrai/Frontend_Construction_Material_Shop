import React from "react";
import "./InputComponent.css";
import { useDispatch } from "react-redux";
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
  dataListOptions,
}) => {
  if (!type) {
    throw new Error("InputComponent: type is required!");
  }
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value === "") {
      setValue("");
    } else {
      setValue(e.target.value);
    }
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
          <option value="">{placeholder}</option>
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
        className={className + " inputBarcodeField"}
        list={dataListOptions ? "dataListOptions" : null}
      />
      {dataListOptions && (
        <datalist id="dataListOptions">
          {dataListOptions.map((option) => (
            <option key={option}>
              <span style={{color: "red"}}>{option}</span>
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
};

export default InputComponent;
