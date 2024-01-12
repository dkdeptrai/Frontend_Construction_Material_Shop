import React, { useState, useEffect } from "react";
import "./SelectProductModal.css";

//redux
import { useDispatch } from "react-redux";
import { updateSelectedImportedProduct } from "../../../../actions/selectedImportedProductsAction";

//components
import Table from "../../../../components/core/table/table";
import LoadingCircle from "../../../../components/LoadingCircle/LoadingCircle";
import ExitButton from "../../../../assets/icons/exitbutton.svg?react";
import SearchBar from "../../../../components/layouts/searchBar/searchBar";

import { API_CONST } from "../../../../constants/apiConstants";

const SelectProductModal = ({ handleClose, productRowPointer }) => {
  const dispatch = useDispatch();


  const [products, setProducts] = useState([]);

  //loading
  const [loading, setLoading] = useState(true);

  //fecth for products
  const fetchProducts = async () => {
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(API_CONST + "/products?page=0&size=10", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setProducts(data.results);
      console.log("Products fetched:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const options = [
    "name",
    "origin",
    "calculation unit",
    "price start",
    "price end",
  ];

  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => products.indexOf(params.row) + 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1.5,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.imageUrl} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "unitPrice", headerName: "Price", flex: 0.3 },
    {
      field: "calculationUnit",
      headerName: "Calculation unit",
      flex: 0.4,
    },
    { field: "origin", headerName: "Origin", flex: 1 },
  ];

  const handleExit = () => {
    handleClose();
  };

  return (
    <div className="product-modal-overlay">
      {loading && <LoadingCircle />}
      <div className="product-modal-content">
        <div className="product-modal-header">
          <h2>Select a product</h2>
          <div className="exit-button" onClick={handleExit}>
            <ExitButton />
          </div>
        </div>
        <div className="toolBar">
          <SearchBar
            className="searchBar"
            options={options}
            placeholder="Search Products by name, ID or any related keywords"
          />
        </div>
        <Table
          columns={productColumns}
          rows={products}
          onRowSelection={(newSelection) => {
            const itemId = newSelection[0];
            const selectedProduct = products.find(
              (product) => product.id === itemId
            );
            dispatch(
              updateSelectedImportedProduct(productRowPointer, selectedProduct)
            );
            handleClose();
          }}
        />
      </div>
    </div>
  );
};

export default SelectProductModal;
