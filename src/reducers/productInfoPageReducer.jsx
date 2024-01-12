import { image } from "d3";

const initialState = {
  name: "",
  origin: "",
  description: "",
  unitPrice: "",
  unit: "",
  image: "",
};

const customerInfoPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCT_INFO_PAGE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_PRODUCT_INFO_PAGE_ORIGIN":
      return {
        ...state,
        origin: action.payload,
      };
    case "SET_PRODUCT_INFO_PAGE_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SET_PRODUCT_INFO_PAGE_UNIT_PRICE":
      return {
        ...state,
        unitPrice: action.payload,
      };
    case "SET_PRODUCT_INFO_PAGE_UNIT":
      return {
        ...state,
        unit: action.payload,
      };
    case "SET_PRODUCT_INFO_PAGE_IMAGE":
      return {
        ...state,
        image: action.payload,
      };
  }
  return state;
};

export default customerInfoPageReducer;
