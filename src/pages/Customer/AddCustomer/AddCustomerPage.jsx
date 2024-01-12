import React, { useState } from "react";
import "./AddCustomerPage.css";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InputComponent from "../../../components/InputComponent/InputComponent";
import RequiredStar from "../../../components/RequiredStar";
import { API_CONST } from "../../../constants/apiConstants";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle";

function AddCustomerPage(props) {
  const [loading, setLoading] = useState(false);

  //valid states
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [tax, setTax] = useState("");

  //invalid states
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isTaxValid, setIsTaxValid] = useState(true);

  const handleAddCustomer = () => {
    setLoading(true);
    setIsNameValid(name !== "");
    setIsPhoneNumberValid(phoneNumber !== "");
    setIsDateOfBirthValid(dateOfBirth !== "");
    setIsAddressValid(address !== "");
    setIsTaxValid(tax !== "");

    if (
      name === "" ||
      phoneNumber === "" ||
      dateOfBirth === "" ||
      address === "" ||
      tax === ""
    ) {
      setLoading(false);
      return;
    }

    const customer = {
      name: name,
      phone: phoneNumber,
      dateOfBirth: dateOfBirth,
      contactAddress: address,
      taxCode: tax,
    };
    fetch(API_CONST + "/customers", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        window.history.back();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Add customer failed!");
      });
  };

  return (
    <div className="add-customer-page">
      {loading && <LoadingCircle />}
      <BackButton content="Add Customer" />
      <form>
        <InputComponent
          label={
            <>
              Name
              <RequiredStar />
            </>
          }
          type="text"
          value={name}
          setValue={setName}
          className={isNameValid ? "" : "invalid-input"}
        />
        {!isNameValid && (
          <div className="input-missing-alert">
            <span>Missing name</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Phone Number
              <RequiredStar />
            </>
          }
          type="text"
          value={phoneNumber}
          setValue={setPhoneNumber}
          className={isPhoneNumberValid ? "" : "invalid-input"}
        />
        {!isPhoneNumberValid && (
          <div className="input-missing-alert">
            <span>Missing phone</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Address
              <RequiredStar />
            </>
          }
          type="text"
          value={address}
          setValue={setAddress}
          className={isAddressValid ? "" : "invalid-input"}
        />
        {!isAddressValid && (
          <div className="input-missing-alert">
            <span>Missing address</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Date of birth
              <RequiredStar />
            </>
          }
          type="date"
          value={dateOfBirth}
          setValue={setDateOfBirth}
          className={isDateOfBirthValid ? "" : "invalid-input"}
        />
        {!isDateOfBirthValid && (
          <div className="input-missing-alert">
            <span>Missing date of birth</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Tax
              <RequiredStar />
            </>
          }
          type="text"
          value={tax}
          setValue={setTax}
          className={isTaxValid ? "" : "invalid-input"}
        />
        {!isTaxValid && (
          <div className="input-missing-alert">
            <span>Missing tax</span>
          </div>
        )}
      </form>
      <div className="button-container">
        <button className="submit-button" onClick={handleAddCustomer}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddCustomerPage;
