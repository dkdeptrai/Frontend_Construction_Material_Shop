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
    "Vietnam",
    "China",
    "USA",
    "Japan",
    "Korea",
    "Germany",
    "Russia",
  ];
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [calculationUnit, setCalculationUnit] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
    total: 0,
  });
  const [searchPaginationModel, setSearchPaginationModel] = useState({
    pageSize: 10,
    page: 0,
    total: 0,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

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
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = async () => {
    try {
      let query = `q=${name}&page=0&size=10`;
      if (origin) {
        query += `&origin=${origin}`;
      }
      if (calculationUnit) {
        query += `&calculationUnit=${calculationUnit}`;
      }
      if (priceStart) {
        query += `&priceStart=${priceStart}`;
      }
      if (priceEnd) {
        query += `&priceEnd=${priceEnd}`;
      }
      console.log(`QUERY: ${API_CONST}/products/search?${query}`);
      const response = await fetch(`${API_CONST}/products/search?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
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
      setSearchResults(products);
      setSearchPaginationModel((prevState) => ({
        ...prevState,
        total: data.total,
      }));
      setShowSearchResults(true);
      console.log("Search results fetched:", searchResults);
    } catch (e) {
      console.error("Error fetching search results:", e);
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
      searchResults.length > 0
        ? handleSearch()
        : fetchProducts(paginationModel.page, paginationModel.pageSize);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchQueryChange = (event) => {
    setName(event.target.value);
    if (event.target.value === "" || event.target.value === null) {
      setShowSearchResults(false);
      setSearchResults([]);
      fetchProducts(paginationModel.page, paginationModel.pageSize);
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
      valueGetter: (params) =>
        searchResults.length > 0
          ? searchResults.indexOf(params.row) + 1
          : products.indexOf(params.row) + 1,
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
  return (
    <div className="productPageContainer">
      <div>
        <div className="toolBar">
          <SearchBar
            handleSearch={handleSearch}
            className="searchBar"
            placeholder="Search for Products by Name"
            handleSearchQueryChange={handleSearchQueryChange}
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
          <InputComponent
            type="number"
            placeholder="Price Start"
            value={priceStart}
            setValue={setPriceStart}
          />

          <InputComponent
            type="number"
            placeholder="Price End"
            value={priceEnd}
            setValue={setPriceEnd}
          />
          <InputComponent
            type="text"
            placeholder="Calculation Unit"
            value={calculationUnit}
            setValue={setCalculationUnit}
          />
          <InputComponent
            type="select"
            options={options}
            placeholder="Origin"
            value={origin}
            setValue={setOrigin}
          />
        </div>
      </div>
      <Table
        className="table"
        columns={productColumns}
        rows={showSearchResults ? searchResults : products}
        cellName="name"
        identifyRoute="id"
        onDeleteSelectedRows={handleDelete}
        onRowSelection={(newSelection) => {
          setSelectedRowIds(newSelection);
          console.log(newSelection);
        }}
        paginationModel={
          showSearchResults ? searchPaginationModel : paginationModel
        }
        fetchPageData={fetchProducts}
        onPaginationModelChange={
          showSearchResults ? setSearchPaginationModel : setPaginationModel
        }
      />
    </div>
  );
}

export default ProductsPage;
