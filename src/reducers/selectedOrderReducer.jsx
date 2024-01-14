const initialState = {
  selectedProductsData: [],
};

const selectedOrderReducer = (state = initialState, action) => {
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
    case "UPDATE_SELECTED_PRODUCTS_AMOUNT":
      const updatedProductsAmount = [...state.selectedProductsData];
      const productIndex = updatedProductsAmount.findIndex(
        (product) => product.id === action.payload.id
      );
      updatedProductsAmount[productIndex].amount = action.payload.amount;
      updatedProductsAmount[productIndex].total =
        action.payload.amount * updatedProductsAmount[productIndex].unitPrice;
      return {
        ...state,
        selectedProductsData: updatedProductsAmount,
      };
    case "SET_SELECTED_CUSTOMER":
      return {
        ...state,
        customerData: {
          customerPhone: action.payload.customerPhone,
          customerName: action.payload.customerName,
        },
      };
    case "SET_CUSTOMER_PHONE":
      return {
        ...state,
        customerData: {
          ...state.customerData,
          customerPhone: action.payload,
        },
      };
    case "SET_CUSTOMER_NAME":
      return {
        ...state,
        customerData: {
          ...state.customerData,
          customerName: action.payload,
        },
      };
    default:
      return state;
  }
};

export default selectedOrderReducer;
