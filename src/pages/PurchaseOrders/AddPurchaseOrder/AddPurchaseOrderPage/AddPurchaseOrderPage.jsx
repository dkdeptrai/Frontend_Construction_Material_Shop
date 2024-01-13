import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPurchaseOrderPage.css";
import Select from "react-select";

//states
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedImportedProducts,
  addSelectedImportedProduct,
  addSelectedImportedProducts,
  deleteSelectedImportedProducts,
  updateSelectedImportedProductsMFG,
  updateSelectedImportedProductsEXP,
  updateSelectedImportedProductsUnitPrice,
  updateSelectedImportedProductsAmount,
  updateSelectedImportedProductsWarehouse,
} from "../../../../actions/selectedImportedProductsAction";

//pages and components
import InputComponent from "../../../../components/InputComponent/InputComponent";
import BackButton from "../../../../components/layouts/backButton/backButton";
import NewButton from "../../../../components/layouts/newButton/newButton";
import DeleteButton from "../../../../components/layouts/deleteButton/deleteButton";
import Table from "../../../../components/core/table/table";
import InlineInputComponent from "../../../../components/inlineInputComponent/inlineInputComponent";
import { API_CONST } from "../../../../constants/apiConstants";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import SelectProductModal from "../SelectProductModal/SelectProductModal";

function AddSaleOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletedItems, setDeletedItems] = useState([]);

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  //select product and warehouse modal
  const [productRowPointer, setProductRowPointer] = useState("");
  const [showModal, setShowModal] = useState(false);

  //get all warehouses
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    fetch(API_CONST + "/warehouses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWarehouses(data);
      });
  }, []);

  //loading
  const [loading, setLoading] = useState(false);

  const selectedProducts = useSelector(
    (state) => state.selectedImportedProducts.importedProductsData
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
    const newInventoryItem = {
      id: Date.now().toString(),
      productId: 0,
      productName: "",
      imageUrl: "",
      mfg: "",
      exp: "",
      unitPrice: 1,
      amount: 1,
      warehouse: "",
    };

    dispatch(addSelectedImportedProduct(newInventoryItem));
  };

  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) => selectedProducts.indexOf(params.row) + 1,
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 0.4,
      renderCell: (params) => {
        if (params.value !== "") {
          return (
            <div className="productNameCell">
              <img className="productImage" src={params.row.imageUrl} />
              <span>{params.value}</span>
            </div>
          );
        } else {
          return (
            <button
              className="product-item-choose"
              onClick={() => {
                setProductRowPointer(params.row.id);
                setShowModal(true);
              }}
            >
              Choose a product
            </button>
          );
        }
      },
    },
    {
      headerName: "MFG",
      field: "mfg",
      flex: 0.3,
      renderCell: (params) => (
        <input
          type="date"
          style={{ margin: "auto auto", border: "none" }}
          value={params.value}
          onChange={(e) => {
            let newMFG = e.target.value;

            dispatch(updateSelectedImportedProductsMFG(params.id, newMFG));
          }}
        />
      ),
    },
    {
      headerName: "EXP",
      field: "exp",
      flex: 0.3,
      renderCell: (params) => (
        <input
          type="date"
          style={{ margin: "auto auto", border: "none" }}
          value={params.value}
          onChange={(e) => {
            let newEXP = e.target.value;

            dispatch(updateSelectedImportedProductsEXP(params.id, newEXP));
          }}
        />
      ),
    },
    {
      field: "unitPrice",
      headerName: "Price/unit",
      flex: 0.3,
      renderCell: (params) => (
        <input
          type="number"
          style={{ margin: "auto auto", border: "none" }}
          value={params.value}
          min={1}
          onChange={(e) => {
            let newUnitPrice = e.target.value;

            if (!newUnitPrice || isNaN(newUnitPrice)) {
              newUnitPrice = 1;
            }

            dispatch(
              updateSelectedImportedProductsUnitPrice(params.id, newUnitPrice)
            );
          }}
        />
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.3,
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

            dispatch(
              updateSelectedImportedProductsAmount(params.id, newAmount)
            );
          }}
        />
      ),
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      flex: 0.4,
      renderCell: (params) => {
        return (
          <Select
            className="warehouse-select"
            value={warehouses.find(
              (warehouse) => warehouse.id === params.value
            )}
            onChange={(selectedOption) => {
              dispatch(
                updateSelectedImportedProductsWarehouse(
                  params.id,
                  selectedOption.value
                )
              );
            }}
            options={warehouses}
            getOptionLabel={(warehouse) => warehouse.address}
            getOptionValue={(warehouse) => warehouse.id}
            menuPortalTarget={document.body}
            styles={{
              control: (base) => ({
                ...base,
                border: 0,
                backgroundColor: "transparent",
              }),
            }}
          />
        );
      },
    },
  ];

  const handleAddPurchaseOrder = async () => {
    //Add order to database
    const yourData = {
      createdUser: {
        id: userData.id,
      },
      createdTime: new Date().toISOString(),
      discount: discount,
      status: "PROCESSING",
      newInventoryItems: selectedProducts.map((product) => {
        const importedDate = new Date();
        console.log(importedDate);
        return {
          product: {
            id: product.productId,
          },
          warehouse: {
            id: 1,
          },
          quantity: product.amount,
          manufacturingDate: product.mfg,
          expiryDate: product.exp,
          importedDate: importedDate.toISOString().slice(0, 10),
          importedPrice: product.unitPrice * product.amount,
        };
      }),
      orderType: "PURCHASE",
      total: total,
    };

    await fetch(API_CONST + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(yourData),
    })
      .catch((error) => {
        console.error("Error adding order:", error);
      })
      .finally(() => {
        dispatch(setSelectedImportedProducts([]));
        dispatch({ type: "SET_INVENTORY_PAGE_INVENTORY_ITEM", payload: [] });
        dispatch({ type: "SET_PURCHASE_ORDERS", payload: [] });
        setLoading(false);
        navigate("/purchase-orders");
      });

    // // //Update inventory
    // for (let i = 0; i < selectedProducts.length; i++) {
    //   const product = selectedProducts[i];
    //   const date = new Date();
    //   const inventoryItem = {
    //     product: {
    //       id: product.id,
    //     },
    //     warehouse: {
    //       id: "1",
    //     },
    //     quantity: product.amount,
    //     manufacturingDate: product.mfg,
    //     expiryDate: product.exp,
    //     importedDate: `${date.getFullYear()}-${String(
    //       date.getMonth() + 1
    //     )}-${String(date.getDate())}`,
    //   };

    //   await fetch(API_CONST + "/inventory-items", {
    //     method: "PUT",
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: "Bearer " + sessionStorage.getItem("token"),
    //     },
    //     body: JSON.stringify(inventoryItem),
    //   });
    // }
  };

  const handleClick = () => {
    dispatch(setSelectedImportedProducts([]));
    navigate("/purchase-orders");
  };

  return (
    <div className="adding-page">
      {loading && <LoadingScreen />}
      {showModal && (
        <SelectProductModal
          handleClose={() => {
            setShowModal(false);
          }}
          productRowPointer={productRowPointer}
        />
      )}
      <BackButton content="Add Order" handleClick={handleClick} />
      <div className="employee-info">
        <InputComponent
          label="Employee Code"
          type="text"
          value={
            userData.employeeCode || "Manager doesn't have an employee code."
          }
        ></InputComponent>
        <InputComponent
          label="Employee's name"
          type="text"
          value={userData.name}
        ></InputComponent>
      </div>

      <div className="tool-bar">
        <label>Inventory items</label>
        <div className="button-container">
          <DeleteButton
            onClick={() => {
              dispatch(deleteSelectedImportedProducts(deletedItems));
            }}
          />
          <NewButton text="New Item" onClick={handleAddProducts} />
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
        disableRowSelectionOnClick
      />
      <div className="total">
        <InlineInputComponent
          label="Discount(%):"
          type="number"
          min={0}
          max={100}
          value={discount}
          setValue={setDiscount}
        />
        <InlineInputComponent label="Total:" type="text" value={total + " $"} />
      </div>

      <button style={{ margin: "50px auto" }} onClick={handleAddPurchaseOrder}>
        Add Order
      </button>
    </div>
  );
}

export default AddSaleOrderPage;
