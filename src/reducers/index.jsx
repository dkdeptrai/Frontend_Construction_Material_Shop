import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import selectedOrderReducer from "./selectedOrderReducer.jsx";


const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  selectedOrder: selectedOrderReducer,
});

export default rootReducer;
