import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import selectedOrderReducer from "./selectedOrderReducer.jsx";
import productsReducer from "./productPageReducer.jsx";
import warehousesSlice from "../pages/Warehouse/WarehousesSlice.jsx";
import saleOrdersReducer from "./saleOrdersReducer.jsx";

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_REDUX_STORE") {
    state = undefined;
  }

  return combineReducers({
    user: userReducer,
    modal: modalReducer,
    selectedOrder: selectedOrderReducer,
    saleOrders: saleOrdersReducer,
    products: productsReducer,
    warehouses: warehousesSlice,
  })(state, action);
};

export default rootReducer;
