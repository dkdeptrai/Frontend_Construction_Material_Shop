import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import selectedOrderReducer from "./selectedOrderReducer.jsx";
import productsReducer from "./productPageReducer.jsx";
import warehousesSlice from "../pages/Warehouse/WarehousesSlice.jsx";
import saleOrdersReducer from "./saleOrdersReducer.jsx";
import inventoryItemsReducer from "./inventoryItemsReducer.jsx";
import purchaseOrdersReducer from "./purchaseOrdersReducer.jsx";

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_REDUX_STORE") {
    state = undefined;
  }

  return combineReducers({
    user: userReducer,
    modal: modalReducer,
    selectedOrder: selectedOrderReducer,
    saleOrders: saleOrdersReducer,
    inventoryItems: inventoryItemsReducer,
    purchaseOrders: purchaseOrdersReducer,
    products: productsReducer,
    warehouses: warehousesSlice,
  })(state, action);
};

export default rootReducer;
