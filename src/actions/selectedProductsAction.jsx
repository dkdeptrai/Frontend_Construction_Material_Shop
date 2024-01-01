const setSelectedProducts = (products) => {
  return {
    type: "SET_SELECTED_PRODUCTS",
    payload: products,
  };
};

const addSelectedProducts = (products) => {
  return {
    type: "ADD_SELECTED_PRODUCTS",
    payload: products,
  };
};

const deleteSelectedProducts = (ids) => {
  return {
    type: "DELETE_SELECTED_PRODUCTS",
    payload: ids,
  };
};

const updateSelectedProductsAmount = (id, amount) => {
  return {
    type: "UPDATE_SELECTED_PRODUCTS_AMOUNT",
    payload: {
      id,
      amount,
    },
  };
};

export {
  setSelectedProducts,
  addSelectedProducts,
  deleteSelectedProducts,
  updateSelectedProductsAmount,
};
