import React from "react";

const Dropdown = ({ options, onChange }) => (
  <select onChange={onChange}>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Dropdown;
