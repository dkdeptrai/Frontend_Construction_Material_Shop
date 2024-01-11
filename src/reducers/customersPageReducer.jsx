const initialState = {
  customers: [],
  subroute: null,
  searchResults: ["abc"],
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
  phone: "",
  address: "",
};

const customersPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CUSTOMERS_PAGE_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_CUSTOMERS":
      return {
        ...state,
        customers: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_SHOW_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_SELECTED_ROW_IDS":
      return {
        ...state,
        selectedRowIds: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_PHONE":
      return {
        ...state,
        phone: action.payload,
      };
    case "SET_CUSTOMERS_PAGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
  }
  return state;
};

export default customersPageReducer;
