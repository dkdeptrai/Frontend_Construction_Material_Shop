import React from "react";
import "./password.css";
import InputComponent from "../../../InputComponent/InputComponent";

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
