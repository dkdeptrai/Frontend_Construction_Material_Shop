import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../components/core/table/table.jsx";
import ExportButton from "../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../components/layouts/newButton/newButton.jsx";
import Product from "../../models/Product.jsx";
import "./productsPage.css";
import { API_CONST } from "../../constants/apiConstants.jsx";
import { gridPaginationRowRangeSelector } from "@mui/x-data-grid";
import InputComponent from "../../components/InputComponent/InputComponent.jsx";

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
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
    total: 0,
  });

  const fetchProducts = async (page, size) => {
    try {
      const response = await fetch(
        `${API_CONST}/products?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
      setProducts(products);
      console.log("Products fetched:", products);
      setPaginationModel((prevState) => ({ ...prevState, total: data.total }));
      return data.total;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  const handleDelete = async (selectedRowIds) => {
    try {
      await Promise.all(
        selectedRowIds.map((id) =>
          fetch(`${API_CONST}/products/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
        )
      );
      fetchProducts(paginationModel.page, paginationModel.pageSize);
    } catch (error) {
      console.log(error);
    }
  };

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
      <div>
        <div className="toolBar">
          <SearchBar
            className="searchBar"
            options={options}
            placeholder="Search Products by name, ID or any related keywords"
            setFilter={setFilter}
          />
          <div className="buttonContainer">
            <ExportButton onClick={() => {}} />
            <DeleteButton onClick={() => handleDelete(selectedRowIds)} />
            <NewButton
              text="New Product"
              onClick={() => navigateToNewProduct()}
            />
          </div>
        </div>
        <div className="filters">
          <InputComponent label="Price Start" type="number" />
          <InputComponent label="Price End" type="number" />
          <InputComponent label="Calculation Unit" type="text" />
          <InputComponent label="Origin" type="text" />
        </div>
      </div>
      <Table
        className="table"
        columns={productColumns}
        rows={products}
        cellName="name"
        identifyRoute="id"
        onDeleteSelectedRows={handleDelete}
        onRowSelection={(newSelection) => {
          setSelectedRowIds(newSelection);
        }}
        paginationModel={paginationModel}
        fetchPageData={fetchProducts}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}

export default ProductsPage;
