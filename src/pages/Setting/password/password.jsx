import React from "react";
import "./Password.css";
import InputComponent from "../../../components/InputComponent/InputComponent";

const Password = () => {
  return (
    <div className="password">
      <InputComponent label="Confirm old password" type="password" />
      <InputComponent label="New password" type="password" />
      <InputComponent label="Confirm new password" type="password" />
      <button>Submit</button>
    </div>
  );
};

export default Password;
