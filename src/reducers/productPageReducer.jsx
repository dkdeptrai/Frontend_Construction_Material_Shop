const initialState = {
  products: [],
  subroute: null,
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

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_SHOW_SEARCH_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_SELECTED_ROW_IDS":
      return {
        ...state,
        selectedRowIds: action.payload,
      };
    case "SET_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_NAME":
      console.log("set name", action.payload);
      return {
        ...state,
        name: action.payload,
      };
    case "SET_ORIGIN":
      return {
        ...state,
        origin: action.payload,
      };
    case "SET_CALCULATION_UNIT":
      return {
        ...state,
        calculationUnit: action.payload,
      };
    case "SET_PRICE_START":
      return {
        ...state,
        priceStart: action.payload,
      };
    case "SET_PRICE_END":
      return {
        ...state,
        priceEnd: action.payload,
      };
    case "CLEAR_INPUT":
      return {
        ...state,
        name: "",
        origin: "",
        calculationUnit: "",
        priceStart: "",
        priceEnd: "",
      };
  }

  return state;
};

export default productsReducer;
