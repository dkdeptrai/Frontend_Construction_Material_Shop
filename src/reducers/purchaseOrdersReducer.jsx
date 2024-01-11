const initialState = {
  purchaseOrdersData: [],
};

const purchaseOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PURCHASE_ORDERS":
      return {
        ...state,
        purchaseOrdersData: action.payload,
      };

    default:
      return state;
  }
};

export default purchaseOrdersReducer;
