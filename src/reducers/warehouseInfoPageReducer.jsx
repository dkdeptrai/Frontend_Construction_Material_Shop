const initialState = {
  address: "",
  capacity: "",
};

const warehouseInfoPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WAREHOUSE_INFO_PAGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "SET_WAREHOUSE_INFO_PAGE_CAPACITY":
      return {
        ...state,
        capacity: action.payload,
      };
    case "CLEAR_WAREHOUSE_INFO_PAGE":
      return {
        ...state,
        address: "",
        capacity: "",
      };
  }
  return state;
};

export default warehouseInfoPageReducer;
