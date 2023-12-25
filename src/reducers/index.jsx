import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import amountModalReducer from "../store/AmountModal.jsx";
import selectedProductsReducer from "./selectedProductsReducer.jsx";


const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  selectedProducts: selectedProductsReducer,
  amountModal: amountModalReducer,
});

export default rootReducer;
