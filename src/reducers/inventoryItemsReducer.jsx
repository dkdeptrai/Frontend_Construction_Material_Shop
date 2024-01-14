const initialState = {
  inventoryItemsData: [],
  subroute: null,
  searchResults: [],
  showSearchResults: false,
  paginationModel: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
  searchPaginationModel: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
  searchQuery: "",
  filterOption: "Name",
  warehousesOption: [],
  warehouses: [],
};

const inventoryItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVENTORY_PAGE_INVENTORY_ITEM":
      return {
        ...state,
        inventoryItemsData: action.payload,
      };
    case "SET_INVENTORY_PAGE_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_INVENTORY_PAGE_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_INVENTORY_PAGE_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_INVENTORY_PAGE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_INVENTORY_PAGE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_INVENTORY_PAGE_SHOW_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_INVENTORY_PAGE_FILTER_OPTION":
      return {
        ...state,
        filterOption: action.payload,
      };
    case "SET_INVENTORY_PAGE_WAREHOUSES_OPTION":
      return {
        ...state,
        warehousesOption: action.payload,
      };
    case "SET_INVENTORY_PAGE_WAREHOUSES":
      return {
        ...state,
        warehouses: action.payload,
      };
  }
  return state;
};

export default inventoryItemsReducer;
