import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import selectedProductsReducer from "./selectedProductsReducer.jsx";
import productsSlice from "../pages/products/ProductsSlice.jsx";
import warehousesSlice from "../pages/Warehouse/WarehousesSlice.jsx";
const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  selectedProducts: selectedProductsReducer,
  products: productsSlice,
  warehouses: warehousesSlice,
});

export default rootReducer;
