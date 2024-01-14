import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import DeleteButton from "../../../components/layouts/deleteButton/deleteButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import "./ProductsPage.css";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import InputComponent from "../../../components/InputComponent/InputComponent.jsx";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent.jsx";
import { productOrigins } from "../../../constants/productConstants.jsx";

function ProductsPage() {
  const dispatch = useDispatch();
  const subroute = useSelector((state) => state.products.subroute);
  const navigate = useNavigate();
  const options = productOrigins;
  const [isLoading, setIsLoading] = useState(false);

  const products = useSelector((state) => state.products.products);
  const selectedRowIds = useSelector((state) => state.products.selectedRowIds);

  const userType = useSelector((state) => state.user.userData?.userType) || "";

  //tables states
  const paginationModel = useSelector(
    (state) => state.products.paginationModel
  );

  const searchPaginationModel = useSelector(
    (state) => state.products.searchPaginationModel
  );

  // search states
  const searchResults = useSelector((state) => state.products.searchResults);
  const showSearchResults = useSelector(
    (state) => state.products.showSearchResults
  );
  console.log("showSearchResults: ", showSearchResults);

  // filter options
  const name = useSelector((state) => state.products.name);
  const origin = useSelector((state) => state.products.origin);
  const calculationUnit = useSelector(
    (state) => state.products.calculationUnit
  );
  const priceStart = useSelector((state) => state.products.priceStart);
  const priceEnd = useSelector((state) => state.products.priceEnd);

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
      dispatch({ type: "SET_PRODUCTS_PAGE_PRODUCTS", payload: products });
      const total = data.total;
      dispatch({
        type: "SET_PRODUCTS_PAGE_PAGINATION_MODEL",
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

      dispatch({ type: "SET_PRODUCTS_PAGE_SEARCH_RESULTS", payload: products });
      dispatch({ type: "SET_PRODUCTS_PAGE_SHOW_RESULTS", payload: true });
      dispatch({
        type: "SET_PRODUCTS_PAGE_SEARCH_PAGINATION_MODEL",
        payload: {
          ...searchPaginationModel,
          total: data.total,
        },
      });
    } catch (e) {
      console.error("Error fetching search results:", e);
      dispatch({ type: "SET_PRODUCTS_PAGE_SHOW_RESULTS", payload: true });
      dispatch({ type: "SET_PRODUCTS_PAGE_SEARCH_RESULTS", payload: [] });
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleExport = async () => {
    const response = await fetch(`${API_CONST}/products/export/excel`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  useEffect(() => {
    if (subroute) {
      let id = subroute.split("/")[1];
      if (id) {
        navigate(`/products/${id}`);
      } else if (subroute === "add") {
        navigate("/products/add");
      }
    }
  }, [subroute]);

  useEffect(() => {
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (showSearchResults) {
      handleSearch();
    }
  }, [searchPaginationModel.page, searchPaginationModel.pageSize]);

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
          type: "SET_PRODUCTS_PAGE_SEARCH_RESULTS",
          payload: searchResults.filter(
            (product) => !selectedRowIds.includes(product.id)
          ),
        });
        dispatch({
          type: "SET_PRODUCTS_PAGE_SEARCH_PAGINATION_MODEL",
          payload: {
            ...searchPaginationModel,
            total: searchPaginationModel.total - selectedRowIds.length,
          },
        });
      } else {
        dispatch({
          type: "SET_PRODUCTS_PAGE_PRODUCTS",
          payload: products.filter(
            (product) => !selectedRowIds.includes(product.id)
          ),
        });
        dispatch({
          type: "SET_PRODUCTS_PAGE_PAGINATION_MODEL",
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
    dispatch({ type: "SET_PRODUCTS_PAGE_NAME", payload: event.target.value });
    if (event.target.value === "" || event.target.value === null) {
      dispatch({ type: "SET_PRODUCTS_PAGE_SHOW_RESULTS", payload: false });
      dispatch({ type: "SET_PRODUCTS_PAGE_SEARCH_RESULTS", payload: [] });
      fetchProducts(paginationModel.page, paginationModel.pageSize);
    }
  };

  const navigateToNewProduct = () => {
    dispatch({ type: "SET_PRODUCTS_PAGE_SUBROUTE", payload: "add" });
    navigate("/products/add");
  };

  const handleCellClick = (params, event) => {
    if (params.field === "name") {
      dispatch({
        type: "SET_PRODUCTS_PAGE_SUBROUTE",
        payload: `add/${params.row.id}`,
      });
      navigate(`/products/${params.row.id}`);
      event.stopPropagation();
    }
  };

  const productColumns = [
    {
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
  return (
    <div className="productPageContainer">
      <div>
        <div className="toolBar">
          <SearchBar
            handleSearch={handleSearch}
            className="searchBar"
            placeholder="Search for Products by Name"
            handleSearchQueryChange={handleSearchQueryChange}
            value={name}
          />
          <div className="buttonContainer">
            <ExportButton onClick={handleExport} />
            {userType === "MANAGER" && (
              <DeleteButton onClick={() => handleDelete(selectedRowIds)} />
            )}

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
            setValue={(value) =>
              dispatch({
                type: "SET_PRODUCTS_PAGE_PRICE_START",
                payload: value,
              })
            }
          />

          <InputComponent
            type="number"
            placeholder="Price End"
            value={priceEnd}
            setValue={(value) =>
              dispatch({ type: "SET_PRODUCTS_PAGE_PRICE_END", payload: value })
            }
          />
          <InputComponent
            type="text"
            placeholder="Calculation Unit"
            value={calculationUnit}
            setValue={(value) =>
              dispatch({
                type: "SET_PRODUCTS_PAGE_CALCULATION_UNIT",
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
              dispatch({ type: "SET_PRODUCTS_PAGE_ORIGIN", payload: value })
            }
          />
        </div>
      </div>
      {!isLoading ? (
        <Table
          className="table"
          columns={productColumns}
          rows={showSearchResults ? searchResults : products}
          handleCellClick={userType === "MANAGER" ? handleCellClick : null}
          cellName={userType === "MANAGER" ? "name" : null}
          identifyRoute="id"
          selectedRowIds={selectedRowIds}
          onRowSelection={(newSelection) => {
            dispatch({
              type: "SET_PRODUCTS_PAGE_SELECTED_ROW_IDS",
              payload: newSelection,
            });
          }}
          paginationModel={
            showSearchResults ? searchPaginationModel : paginationModel
          }
          onPaginationModelChange={
            showSearchResults
              ? (newPaginationModel) =>
                  dispatch({
                    type: "SET_PRODUCTS_PAGE_SEARCH_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
              : (newPaginationModel) =>
                  dispatch({
                    type: "SET_PRODUCTS_PAGE_PAGINATION_MODEL",
                    payload: newPaginationModel,
                  })
          }
          noCheckboxSelection={userType === "EMPLOYEE"}
        />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}

export default ProductsPage;
