import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//pages and components
import BackButton from "../../../layouts/backButton/backButton";
import InputComponent from "../../../InputComponent/InputComponent";

function CustomerInformationPage(props) {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [tax, setTax] = useState("");
  const [debt, setDebt] = useState(0);

  //get customer information
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
          tax: data.taxCode,
          debt: 0,
        };
        setCustomer(newCustomer);
      }).then(() => {
        setName(customer.name);
        setPhoneNumber(customer.phone);
        setAddress(customer.address);
        setDateOfBirth(customer.dateOfBirth);
        setTax(customer.tax);
        setDebt(customer.debt);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //update customer
  const handleUpdate = () => {
    const customer = {
      name: name,
      phone: phoneNumber,
      dateOfBirth: dateOfBirth,
      contactAddress: address,
      taxCode: tax,
    };
    fetch("http://localhost:8080/api/v1/customers/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Update customer successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Update customer failed!");
      });
  };

  return (
    <div>
      <BackButton content="Customer Information" />
      <form>
        <InputComponent
          label="Name"
          type="text"
          value={name}
          setValue={setName}
        />
        <InputComponent
          label="Phone"
          type="tel"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        <InputComponent
          label="Address"
          type="text"
          value={address}
          setValue={setAddress}
        />
        <InputComponent
          label="Date of birth"
          type="date"
          value={dateOfBirth}
          setValue={setDateOfBirth}
        />
        <InputComponent
          label="Tax"
          type="text"
          value={tax}
          setValue={setTax}
        />
        <InputComponent label="Debt" type="number" value={debt} />
        <label>Old orders:</label>
      </form>
      <div className="button-container">
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default CustomerInformationPage;
