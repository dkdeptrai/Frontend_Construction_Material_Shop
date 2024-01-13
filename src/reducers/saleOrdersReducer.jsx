const initialState = {
  saleOrdersData: [],
  subroute: null,
  searchResults: [],
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
  }
  return state;
};

export default saleOrdersReducer;
