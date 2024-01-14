import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddSaleOrderPage.css";

//states
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSelectedProducts,
  setSelectedProducts,
  updateSelectedProductsAmount,
} from "../../../../actions/selectedProductsAction";

//pages and components
import InputComponent from "../../../../components/InputComponent/InputComponent";
import BackButton from "../../../../components/layouts/backButton/backButton";
import NewButton from "../../../../components/layouts/newButton/newButton";
import DeleteButton from "../../../../components/layouts/deleteButton/deleteButton";
import Table from "../../../../components/core/table/table";
import InlineInputComponent from "../../../../components/inlineInputComponent/inlineInputComponent";
import NewProductsModal from "../NewProductsModal/NewProductsModal";
import { API_CONST } from "../../../../constants/apiConstants";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";

function AddSaleOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletedItems, setDeletedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [discount, setDiscount] = useState(0);
  const [oldDebt, setOldDebt] = useState(0.0);
  const [deposit, setDeposit] = useState(0.0);

  //select products modal
  const [openSelectProductsModal, setOpenSelectProductsModal] = useState(false);

  //search for customer by phone number
  const [searchedCustomerPhone, setSearchedCustomerPhone] = useState("");
  const [searchedCustomerName, setSearchedCustomerName] = useState("");

  //live search
  const [customerOptions, setCustomerOptions] = useState([]);

  //loading
  const [loading, setLoading] = useState(false);

  //fetch customer name and debt from phone number
  useEffect(() => {
    if (searchedCustomerPhone === "") {
      setSearchedCustomerName("");
      setOldDebt(0);
      return;
    }
    //fetch for customers with correct phone number
    fetch(API_CONST + "/customers?phone=" + searchedCustomerPhone, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(async (customers) => {
        // If there is only one customer with the phone number, fetch for the customer name
        if (customers.results.length === 0) {
          setSearchedCustomerName("Customer not found");
          setCustomerOptions([]);
          setOldDebt(0);
          return;
        }
        setCustomerOptions(customers.results);
        if (customers.results.length > 0) {
          // Update the customer name input with the fetched customer name
          const customer = customers.results[0];
          // Update the old debt input with the fetched customer debt
          const customerTotalDebt = await customer.debts.reduce(
            (totalDebt, debt) => {
              if (!debt.alreadyPaid) {
                return totalDebt + debt.amount;
              }
            },
            0
          );
          setOldDebt(customerTotalDebt);
        }
        if (customers.results.length === 1) {
          setSearchedCustomerName(customers.results[0].name);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [searchedCustomerPhone]);

  const selectedProducts = useSelector(
    (state) => state.selectedOrder.selectedProductsData
  );

  const userData = useSelector((state) => state.user.userData);

  //calculate total
  useEffect(() => {
    if (selectedProducts) {
      const newTotal = selectedProducts.reduce(
        (sum, product) =>
          (sum + product.amount * product.unitPrice) * (1 - discount / 100),
        0
      );
      setTotal(newTotal.toFixed(2));
    }
  }, [selectedProducts, discount]);

  const handleNavigateAddCustomer = () => {
    navigate("/customers/add");
  };

  //handle deposit
  const handleDepositAndDebt = async (paymentType) => {
    if (searchedCustomerPhone === "") {
      alert("Please enter customer's phone number!");
      return;
    } else if (searchedCustomerName === "") {
      alert("Please enter customer's name!");
      return;
    } else if (selectedProducts.length === 0) {
      alert("Please add products!");
      return;
    } else if (paymentType === "deposit" && deposit === 0) {
      alert("Please enter a deposit!");
      return;
    } else if (paymentType === "debt" && deposit !== 0) {
      alert("Deposit must be 0 when choosing to debt!");
      return;
    }

    //fetch for customer id
    const customerData = await fetch(
      API_CONST +
        "/customers?phone=" +
        searchedCustomerPhone +
        "&name=" +
        searchedCustomerName,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    const customer = await customerData.json();

    if (customer.results.length === 0) {
      alert("Customer does not exist!");
      return;
    } else if (customer.results.length > 1) {
      alert("Multiple customers with the same phone number!");
      return;
    } else if (searchedCustomerName !== customer.results[0].name) {
      alert("Customer name does not match!");
      return;
    } else if (searchedCustomerPhone !== customer.results[0].phone) {
      alert("Customer phone number does not match!");
      return;
    }

    setLoading(true);

    //Add order to database
    const yourData = {
      createdUser: {
        id: userData.id,
      },
      customer: {
        id: customer.results[0].id,
      },
      createdTime: new Date().toISOString(),
      depositedMoney: deposit,
      discount: discount,
      status: "PROCESSING",
      //selectedProducts is list of chosen inventory items, refactor later :))
      orderItems: selectedProducts.map((product) => {
        return {
          inventoryItem: {
            id: product.id,
          },
          quantity: product.amount,
        };
      }),
      debt: {
        amount: (total - deposit).toString(),
        customer: {
          id: customer.results[0].id,
        },
      },
      orderType: "SALE",
    };

    await fetch(API_CONST + "/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(yourData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (window.confirm("DO you want to print out an invoice?")) {
          fetch(API_CONST + "/orders/export/invoice/pdf/" + data.id, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
            .then((response) => response.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "invoice.pdf");
              document.body.appendChild(link);
              link.click();
            });
        }
      })

      .finally(() => {
        dispatch({ type: "SET_SALE_ORDERS", payload: [] });
        dispatch(setSelectedProducts([]));
        setLoading(false);
        dispatch({ type: "SET_SALE_ORDERS", payload: [] });
        dispatch({ type: "SET_INVENTORY_PAGE_INVENTORY_ITEM", payload: [] });
        dispatch({ type: "SET_CUSTOMERS_PAGE_CUSTOMERS", payload: [] });
        navigateBackToOrders();
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

  const navigateBackToOrders = () => {
    dispatch({ type: "SET_SALE_ORDERS_PAGE_SUBROUTE", payload: null });
    dispatch(setSelectedProducts([]));
    navigate("/orders");
  };

  return (
    <div className="adding-page">
      {loading ? <LoadingScreen /> : null}

      {openSelectProductsModal ? (
        <NewProductsModal handleClose={setOpenSelectProductsModal} />
      ) : null}

      <BackButton content="Add Order" handleClick={navigateBackToOrders} />
      <div className="customer-info">
        <InputComponent
          label="Customer's phone number"
          type="search"
          value={searchedCustomerPhone}
          setValue={setSearchedCustomerPhone}
          dataListOptions={customerOptions.map((customer) => customer.phone)}
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
          <NewButton
            text="New Products"
            onClick={() => setOpenSelectProductsModal(true)}
          />
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

          <InlineInputComponent
            label="Old debt:"
            type="text"
            value={oldDebt.toFixed(2) + " $"}
          />
          <InlineInputComponent
            label="Deposit:"
            type="number"
            value={deposit}
            setValue={setDeposit}
            max={total}
            className="green-text"
          />
        </div>

        <div className="right-inputs">
          <InlineInputComponent
            label="Total:"
            type="text"
            value={total + " $"}
          />
          <InlineInputComponent
            label="Total debt:"
            type="text"
            value={(total - deposit + oldDebt).toFixed(2) + " $"}
            className="red-text"
          />
        </div>
      </div>
      <div className="payment-button-container">
        <button
          className="deposit-button"
          onClick={() => handleDepositAndDebt("deposit")}
        >
          Deposit
        </button>

        <button
          className="debt-button"
          onClick={() => handleDepositAndDebt("debt")}
        >
          Debt
        </button>
      </div>
    </div>
  );
}

export default AddSaleOrderPage;
