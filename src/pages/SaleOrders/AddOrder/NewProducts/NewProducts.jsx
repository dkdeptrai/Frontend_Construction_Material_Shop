import React, { useEffect, useState } from "react";

//pages and components
import BackButton from "../../../../components/layouts/backButton/backButton";
import SearchBar from "../../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../../components/core/table/table.jsx";
import { API_CONST } from "../../../../constants/apiConstants";

const NewProducts = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);

  const handleAddProducts = () => {
    console.log(selectedInventoryItems);
  };

  const options = ["Product's name", "Product's code", "Price", "Quantity"];

  const fetchInventoryItems = async () => {
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(API_CONST + "/inventories?page=0&size=2", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setInventoryItems(data.results);
      console.log("Inventory 's products fetched:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
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
      flex: 0.6,
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
      flex: 0.2,
      renderCell: (params) => params.row.manufacturingDate[0],
    },
    {
      field: "exp",
      headerName: "Expiry Date",
      flex: 0.3,
      renderCell: (params) =>
        params.row.expiryDate[2] +
        "/" +
        params.row.expiryDate[1] +
        "/" +
        params.row.expiryDate[0],
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

  const selectedInventoryItemsColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) => inventoryItems.indexOf(params.row) + 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 0.6,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.imageUrl} />
          <span>{params.row.name}</span>
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.3,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.3,
    },
  ];

  return (
    <>
      <BackButton content="Add products to order" />
      <SearchBar
        options={options}
        placeholder="Search Products by name, ID or any related keywords"
      />
      <Table
        columns={inventoryItemsColumns}
        rows={inventoryItems}
        onRowSelection={(newSelection) => {
          const selectedItems = newSelection.map((id) => {
            const item = inventoryItems.find((item) => item.id === id);
            
            return {
                id: item.product.id,
                name: item.product.name,
                imageUrl: item.product.imageUrl,
                amount: 0,
                total: 0,
            }
            
          });
          setSelectedInventoryItems(selectedItems);
        }}
      />
      <label style={{ marginTop: "80px" }}>Selected Items</label>
      <Table
        columns={selectedInventoryItemsColumns}
        rows={selectedInventoryItems}
      />
      <button
        style={{ marginTop: "80px", marginBottom: "80px" }}
        onClick={handleAddProducts}
      >
        Add products
      </button>
    </>
  );
};

export default NewProducts;
