import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InputComponent from "../../../components/InputComponent/InputComponent";
import Table from "../../../components/core/table/table";
import { API_CONST } from "../../../constants/apiConstants";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle";

function CustomerInformationPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [tax, setTax] = useState("");
  const [debt, setDebt] = useState(0);

  const [customerOrders, setCustomerOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  //get customer information
  useEffect(() => {
    fetch(API_CONST + "/customers/" + id, {
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
          dateOfBirth:
            data.dateOfBirth[0] +
            "-" +
            String(data.dateOfBirth[1]).padStart(2, "0") +
            "-" +
            String(data.dateOfBirth[2]).padStart(2, "0"),
          tax: data.taxCode,
          debt: 0,
        };
        setName(newCustomer.name);
        setPhoneNumber(newCustomer.phone);
        setAddress(newCustomer.address);
        setDateOfBirth(newCustomer.dateOfBirth);
        setTax(newCustomer.tax);
        setDebt(newCustomer.debt);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch(API_CONST + "/customers/" + id + "/orders", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((respone) => respone.json())
      .then((data) => {
        setCustomerOrders(data);
      });
  }, []);

  //update customer
  const handleUpdate = () => {
    setLoading(true);
    const customer = {
      name: name,
      phone: phoneNumber,
      dateOfBirth: dateOfBirth,
      contactAddress: address,
      taxCode: tax,
    };
    fetch(API_CONST + "/customers/" + id, {
      method: "PUT",
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
        alert("Update customer failed!");
      });
  };

  const orderColumns = [
    {
      headerName: "No.",
      field: "index",
      renderCell: (params) => customerOrders.indexOf(params.row) + 1,
      width: 50,
    },
    {
      headerName: "Purchase Date",
      field: "date",
      renderCell: (params) =>
        params.row.createdTime[2] +
        "/" +
        params.row.createdTime[1] +
        "/" +
        params.row.createdTime[0],
      flex: 0.4,
    },
    {
      headerName: "Number of items",
      field: "numberOfItems",
      renderCell: (params) =>
        params.row.orderItems.reduce((sum, item) => sum + item.quantity, 0),
      flex: 0.4,
    },
    { headerName: "Total", field: "total", flex: 0.4 },
  ];

  return (
    <div>
      {loading && <LoadingCircle />}
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
        <InputComponent label="Tax" type="text" value={tax} setValue={setTax} />
        <InputComponent label="Debt" type="number" value={debt} />
        <label>Old orders:</label>
        <Table
          columns={orderColumns}
          rows={customerOrders}
          noCheckboxSelection
        />
      </form>
      <div className="button-container">
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default CustomerInformationPage;
