const initialState = {
  name: "",
  phoneNumber: "",
  dateOfBirth: "",
  address: "",
  tax: "",

  isNameValid: true,
  isPhoneNumberValid: true,
  isAddressValid: true,
  isDateOfBirthValid: true,

  isTaxValid: true,
};

const addCustomerPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADD_CUSTOMER_PAGE_NAME":
      return { ...state, name: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_DATE_OF_BIRTH":
      return { ...state, dateOfBirth: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_TAX":
      return { ...state, tax: action.payload };

    case "SET_ADD_CUSTOMER_PAGE_IS_NAME_VALID":
      return { ...state, isNameValid: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_IS_PHONE_NUMBER_VALID":
      return { ...state, isPhoneNumberValid: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_IS_ADDRESS_VALID":
      return { ...state, isAddressValid: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_IS_DATE_OF_BIRTH_VALID":
      return { ...state, isDateOfBirthValid: action.payload };
    case "SET_ADD_CUSTOMER_PAGE_IS_TAX_VALID":
      return { ...state, isTaxValid: action.payload };

    default:
      return state;
  }
};

export default addCustomerPageReducer;
