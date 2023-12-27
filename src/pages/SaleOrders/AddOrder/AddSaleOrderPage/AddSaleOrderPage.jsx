import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddSaleOrderPage.css";

//states
import { useDispatch, useSelector } from "react-redux";
import {
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
import AmountInputModal from "../../../../components/AmountInputModal/AmountInputModal";

function AddSaleOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletedItems, setDeletedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);

  //search for customer by phone number
  const [searchedCustomerPhone, setSearchedCustomerPhone] = useState("");
  const [searchedCustomerName, setSearchedCustomerName] = useState("");

  const selectedProducts = useSelector(
    (state) => state.selectedProducts.selectedProductsData
  );

  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (selectedProducts) {
      const newTotal = selectedProducts.reduce(
        (sum, product) => (sum + product.amount * product.unitPrice) * (1 - discount / 100),
        0
      );
      setTotal(newTotal.toFixed(2));
    }
  }, [selectedProducts, discount]);

  const handleNavigateAddCustomer = () => {
    navigate("/customers/add");
  };

  const handleAddProducts = () => {
    navigate("/orders/add/add-products");
  };

  const handleDeposit = async () => {
    //fetch for customer id
    const customerData = await fetch(
      API_CONST +
        "/customers?phone=" +
        searchedCustomerPhone +
        "&customerName=" +
        searchedCustomerName,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    ).then((response) => response.json());

    if (customerData.results.length === 0) {
      alert("Customer does not exist!");
      return;
    }

    //Add order to database
    const yourData = {
      createdUser: {
        id: userData.id,
      },
      customer: {
        id: customerData.results[0].id,
      },
      createdTime: new Date().toISOString().slice(0, -1),
      depositedMoney: deposit,
      discount: discount,
      status: "PROCESSING",
      orderItems: selectedProducts.map((product) => {
        return {
          product: {
            id: product.id,
          },
          quantity: product.amount,
        };
      }),
    };

    await fetch(API_CONST + "/orders", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(yourData),
    });
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
      {open === "true" ? (
        <AmountInputModal open={open} setOpen={setOpen} />
      ) : null}
      <BackButton content="Add Order" />
      <div className="customer-info">
        <InputComponent
          label="Customer's phone number"
          type="text"
          value={searchedCustomerPhone}
          setValue={setSearchedCustomerPhone}
        ></InputComponent>
        <InputComponent
          label="Customer's name"
          type="text"
          value={searchedCustomerName}
          setValue={setSearchedCustomerName}
        ></InputComponent>
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
        cellName="amount"
        onRowSelection={(newSelection) => {
          setDeletedItems(newSelection);
        }}
      />
      <div className="price-calculation-input-container">
        <div className="left-inputs">
          
            <InlineInputComponent
              label="Discount(%):"
              type="number"
              min={0}
              max={100}
              value={discount}
              setValue={setDiscount}
            />
            

          <InlineInputComponent label="Old debt:" type="number" />
          <InlineInputComponent
            label="Deposit:"
            type="number"
            value={deposit}
            setValue={setDeposit}
          />
        </div>
        
        <div className="right-inputs">
          <InlineInputComponent
            label="Total:"
            type="text"
            value={total + " $"}
          />
          <InlineInputComponent label="Total debt:" type="number" />
        </div>
      </div>
      <div className="payment-button-container">
        <button className="deposit-button" onClick={handleDeposit}>
          Deposit
        </button>
        <button className="debt-button">Debt</button>
      </div>
    </div>
  );
}

export default AddSaleOrderPage;
