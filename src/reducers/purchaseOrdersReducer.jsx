const initialState = {
  purchaseOrdersData: [],
  subroute: null,
  searchResults: [],
  showSearchResults: false,
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
  searchQuery: "",
  startDate: "",
  endDate: "",
  status: "",
  filterOption: "Code",
};

const purchaseOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PURCHASE_ORDERS":
      return {
        ...state,
        purchaseOrdersData: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_START_DATE":
      return {
        ...state,
        startDate: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_END_DATE":
      return {
        ...state,
        endDate: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_SHOW_SEARCH_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_FILTER_OPTION":
      return {
        ...state,
        filterOption: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default purchaseOrdersReducer;
