const initialState = {
  subroute: null,
  warehouses: [],
  searchQuery: "",
};

const warehousesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WAREHOUSES_PAGE_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_WAREHOUSES_PAGE_WAREHOUSES":
      return {
        ...state,
        warehouses: action.payload,
      };
    case "SET_WAREHOUSES_PAGE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
  }

  return state;
};

export default warehousesReducer;
