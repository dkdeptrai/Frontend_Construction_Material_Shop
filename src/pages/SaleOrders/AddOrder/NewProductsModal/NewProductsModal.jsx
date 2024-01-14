import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProductsModal.css";

//states
import { useDispatch } from "react-redux";
import { addSelectedProducts } from "../../../../actions/selectedProductsAction.jsx";

//pages and components
import SearchBar from "../../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../../components/core/table/table.jsx";
import { API_CONST } from "../../../../constants/apiConstants.jsx";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent.jsx";
import ExitButton from "../../../../assets/icons/exitbutton.svg?react";

const NewProductsModal = ({ handleClose }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //loading
  const [loading, setLoading] = useState(true);

  const handleAddProducts = () => {
    const selectedProducts = selectedInventoryItems.map((item) => {
      const product = {
        id: item.id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        unitPrice: item.product.unitPrice,
        amount: 1,
        mfg: item.manufacturingDate,
        exp: item.expiryDate,
      };

      return product;
    });
    dispatch(addSelectedProducts(selectedProducts));
    handleClose(false);
  };

  const options = ["Product's name", "Product's code", "Price", "Quantity"];

  const fetchInventoryItems = async () => {
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(API_CONST + "/inventories?page=0&size=10", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const fetchedInventoryItems = data.results.filter(
        (item) => item.quantity > 0 && item.manufacturingDate && item.expiryDate
      );
      setInventoryItems(fetchedInventoryItems);
      console.log("Inventory 's products fetched:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInventoryItems().then(() => setLoading(false));
  }, []);

  const inventoryItemsColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) => inventoryItems.indexOf(params.row) + 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 0.4,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.product.imageUrl} />
          <span>{params.row.product.name}</span>
        </div>
      ),
    },
    {
      field: "mfg",
      headerName: "MFG",
      flex: 0.3,
      renderCell: (params) => params.row.manufacturingDate,
    },
    {
      field: "exp",
      headerName: "Expiry Date",
      flex: 0.3,
      renderCell: (params) => params.row.expiryDate,
    },
    {
      field: "calculationUnit",
      headerName: "Unit",
      flex: 0.2,
      renderCell: (params) => params.row.product.calculationUnit,
    },
    {
      field: "unitPrice",
      headerName: "Price",
      flex: 0.3,
      renderCell: (params) => params.row.product.unitPrice,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.3,
    },
    {
      field: "warehouseAddress",
      headerName: "Warehouse",
      flex: 0.6,
      renderCell: (params) => params.row.warehouse.address,
    },
  ];

  return (
    <div className="new-products-modal-overlay">
      <div className="new-products-modal-content">
        <div className="new-products-modal-header">
          <h2>Select Products</h2>
          <div className="exit-button" onClick={() => handleClose(false)}>
            <ExitButton />
          </div>
        </div>

        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search Products by name, ID or any related keywords"
        />
        {!loading ? (
          <Table
            columns={inventoryItemsColumns}
            rows={inventoryItems}
            selectedRowIds={selectedInventoryItems.map((item) => item.id)}
            onRowSelection={(newSelection) => {
              const selectedItems = newSelection.map((id) => {
                const item = inventoryItems.find((item) => item.id === id);

                return item;
              });
              console.log(selectedItems);
              setSelectedInventoryItems(selectedItems);
            }}
          />
        ) : (
          <LoadingComponent />
        )}

        <label style={{ marginTop: "80px" }}>Selected Items</label>
        <Table
          columns={inventoryItemsColumns}
          rows={selectedInventoryItems}
          noCheckboxSelection
        />
        <button
          style={{
            marginTop: "80px",
            marginLeft: "auto",
            marginRight: "60px",
            marginBottom: "80px",
            height: "50px",
          }}
          onClick={handleAddProducts}
        >
          Add products
        </button>
      </div>
    </div>
  );
};

export default NewProductsModal;
