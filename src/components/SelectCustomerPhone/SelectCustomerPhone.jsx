import React from "react";
import Select from "react-select";

const SelectCustomerPhone = ({ options, onChange }) => (
  <select onChange={onChange}>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default SelectCustomerPhone;
