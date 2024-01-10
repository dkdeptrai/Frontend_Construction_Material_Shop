const initialState = {
  inventoryItemsData: [],
};

const inventoryItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVENTORY_ITEMS":
      return {
        ...state,
        inventoryItemsData: action.payload,
      };
    default:
      return state;
  }
};

export default inventoryItemsReducer;
