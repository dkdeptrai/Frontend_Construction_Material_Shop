import React from "react";
import "./Account.css";
import { useSelector } from "react-redux";

//pages and components
import InputComponent from "../../../components/InputComponent/InputComponent";
import ImageInputComponent from "../../../components/ImageInputComponent/ImageInputComponent";
import DefaultAvatar from "../../../assets/icons/customer_default.png";

const Account = () => {
  const userData = useSelector((state) => state.user.userData);
  console.log("user data", userData);

  if (userData.userType === "EMPLOYEE") {
    return (
      <div className="setting">
        <div className="setting-page">
          <div>
            <InputComponent label="Name" type="text" value={userData?.name} />
            <InputComponent
              label="Employee Code"
              type="text"
              value={userData?.employeeCode}
              readOnly
            />
            <InputComponent
              label="Email"
              type="email"
              value={userData?.email}
              readOnly
            />
            <InputComponent
              label="Phone"
              type="tel"
              value={userData?.phone}
              readOnly
            />
            <InputComponent
              label="Address"
              type="text"
              value={userData?.contactAddress}
              readOnly
            />
            <InputComponent
              label="Date of birth"
              type="date"
              value={
                userData?.dateOfBirth[1] +
                "/" +
                userData?.dateOfBirth[2] +
                "/" +
                userData?.dateOfBirth[0]
              }
              readOnly
            />
          </div>
          <div className="image">
            <ImageInputComponent
              imageUrl={userData.imageUrl || "https://picsum.photos/200"}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="setting">
        <div className="setting-page">
          <div>
            <InputComponent label="Name" type="text" value={userData?.name} />
            <InputComponent
              label="Email"
              type="email"
              value={userData?.email}
              readOnly
            />
            <InputComponent
              label="Phone"
              type="tel"
              value={userData?.phone}
              readOnly
            />
            <InputComponent
              label="Address"
              type="text"
              value={userData?.contactAddress}
              readOnly
            />
            <InputComponent
              label="Date of birth"
              type="text"
              value={
                userData?.dateOfBirth[1] +
                "/" +
                userData?.dateOfBirth[2] +
                "/" +
                userData?.dateOfBirth[0]
              }
              readOnly
            />
          </div>
          <div className="image">
            <ImageInputComponent
              imageUrl={userData.imageUrl || "https://picsum.photos/200"}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Account;
