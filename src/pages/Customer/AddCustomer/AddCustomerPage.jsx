import React, { useState } from "react";
import "./AddCustomerPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InputComponent from "../../../components/InputComponent/InputComponent";
import RequiredStar from "../../../components/RequiredStar";
import { API_CONST } from "../../../constants/apiConstants";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

const transformISODate = (isoDate) => {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1; // getMonth returns a zero-based value (where 0 indicates the first month)
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
};

function AddCustomerPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //invalid states

  const isNameValid = useSelector((state) => state.addCustomerPage.isNameValid);
  const isPhoneNumberValid = useSelector(
    (state) => state.addCustomerPage.isPhoneNumberValid
  );
  const isDateOfBirthValid = useSelector(
    (state) => state.addCustomerPage.isDateOfBirthValid
  );
  const isAddressValid = useSelector(
    (state) => state.addCustomerPage.isAddressValid
  );
  const isTaxValid = useSelector((state) => state.addCustomerPage.isTaxValid);

  //valid states
  const name = useSelector((state) => state.addCustomerPage.name);
  const phoneNumber = useSelector((state) => state.addCustomerPage.phoneNumber);
  const dateOfBirth = useSelector((state) => state.addCustomerPage.dateOfBirth);
  const address = useSelector((state) => state.addCustomerPage.address);
  const tax = useSelector((state) => state.addCustomerPage.tax);

  const clearInput = () => {
    dispatch({ type: "SET_ADD_CUSTOMER_PAGE_NAME", payload: "" });
    dispatch({ type: "SET_ADD_CUSTOMER_PAGE_PHONE_NUMBER", payload: "" });
    dispatch({ type: "SET_ADD_CUSTOMER_PAGE_DATE_OF_BIRTH", payload: "" });
    dispatch({ type: "SET_ADD_CUSTOMER_PAGE_ADDRESS", payload: "" });
    dispatch({ type: "SET_ADD_CUSTOMER_PAGE_TAX", payload: "" });
  };
  // TODO: some bug here
  const handleAddCustomer = () => {
    setLoading(true);

    dispatch({
      type: "SET_ADD_CUSTOMER_PAGE_IS_NAME_VALID",
      payload: name !== "",
    });
    dispatch({
      type: "SET_ADD_CUSTOMER_PAGE_IS_PHONE_NUMBER_VALID",
      payload: phoneNumber !== "",
    });
    dispatch({
      type: "SET_ADD_CUSTOMER_PAGE_IS_DATE_OF_BIRTH_VALID",
      payload: dateOfBirth !== "",
    });
    dispatch({
      type: "SET_ADD_CUSTOMER_PAGE_IS_ADDRESS_VALID",
      payload: address !== "",
    });
    dispatch({
      type: "SET_ADD_CUSTOMER_PAGE_IS_TAX_VALID",
      payload: tax !== "",
    });

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
    console.log(dateOfBirth);

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
        clearInput;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Add customer failed!");
      })
      .finally(() => {
        alert("Add customer successfully!");
      })
      .finally(() => {
        dispatch({ type: "SET_CUSTOMERS_PAGE_CUSTOMERS", payload: [] });
      });
    setLoading(false);
    clearInput();
  };

  const navigateBackToCustomers = () => {
    dispatch({ type: "SET_CUSTOMERS_PAGE_SUBROUTE", payload: null });
    navigate("/customers");
  };

  return (
    <div className="add-customer-page">
      {loading && <LoadingScreen />}
      <BackButton
        content="Add Customer"
        handleClick={navigateBackToCustomers}
      />
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
          setValue={(value) =>
            dispatch({ type: "SET_ADD_CUSTOMER_PAGE_NAME", payload: value })
          }
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
          setValue={(value) =>
            dispatch({
              type: "SET_ADD_CUSTOMER_PAGE_PHONE_NUMBER",
              payload: value,
            })
          }
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
          setValue={(value) =>
            dispatch({ type: "SET_ADD_CUSTOMER_PAGE_ADDRESS", payload: value })
          }
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
          setValue={(value) =>
            dispatch({
              type: "SET_ADD_CUSTOMER_PAGE_DATE_OF_BIRTH",
              payload: value,
            })
          }
          className={isDateOfBirthValid ? "" : "invalid-input"}
          max={new Date().toISOString().split("T")[0]}
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
          setValue={(value) => {
            dispatch({ type: "SET_ADD_CUSTOMER_PAGE_TAX", payload: value });
          }}
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
