import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPurchaseOrderPage.css";

//states
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProducts,
  deleteSelectedProducts,
  updateSelectedProductsAmount,
} from "../../../../actions/selectedProductsAction";

//pages and components
import InputComponent from "../../../../components/InputComponent/InputComponent";
import BackButton from "../../../../components/layouts/backButton/backButton";
import NewButton from "../../../../components/layouts/newButton/newButton";
import DeleteButton from "../../../../components/layouts/deleteButton/deleteButton";
import Table from "../../../../components/core/table/table";
import InlineInputComponent from "../../../../components/inlineInputComponent/inlineInputComponent";

function AddSaleOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletedItems, setDeletedItems] = useState([]);

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  //search for employee by phone number
  const [searchedEmployeePhone, setSearchedEmployeePhone] = useState("");
  const [searchedEmployeeName, setSearchedEmployeeName] = useState("");

  const selectedProducts = useSelector(
    (state) => state.selectedProducts.selectedProductsData
  );

  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (selectedProducts) {
      const newTotal = selectedProducts.reduce(
        (sum, product) =>
          (sum + product.amount * product.unitPrice) * (1 - discount / 100),
        0
      );
      setTotal(newTotal);
    }
  }, [selectedProducts, discount]);

  const handleAddProducts = () => {
    navigate("/purchaseorders/add/add-products");
  };

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
          <img className="productImage" src={params.row.imageUrl} />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "unitPrice",
      headerName: "Price/unit",
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.4,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <input
          type="number"
          style={{ margin: "auto auto", border: "none" }}
          value={params.value}
          min={1}
          onChange={(e) => {
            let newAmount = e.target.value;

            if (!newAmount || isNaN(newAmount)) {
              newAmount = 1;
            }

            dispatch(updateSelectedProductsAmount(params.id, newAmount));
          }}
        />
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
      renderCell: (params) => params.value + " $",
    },
  ];

  return (
    <div className="adding-page">
      <BackButton content="Add Order" />
      <div className="employee-info">
        <InputComponent
          label="Employee Code"
          type="text"
          value={searchedEmployeePhone}
          setValue={setSearchedEmployeePhone}
        ></InputComponent>
        <InputComponent
          label="Employee's name"
          type="text"
          value={searchedEmployeeName}
          setValue={setSearchedEmployeeName}
        ></InputComponent>
      </div>
      <div style={{ marginRight: "57%" }}>
        <InputComponent label="Vendor" type="text" value={""}></InputComponent>
      </div>

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
        cellName="amount"
        onRowSelection={(newSelection) => {
          setDeletedItems(newSelection);
        }}
      />
      <div className="total">
        <InlineInputComponent
          label="Discount(%):"
          type="number"
          value={discount}
        />
        <InlineInputComponent label="Total:" type="text" value={total + " $"} />
      </div>

      <button style={{ margin: "50px auto" }}>Add Order</button>
    </div>
  );
}

export default AddSaleOrderPage;
