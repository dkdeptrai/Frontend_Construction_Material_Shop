const initialState = {
  saleOrdersData: [],
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
};

const saleOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SALE_ORDERS":
      return {
        ...state,
        saleOrdersData: action.payload,
      };
    case "ADD_SALE_ORDER":
      return {
        ...state,
        saleOrdersData: [...state.saleOrders, action.payload],
      };
    case "SET_SALE_ORDERS_PAGE_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_FILTER_OPTION":
      return {
        ...state,
        filterOption: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_SHOW_SEARCH_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_START_DATE":
      return {
        ...state,
        startDate: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_END_DATE":
      return {
        ...state,
        endDate: action.payload,
      };
    case "SET_SALE_ORDERS_PAGE_STATUS":
      return {
        ...state,
        status: action.payload,
      };
  }
  return state;
};

export default saleOrdersReducer;
