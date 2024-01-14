import React, { useState, useEffect } from "react";
import "./SelectProductModal.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedImportedProduct } from "../../../../actions/selectedImportedProductsAction";

//components
import Table from "../../../../components/core/table/table";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import ExitButton from "../../../../assets/icons/exitbutton.svg?react";
import SearchBar from "../../../../components/layouts/searchBar/searchBar";

import { API_CONST } from "../../../../constants/apiConstants";
import { productOrigins } from "../../../../constants/productConstants";
import InputComponent from "../../../../components/InputComponent/InputComponent";
import { render } from "react-dom";

const SelectProductModal = ({ handleClose, productRowPointer }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.selectProductsModal.products);
  const paginationModel = useSelector(
    (state) => state.selectProductsModal.paginationModel
  );
  const searchPaginationModel = useSelector(
    (state) => state.selectProductsModal.searchPaginationModel
  );
  const searchResults = useSelector(
    (state) => state.selectProductsModal.searchResults
  );
  const showSearchResults = useSelector(
    (state) => state.selectProductsModal.showSearchResults
  );
  const name = useSelector((state) => state.selectProductsModal.name);
  const origin = useSelector((state) => state.selectProductsModal.origin);
  const calculationUnit = useSelector(
    (state) => state.selectProductsModal.calculationUnit
  );
  const priceStart = useSelector(
    (state) => state.selectProductsModal.priceStart
  );
  const priceEnd = useSelector((state) => state.selectProductsModal.priceEnd);

  //loading
  const [isLoading, setIsLoading] = useState(true);

  //fetch for products
  const fetchProducts = async (page, size) => {
    try {
      setIsLoading(true);
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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const products = data.results;
      dispatch({ type: "SET_PRODUCTS_MODAL_PRODUCTS", payload: products });
      const total = data.total;
      dispatch({
        type: "SET_PRODUCTS_MODAL_PAGINATION_MODEL",
        payload: {
          ...paginationModel,
          total: total,
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = async (page, size) => {
    try {
      setIsLoading(true);
      let query = `keyword=${name}&page=${searchPaginationModel.page}&size=${searchPaginationModel.pageSize}`;
      if (origin) {
        query += `&origin=${origin}`;
      }
      if (calculationUnit) {
        query += `&calculationUnit=${calculationUnit}`;
      }
      if (priceStart) {
        query += `&minPrice=${priceStart}`;
      }
      if (priceEnd) {
        query += `&maxPrice=${priceEnd}`;
      }
      console.log("query: ", query);
      const response = await fetch(`${API_CONST}/products/search?${query}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const products = data.results;

      dispatch({
        type: "SET_PRODUCTS_MODAL_SEARCH_RESULTS",
        payload: products,
      });
      dispatch({ type: "SET_PRODUCTS_MODAL_SHOW_RESULTS", payload: true });
      dispatch({
        type: "SET_PRODUCTS_MODAL_SEARCH_PAGINATION_MODEL",
        payload: {
          ...searchPaginationModel,
          total: data.total,
        },
      });
    } catch (e) {
      console.error("Error fetching search results:", e);
      dispatch({ type: "SET_PRODUCTS_MODAL_SHOW_RESULTS", payload: true });
      dispatch({ type: "SET_PRODUCTS_MODAL_SEARCH_RESULTS", payload: [] });
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleSearchQueryChange = (event) => {
    dispatch({ type: "SET_PRODUCTS_MODAL_NAME", payload: event.target.value });
    if (event.target.value === "" || event.target.value === null) {
      dispatch({ type: "SET_PRODUCTS_PAGE_MODAL_RESULTS", payload: false });
      dispatch({ type: "SET_PRODUCTS_PAGE_MODAL_RESULTS", payload: [] });
      fetchProducts(paginationModel.page, paginationModel.pageSize);
    }
  };

  useEffect(() => {
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (showSearchResults) {
      handleSearch();
    }
  }, [searchPaginationModel.page, searchPaginationModel.pageSize]);
  const options = productOrigins;

  const productColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      renderCell: (params) =>
        showSearchResults
          ? searchPaginationModel.page * 10 +
            searchResults.indexOf(params.row) +
            1
          : paginationModel.page * 10 + products.indexOf(params.row) + 1,
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
      {isLoading && <LoadingScreen />}
      <div className="product-modal-content">
        <div className="product-modal-header">
          <h2>Select a product</h2>
          <div className="exit-button" onClick={handleExit}>
            <ExitButton />
          </div>
        </div>
        <div className="toolBar">
          <SearchBar
            handleSearch={handleSearch}
            handleSearchQueryChange={handleSearchQueryChange}
            value={name}
            className="searchBar"
            placeholder="Search Products by name"
          />
        </div>
        <div className="filters">
          <InputComponent
            type="number"
            placeholder="Price Start"
            value={priceStart}
            setValue={(value) =>
              dispatch({
                type: "SET_PRODUCTS_MODAL_PRICE_START",
                payload: value,
              })
            }
          />

          <InputComponent
            type="number"
            placeholder="Price End"
            value={priceEnd}
            setValue={(value) =>
              dispatch({ type: "SET_MODAL_PAGE_PRICE_END", payload: value })
            }
          />
          <InputComponent
            type="text"
            placeholder="Calculation Unit"
            value={calculationUnit}
            setValue={(value) =>
              dispatch({
                type: "SET_PRODUCTS_MODAL_CALCULATION_UNIT",
                payload: value,
              })
            }
          />
          <InputComponent
            type="select"
            options={options}
            placeholder="Origin"
            value={origin}
            setValue={(value) =>
              dispatch({ type: "SET_PRODUCTS_MODAL_ORIGIN", payload: value })
            }
          />
        </div>
        <Table
          columns={productColumns}
          rows={showSearchResults ? searchResults : products}
          paginationModel={
            showSearchResults ? searchPaginationModel : paginationModel
          }
          onPaginationModelChange={
            showSearchResults
              ? (newPaginationModel) =>
                  dispatch({
                    type: "SET_PRODUCTS_MODAL_SEARCH_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
              : (newPaginationModel) =>
                  dispatch({
                    type: "SET_PRODUCTS_MODAL_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
          }
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
          noCheckboxSelection
        />
      </div>
    </div>
  );
};

export default SelectProductModal;
