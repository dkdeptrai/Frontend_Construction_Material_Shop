import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../components/core/table/table.jsx";
import ExportButton from "../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../components/layouts/newButton/newButton.jsx";
import Product from "../../models/Product.jsx";
import "./productsPage.css";

function ProductsPage() {
  const navigate = useNavigate();
  const options = [
    "name",
    "origin",
    "calculation unit",
    "price start",
    "price end",
  ];
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchProducts = async () => {
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(
        "http://localhost:8080/api/v1/products?page=0&size=2",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJlbXBsb3llZTFAZ21haWwuY29tIiwiaWF0IjoxNzAxOTE1NzE4fQ.04Zj0HZ4aK9qUJOU7_5EGGfm-5pCjQ-dmbz2fG_njRijxfTg5g9sbmM6BwE12eHy`,
          },
        }
      );
      const data = await response.json();
      const products = data.results.map(
        (item) =>
          new Product(
            item.id,
            item.name,
            item.origin,
            item.imageUrl,
            item.description,
            item.unitPrice,
            item.calculationUnit,
            item.quantitySold,
            item.quantityRemaining,
            item.deleted
          )
      );
      console.log(products);
      setProducts(products);
      console.log("Products fetched:", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigateToNewProduct = () => {
    navigate("/products/add");
  };
  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
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
  console.log(filter);
  return (
    <div className="productPageContainer">
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search Products by name, ID or any related keywords"
          setFilter={setFilter}
        />
        <div className="buttonContainer">
          <ExportButton onClick={() => {}} />
          <DeleteButton onClick={() => {}} />
          <NewButton
            text="New Product"
            onClick={() => navigateToNewProduct()}
          />
        </div>
      </div>
      <Table className="table" columns={productColumns} rows={products} />
    </div>
  );
}

export default ProductsPage;
