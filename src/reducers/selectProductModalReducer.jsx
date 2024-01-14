const initialState = {
  products: [],
  searchResults: [],
  showSearchResults: false,
  selectedRowIds: [],
  paginationModel: {
    pageSize: 10,
    page: 0,
    total: 0,
  },
  searchPaginationModel: {
    pageSize: 10,
    page: 0,
    total: 0,
  },
  // search Filters
  name: "",
  origin: "",
  calculationUnit: "",
  priceStart: "",
  priceEnd: "",
};

const selectProductsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS_MODAL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_PRODUCTS_MODAL_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_PRODUCTS_MODAL_SHOW_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_PRODUCTS_MODAL_SELECTED_ROW_IDS":
      return {
        ...state,
        selectedRowIds: action.payload,
      };
    case "SET_PRODUCTS_MODAL_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_PRODUCTS_MODAL_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_PRODUCTS_MODAL_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_PRODUCTS_MODAL_ORIGIN":
      return {
        ...state,
        origin: action.payload,
      };
    case "SET_PRODUCTS_MODAL_CALCULATION_UNIT":
      return {
        ...state,
        calculationUnit: action.payload,
      };
    case "SET_PRODUCTS_MODAL_PRICE_START":
      return {
        ...state,
        priceStart: action.payload,
      };
    case "SET_PRODUCTS_MODAL_PRICE_END":
      return {
        ...state,
        priceEnd: action.payload,
      };
  }
  return state;
};

export default selectProductsModalReducer;
