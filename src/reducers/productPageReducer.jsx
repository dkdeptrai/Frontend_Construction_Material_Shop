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
  }

  return state;
};

export default productsReducer;
