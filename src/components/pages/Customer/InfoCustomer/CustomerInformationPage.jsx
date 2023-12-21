import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//pages and components
import BackButton from "../../../layouts/backButton/backButton";
import InputComponent from "../../../InputComponent/InputComponent";


function CustomerInformationPage(props) {
  const { id } = useParams();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/customers/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((respone) => respone.json())
      .then((data) => {
        const newCustomer = {
          name: data.name,
          phone: data.phone,
          address: data.contactAddress,
          dateOfBirth: data.dateOfBirth,
          tax: data.taxCode || "",
          debt: 0,
        };
        setCustomer(newCustomer);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <BackButton content="Customer Information" />
      <form>
        <InputComponent label="Name" type="text" value={customer?.name} />
        <InputComponent label="Phone" type="tel" value={customer?.phone} />
        <InputComponent label="Address" type="text" value={customer?.address} />
        <InputComponent
          label="Date of birth"
          type="date"
          value={customer?.dateOfBirth}
        />
        <InputComponent label="Tax" type="text" value={customer?.tax} />
        <InputComponent label="Debt" type="number" value={customer?.debt} />
        <label>Old orders:</label>
      </form>
    </div>
  );
}

export default CustomerInformationPage;
