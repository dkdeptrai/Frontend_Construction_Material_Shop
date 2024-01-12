const initialState = {
  importedProductsData: [],
};

const selectedImportedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_IMPORTED_PRODUCTS":
      return {
        ...state,
        importedProductsData: action.payload,
      };
    case "ADD_SELECTED_IMPORTED_PRODUCT":
      return {
        ...state,
        importedProductsData: [...state.importedProductsData, action.payload],
      };

    case "ADD_SELECTED_IMPORTED_PRODUCTS":
      const updatedProducts = [...state.importedProductsData];

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
      });

      return {
        ...state,
        importedProductsData: updatedProducts,
      };

    case "DELETE_SELECTED_IMPORTED_PRODUCTS":
      return {
        ...state,
        importedProductsData: state.importedProductsData.filter(
          (product) => !action.payload.includes(product.id)
        ),
      };

    case "UPDATE_SELECTED_IMPORTED_PRODUCT":
      const updatedProductsData = [...state.importedProductsData];
      const productIndexToUpdate = updatedProductsData.findIndex(
        (product) => product.id === action.payload.id
      );
      updatedProductsData[productIndexToUpdate].productId =
        action.payload.selectedImportedProduct.id;
      updatedProductsData[productIndexToUpdate].productName =
        action.payload.selectedImportedProduct.name;
      updatedProductsData[productIndexToUpdate].imageUrl =
        action.payload.selectedImportedProduct.imageUrl;
      return {
        ...state,
        importedProductsData: updatedProductsData,
      };

    case "UPDATE_SELECTED_IMPORTED_PRODUCTS_MFG":
      const updatedProductsMFG = [...state.importedProductsData];
      const productIndexMFG = updatedProductsMFG.findIndex(
        (product) => product.id === action.payload.id
      );
      updatedProductsMFG[productIndexMFG].mfg = action.payload.mfg;
      return {
        ...state,
        importedProductsData: updatedProductsMFG,
      };

    case "UPDATE_SELECTED_IMPORTED_PRODUCTS_EXP":
      const updatedProductsEXP = [...state.importedProductsData];
      const productIndexEXP = updatedProductsEXP.findIndex(
        (product) => product.id === action.payload.id
      );
      updatedProductsEXP[productIndexEXP].exp = action.payload.exp;
      return {
        ...state,
        importedProductsData: updatedProductsEXP,
      };

    case "UPDATE_SELECTED_IMPORTED_PRODUCTS_UNIT_PRICE":
      const updatedProductsUnitPrice = [...state.importedProductsData];
      const productIndexUnitPrice = updatedProductsUnitPrice.findIndex(
        (product) => product.id === action.payload.id
      );
      updatedProductsUnitPrice[productIndexUnitPrice].unitPrice =
        action.payload.unitPrice;
      return {
        ...state,
        importedProductsData: updatedProductsUnitPrice,
      };

    case "UPDATE_SELECTED_IMPORTED_PRODUCTS_AMOUNT":
      const updatedProductsAmount = [...state.importedProductsData];
      const productIndex = updatedProductsAmount.findIndex(
        (product) => product.id === action.payload.id
      );
      updatedProductsAmount[productIndex].amount = action.payload.amount;
      updatedProductsAmount[productIndex].total =
        action.payload.amount * updatedProductsAmount[productIndex].unitPrice;
      return {
        ...state,
        importedProductsData: updatedProductsAmount,
      };
    case "UPDATE_SELECTED_IMPORTED_PRODUCTS_WAREHOUSE":
      const updatedProductsWarehouse = [...state.importedProductsData];
      const productIndexWarehouse = updatedProductsWarehouse.findIndex(
        (product) => product.id === action.payload.id
      );
      updatedProductsWarehouse[productIndexWarehouse].warehouse =
        action.payload.warehouseId;
      return {
        ...state,
        importedProductsData: updatedProductsWarehouse,
      };

    default:
      return state;
  }
};

export default selectedImportedProductsReducer;
