// Initial state
const initialState = {
  userData: null,
};

// Reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    case "RESET_USER_DATA":
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export default userReducer;