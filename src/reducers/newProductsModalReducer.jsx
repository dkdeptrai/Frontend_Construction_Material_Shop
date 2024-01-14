const initialState = {
  inventoryItemsData: [],
  searchResults: [],
  selectedInventoryItems: [],
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

const newProductsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEW_PRODUCTS_MODAL_INVENTORY_ITEM":
      return {
        ...state,
        inventoryItemsData: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_SELECTED_INVENTORY_ITEMS":
      return {
        ...state,
        selectedInventoryItems: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_SHOW_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_FILTER_OPTION":
      return {
        ...state,
        filterOption: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_WAREHOUSES_OPTION":
      return {
        ...state,
        warehousesOption: action.payload,
      };
    case "SET_NEW_PRODUCTS_MODAL_WAREHOUSES":
      return {
        ...state,
        warehouses: action.payload,
      };
  }
  return state;
};

export default newProductsModalReducer;
