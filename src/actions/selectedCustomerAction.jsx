export const setSelectedCustomer = (customerPhone, customerName) => {
  return {
    type: "SET_SELECTED_CUSTOMER",
    payload: {
      customerPhone,
      customerName,
    },
  };
};
