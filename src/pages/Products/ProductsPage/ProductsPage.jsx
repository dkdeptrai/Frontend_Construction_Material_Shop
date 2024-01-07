import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import "./ProductsPage.css";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import InputComponent from "../../../components/InputComponent/InputComponent.jsx";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle.jsx";
import productsReducer from "../../../reducers/productPageReducer.jsx";

function ProductsPage() {
  const dispatch = useDispatch();
  const subroute = useSelector((state) => state.products.subroute);
  console.log("initial subroute:", subroute);
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
  const [isLoading, setIsLoading] = useState(false);

  const products = useSelector((state) => state.products.products);
  const selectedRowIds = useSelector((state) => state.products.selectedRowIds);
  //tables states
  const paginationModel = useSelector(
    (state) => state.products.paginationModel
  );

  const searchPaginationModel = useSelector(
    (state) => state.products.searchPaginationModel
  );
  // const [paginationModel, setPaginationModel] = useState({
  //   pageSize: 2,
  //   page: 0,
  //   total: 0,
  // });
  // const [searchPaginationModel, setSearchPaginationModel] = useState({
  //   pageSize: 10,
  //   page: 0,
  //   total: 0,
  // });

  // search states
  const searchResults = useSelector((state) => state.products.searchResults);
  const showSearchResults = useSelector(
    (state) => state.products.showSearchResults
  );

  // filter options
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [calculationUnit, setCalculationUnit] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");

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
      const data = await response.json();
      const products = data.results;
      dispatch({ type: "SET_PRODUCTS", payload: products });
      const total = data.total;
      dispatch({
        type: "SET_PAGINATION_MODEL",
        payload: {
          ...paginationModel,
          total: total,
        },
      });
      console.log("product fetched:", products);
      console.log("paginationModel:", paginationModel);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
        query += `&minPrice=${priceStart}`;
      }
      if (priceEnd) {
        query += `&maxPrice=${priceEnd}`;
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
      const products = data.results;
      dispatch({ type: "SET_SEARCH_RESULTS", payload: products });
      dispatch({ type: "SET_SHOW_SEARCH_RESULTS", payload: true });
      dispatch({
        type: "SET_SEARCH_PAGINATION_MODEL",
        payload: {
          ...searchPaginationModel,
          total: data.total,
        },
      });
    } catch (e) {
      console.error("Error fetching search results:", e);
    }
  };

  useEffect(() => {
    if (subroute === "add") {
      navigate("/products/add");
    }
  });

  useEffect(() => {
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);
  const handleDelete = async (selectedRowIds) => {
    try {
      if (
        window.confirm(
          "Are you sure you want to delete the selected products?"
        ) !== true
      )
        return;
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
      if (searchResults.length > 0) {
        dispatch({
          type: "SET_SEARCH_RESULTS",
          payload: searchResults.filter(
            (product) => !selectedRowIds.includes(product.id)
          ),
        });
        dispatch({
          type: "SET_SEARCH_PAGINATION_MODEL",
          payload: {
            ...searchPaginationModel,
            total: searchPaginationModel.total - selectedRowIds.length,
          },
        });
      } else {
        dispatch({
          type: "SET_PRODUCTS",
          payload: products.filter(
            (product) => !selectedRowIds.includes(product.id)
          ),
        });
        dispatch({
          type: "SET_PAGINATION_MODEL",
          payload: {
            ...paginationModel,
            total: paginationModel.total - selectedRowIds.length,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchQueryChange = (event) => {
    setName(event.target.value);
    if (event.target.value === "" || event.target.value === null) {
      dispatch({ type: "SET_SHOW_SEARCH_RESULTS", payload: false });
      dispatch({ type: "SET_SEARCH_RESULTS", payload: [] });
      fetchProducts(paginationModel.page, paginationModel.pageSize);
    }
  };

  const navigateToNewProduct = () => {
    dispatch({ type: "SET_SUBROUTE", payload: "add" });
    navigate("/products/add");
  };
  const productColumns = [
    {
      field: "id",
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
  return (
    <div className="productPageContainer">
      {isLoading && <LoadingCircle />}
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
      {products && (
        <Table
          className="table"
          columns={productColumns}
          rows={showSearchResults ? searchResults : products}
          cellName="name"
          identifyRoute="id"
          onRowSelection={(newSelection) => {
            dispatch({ type: "SET_SELECTED_ROW_IDS", payload: newSelection });
          }}
          paginationModel={
            showSearchResults ? searchPaginationModel : paginationModel
          }
          onPaginationModelChange={
            showSearchResults
              ? (newPaginationModel) =>
                  dispatch({
                    type: "SET_SEARCH_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
              : (newPaginationModel) =>
                  dispatch({
                    type: "SET_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
          }
        />
      )}
    </div>
  );
}

export default ProductsPage;
