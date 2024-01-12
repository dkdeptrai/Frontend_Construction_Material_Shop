import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import selectedOrderReducer from "./selectedOrderReducer.jsx";
import saleOrdersReducer from "./saleOrdersReducer.jsx";
import inventoryItemsReducer from "./inventoryItemsReducer.jsx";
import purchaseOrdersReducer from "./purchaseOrdersReducer.jsx";
import selectedImportedProductsReducer from "./selectedImportedProducts.jsx";


const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  selectedOrder: selectedOrderReducer,
  saleOrders: saleOrdersReducer,
  inventoryItems: inventoryItemsReducer,
  purchaseOrders: purchaseOrdersReducer,
  selectedImportedProducts: selectedImportedProductsReducer,
});

export default rootReducer;
