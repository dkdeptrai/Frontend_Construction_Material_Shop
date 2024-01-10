import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../components/core/table/table.jsx";
import ExportButton from "../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../components/layouts/newButton/newButton.jsx";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle.jsx";
import "./productsPage.css";

function ProductsPage() {
  const navigate = useNavigate();
  const userType = useSelector((state) =>
    state.user.userData?.userType ? state.user.userData.userType : "EMPLOYEE"
  );

  const options = [
    "name",
    "origin",
    "calculation unit",
    "price start",
    "price end",
  ];
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(
        "http://localhost:8080/api/v1/products?page=0&size=10",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
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

  const navigateToNewProduct = () => {
    navigate("/products/add");
  };
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
  console.log(filter);
  return (
    <div className="productPageContainer">
      {loading && <LoadingCircle />}
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search Products by name, ID or any related keywords"
          setFilter={setFilter}
        />
        <div className="buttonContainer">
          <ExportButton onClick={() => {}} />
          {userType === "EMPLOYEE" ? null : <DeleteButton onClick={() => {}} />}
          <NewButton
            text="New Product"
            onClick={() => navigateToNewProduct()}
          />
        </div>
      </div>
      <Table
        className="table"
        columns={productColumns}
        rows={products}
        noCheckboxSelection={userType === "EMPLOYEE" ? true : false}
      />
    </div>
  );
}

export default ProductsPage;
