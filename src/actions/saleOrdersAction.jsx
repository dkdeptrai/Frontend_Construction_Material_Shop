const setSaleOrdersList = (saleOrders) => {
  return {
    type: "SET_SALE_ORDERS",
    payload: saleOrders,
  }
  ;
};

const addSaleOrder = (saleOrder) => {
  return { type: "ADD_SALE_ORDER", payload: saleOrder };
};

export { setSaleOrdersList, addSaleOrder };
