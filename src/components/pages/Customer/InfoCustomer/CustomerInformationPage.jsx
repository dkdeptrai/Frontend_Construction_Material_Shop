import React from "react";

//pages and components
import BackButton from "../../../layouts/backButton/backButton";
import InputComponent from "../../../InputComponent/InputComponent";
import Table from "../../../core/table/table";

function CustomerInformationPage(props) {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "purchaseDate", headerName: "Purchase Date", flex: 0.5 },
    { field: "numberOfItems", headerName: "Number Of Items", flex: 0.2 },
    { field: "totalValue", headerName: "Total Value", flex: 0.2 },
  ];

  const rows = [
    {
      id: 1,
      purchaseDate: "01/01/2021",
      numberOfItems: "2",
      totalValue: "5000",
    },
    {
      id: 2,
      purchaseDate: "01/01/2021",
      numberOfItems: "2",
      totalValue: "5000",
    },
    {
      id: 3,
      purchaseDate: "01/01/2021",
      numberOfItems: "2",
      totalValue: "5000",
    },
    {
      id: 4,
      purchaseDate: "01/01/2021",
      numberOfItems: "2",
      totalValue: "5000",
    },
    {
      id: 5,
      purchaseDate: "01/01/2021",
      numberOfItems: "2",
      totalValue: "5000",
    },
    {
      id: 6,
      purchaseDate: "01/01/2021",
      numberOfItems: "2",
      totalValue: "5000",
    },
  ];

  return <div>
    <BackButton content="Customer Information" />
    <form>
      <InputComponent label="Name" type="text" />
      <InputComponent label="Phone" type="tel" />
      <InputComponent label="Address" type="text" />
      <InputComponent label="Date of birth" type="date" />
      <InputComponent label="Tax" type="text" />
      <InputComponent label="Debt" type="number" />
      <label>Old orders:</label>

    </form>
  </div>;
}

export default CustomerInformationPage;