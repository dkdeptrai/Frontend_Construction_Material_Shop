import React from "react";
import "./AddCustomerPage.css";

//pages and components
import BackButton from "../../../layouts/backButton/backButton";
import InputComponent from "../../../InputComponent/InputComponent";

function AddCustomerPage(props) {
  return (
    <div>
      <BackButton content="Add Customer" />
      <form>
        <InputComponent label="Name" type="text" />
        <InputComponent label="Phone Number" type="text" />
        <InputComponent label="Address" type="text" />
        <InputComponent label="Date of birth" type="date" />
        <InputComponent label="Tax" type="text" />
      </form>
      <div className="button-container">
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default AddCustomerPage;
