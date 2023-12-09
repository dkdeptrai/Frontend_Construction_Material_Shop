import React from "react";
import "./tax.css";
import InputComponent from "../../../InputComponent/InputComponent";

const Tax = () => {
  return (
    <div className="tax">
      <InputComponent label="Tax" type="text" />
      <button>Update</button>
    </div>
  );
};

export default Tax;