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
    case "ADD_SELECTED_PRODUCTS":
      const updatedProducts = [...state.selectedProductsData];

      action.payload.forEach((newProduct) => {
        const existingProductIndex = updatedProducts.findIndex(
          (product) => product.id === newProduct.id
        );

        if (existingProductIndex >= 0) {
          // The product already exists in the array, update the amount
          updatedProducts[existingProductIndex].amount++;
        } else {
          // The product doesn't exist in the array, add it
          updatedProducts.push(newProduct);
        }
        updatedProducts.forEach((product) => {
          product.total = product.amount * product.unitPrice;
        });
      });

      return {
        ...state,
        selectedProductsData: updatedProducts,
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
