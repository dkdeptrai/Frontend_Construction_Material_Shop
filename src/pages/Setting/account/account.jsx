import React from "react";
import "./Account.css";
import { useSelector } from "react-redux";

//pages and components
import InputComponent from "../../../components/InputComponent/InputComponent";
import ImageInputComponent from "../../../components/ImageInputComponent/ImageInputComponent";

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
          <ImageInputComponent />
        </div>
      </div>
    </div>
  );
};

export default Account;
