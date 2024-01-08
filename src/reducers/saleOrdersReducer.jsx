const initialState = {
  saleOrdersData: [],
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
    default:
      return state;
  }
};

export default saleOrdersReducer;
