import React from "react";
import "./account.css";
import InputComponent from "../../../InputComponent/InputComponent";

const Account = () => {
  return (
    <div className="setting">
      <div className="setting-page">
        <div>
          <InputComponent label="Name" type="text" />
          <InputComponent label="Employee Code" type="text" />
          <InputComponent label="Email" type="email" />
          <InputComponent label="Phone" type="tel" />
          <InputComponent label="Address" type="text" />
          <InputComponent label="Date of birth" type="date" />
        </div>
        <div className="image">
          <input type="file" accept="image/*" className="image-input"></input>
        </div> 
      </div>
    </div>
  );
};

export default Account;
