const initialState = {
  inventoryItemsData: [],
  subroute: null,
  paginationModel: {
    page: 0,
    pageSize: 10,
  },
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
  }
  return state;
};

export default inventoryItemsReducer;
