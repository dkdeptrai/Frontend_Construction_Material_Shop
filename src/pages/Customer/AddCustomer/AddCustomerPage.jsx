import React, { useState } from "react";
import "./AddCustomerPage.css";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InputComponent from "../../../components/InputComponent/InputComponent";

function AddCustomerPage(props) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [tax, setTax] = useState("");
  
  const handleAddCustomer = () => {
    const customer = {
      name: name,
      phone: phoneNumber,
      dateOfBirth: dateOfBirth,
      contactAddress: address,
      taxCode: tax,
    };
    fetch("http://localhost:8080/api/v1/customers", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Add customer successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Add customer failed!");
      });
  }

  return (
    <div>
      <BackButton content="Add Customer" />
      <form>
        <InputComponent label="Name" type="text" value={name} setValue={setName} />
        <InputComponent label="Phone Number" type="text" value={phoneNumber} setValue={setPhoneNumber} />
        <InputComponent label="Address" type="text" value={address} setValue={setAddress} />
        <InputComponent label="Date of birth" type="date" value={dateOfBirth} setValue={setDateOfBirth} />
        <InputComponent label="Tax" type="text" value={tax} setValue={setTax}/>
      </form>
      <div className="button-container">
        <button className="submit-button" onClick={handleAddCustomer}>Submit</button>
      </div>
    </div>
  );
}

export default AddCustomerPage;
