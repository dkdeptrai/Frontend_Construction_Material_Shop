export const setSelectedCustomer = (customerPhone, customerName) => {
  return {
    type: "SET_SELECTED_CUSTOMER",
    payload: {
      customerPhone,
      customerName,
    },
  };
};

export const setCustomerPhone = (customerPhone) => {
  return {
    type: "SET_CUSTOMER_PHONE",
    payload: customerPhone,
  };
};

export const setCustomerName = (customerName) => {
  return {
    type: "SET_CUSTOMER_NAME",
    payload: customerName,
  };
};

