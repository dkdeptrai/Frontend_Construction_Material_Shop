import React from "react";
import "./account.css";
import InputComponent from "../../../InputComponent/InputComponent";
import { useSelector } from "react-redux";

const Account = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="setting">
      <div className="setting-page">
        <div>
          <InputComponent
            label="Name"
            type="text"
            defaultValue={userData?.name}
          />
          <InputComponent
            label="Employee Code"
            type="text"
            defaultValue={userData?.employeeCode}
          />
          <InputComponent
            label="Email"
            type="email"
            defaultValue={userData?.email}
          />
          <InputComponent
            label="Phone"
            type="tel"
            defaultValue={userData?.phone}
          />
          <InputComponent
            label="Address"
            type="text"
            defaultValue={userData?.contactAddress}
          />
          <InputComponent
            label="Date of birth"
            type="date"
            defaultValue={userData?.dateOfBirth}
          />
        </div>
        <div className="image">
          <InputComponent
            label="Image"
            type="file"
            accept="image/*"
            className="image-input"
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
