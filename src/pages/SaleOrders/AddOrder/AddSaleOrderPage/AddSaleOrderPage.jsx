import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddSaleOrderPage.css";

//states
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedProducts } from "../../../../actions/selectedProductsAction";

//pages and components
import InputComponent from "../../../../components/InputComponent/InputComponent";
import BackButton from "../../../../components/layouts/backButton/backButton";
import NewButton from "../../../../components/layouts/newButton/newButton";
import DeleteButton from "../../../../components/layouts/deleteButton/deleteButton";
import Table from "../../../../components/core/table/table";
import InlineInputComponent from "../../../../components/InlineInputComponent/InlineInputComponent";

function AddSaleOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletedItems, setDeletedItems] = useState([]);

  const selectedProducts = useSelector(
    (state) => state.selectedProducts.selectedProductsData
  );

  const options = ["productName", "productAmount", "productTotal"];

  const handleNavigateAddCustomer = () => {
    navigate("/customers/add");
  };

  const handleAddProducts = () => {
    navigate("/orders/add/add-products");
  };

  const productRows = [
    {
      id: 1,
      productName: "brick",
      amount: 10,
      total: 0,
    },
    {
      id: 2,
      productName: "brick",
      amount: 5,
      total: 0,
    },
    {
      id: 3,
      productName: "brick",
      amount: 8,
      total: 0,
    },
  ];

  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) => selectedProducts.indexOf(params.row) + 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 0.7,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "amount", headerName: "Amount", flex: 0.4 },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
    },
  ];

  return (
    <div className="adding-page">
      <BackButton content="Add Order" />
      <div className="customer-info">
        <InputComponent
          label="Customer's phone number"
          type="text"
        ></InputComponent>
        <InputComponent label="Customer's name" type="text"></InputComponent>
      </div>
      <NewButton
        text="Add Customer"
        className="add-customer-button"
        onClick={handleNavigateAddCustomer}
      />
      <div className="tool-bar">
        <label>List of products</label>
        <div className="button-container">
          <DeleteButton
            onClick={() => {
              dispatch(deleteSelectedProducts(deletedItems));
            }}
          />
          <NewButton text="New Products" onClick={handleAddProducts} />
        </div>
      </div>
      <Table
        className="table"
        columns={productColumns}
        rows={selectedProducts || []}
        onRowSelection={(newSelection) => {
          setDeletedItems(newSelection);
        }}
      />
      <div className="price-calculation-input-container">
        <div className="left-inputs">
          <InlineInputComponent
            label="Discount:"
            type="number"
            min="0"
            max="100"
            isPercentage
          />
          <InlineInputComponent label="Old debt:" type="number" />
          <InlineInputComponent label="Deposit:" type="number" />
        </div>
        <div className="right-inputs">
          <InlineInputComponent label="Total:" type="number" />
          <InlineInputComponent label="Debt:" type="number" />
        </div>
      </div>
      <div className="payment-button-container">
        <button className="deposit-button">Deposit</button>
        <button className="debt-button">Debt</button>
      </div>
    </div>
  );
}

export default AddSaleOrderPage;
