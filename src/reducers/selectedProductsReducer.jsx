const initialState = {
  selectedProductsData: [],
};

const selectedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_PRODUCTS":
      return {
        ...state,
        selectedProductsData: action.payload,
      };
    case "DELETE_SELECTED_PRODUCTS":
      return {
        ...state,
        selectedProductsData: state.selectedProductsData.filter(
          (product) => !action.payload.includes(product.id)
        ),
      };
    default:
      return state;
  }
};

export default selectedProductsReducer;
