import React from "react";
import "./Tax.css";
import InputComponent from "../../../components/InputComponent/InputComponent";

const Tax = () => {
  return (
    <div className="tax">
      <InputComponent label="Tax" type="text" />
      <button>Update</button>
    </div>
  );
};

export default Tax;