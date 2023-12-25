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

export { setSelectedProducts, addSelectedProducts, deleteSelectedProducts };