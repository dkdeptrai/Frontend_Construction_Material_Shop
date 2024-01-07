import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import selectedOrderReducer from "./selectedOrderReducer.jsx";
import productsSlice from "../pages/products/ProductsSlice.jsx";
import warehousesSlice from "../pages/Warehouse/WarehousesSlice.jsx";
const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  selectedOrder: selectedOrderReducer,
  products: productsSlice,
  warehouses: warehousesSlice,
});

export default rootReducer;
