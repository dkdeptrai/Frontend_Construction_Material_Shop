const setSelectedImportedProducts = (selectedImportedProducts) => {
  return {
    type: "SET_SELECTED_IMPORTED_PRODUCTS",
    payload: selectedImportedProducts,
  };
};
const addSelectedImportedProduct = (selectedImportedProduct) => {
  return {
    type: "ADD_SELECTED_IMPORTED_PRODUCT",
    payload: selectedImportedProduct,
  };
};
const addSelectedImportedProducts = (selectedImportedProducts) => {
  return {
    type: "ADD_SELECTED_IMPORTED_PRODUCTS",
    payload: selectedImportedProducts,
  };
};
const deleteSelectedImportedProducts = (ids) => {
  return {
    type: "DELETE_SELECTED_IMPORTED_PRODUCTS",
    payload: ids,
  };
};

const updateSelectedImportedProduct = (id, selectedImportedProduct) => {
  return {
    type: "UPDATE_SELECTED_IMPORTED_PRODUCT",
    payload: {
      id,
      selectedImportedProduct,
    },
  };
}; 

const updateSelectedImportedProductsMFG = (id, mfg) => {
  return {
    type: "UPDATE_SELECTED_IMPORTED_PRODUCTS_MFG",
    payload: {
      id,
      mfg,
    },
  };
};

const updateSelectedImportedProductsEXP = (id, exp) => {
  return {
    type: "UPDATE_SELECTED_IMPORTED_PRODUCTS_EXP",
    payload: {
      id,
      exp,
    },
  };
};

const updateSelectedImportedProductsUnitPrice = (id, unitPrice) => {
  return {
    type: "UPDATE_SELECTED_IMPORTED_PRODUCTS_UNIT_PRICE",
    payload: {
      id,
      unitPrice,
    },
  };
};
const updateSelectedImportedProductsAmount = (id, amount) => {
  return {
    type: "UPDATE_SELECTED_IMPORTED_PRODUCTS_AMOUNT",
    payload: {
      id,
      amount,
    },
  };
};
export {
  setSelectedImportedProducts,
  addSelectedImportedProduct,
  addSelectedImportedProducts,
  deleteSelectedImportedProducts,
  updateSelectedImportedProduct,
  updateSelectedImportedProductsMFG,
  updateSelectedImportedProductsEXP,
  updateSelectedImportedProductsUnitPrice,
  updateSelectedImportedProductsAmount,
};
