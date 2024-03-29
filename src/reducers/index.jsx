import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";
import modalReducer from "../store/Modal.jsx";
import selectedOrderReducer from "./selectedOrderReducer.jsx";
import productsReducer from "./productPageReducer.jsx";
import warehousesReducer from "./warehousesReducer.jsx";
import warehouseInfoPageReducer from "./warehouseInfoPageReducer.jsx";
import saleOrdersReducer from "./saleOrdersReducer.jsx";
import inventoryItemsReducer from "./inventoryItemsReducer.jsx";
import purchaseOrdersReducer from "./purchaseOrdersReducer.jsx";
import selectedImportedProductsReducer from "./selectedImportedProducts.jsx";
import customersPageReducer from "./customersPageReducer.jsx";
import productInfoPageReducer from "./productInfoPageReducer.jsx";
import addCustomerPageReducer from "./addCustomerPageReducer.jsx";
import employeePageReducer from "./employeePageReducer.jsx";
import selectProductsModalReducer from "./selectProductModalReducer.jsx";
import newProductsModalReducer from "./newProductsModalReducer.jsx";
const rootReducer = (state, action) => {
  if (action.type === "CLEAR_REDUX_STORE") {
    const keepUser = action.payload?.keepUser;
    if (keepUser) {
      const userState = state.user;
      state = undefined;
      state = { user: userState };
    } else {
      state = undefined;
    }
  }

  return combineReducers({
    user: userReducer,
    modal: modalReducer,
    selectedOrder: selectedOrderReducer,
    saleOrders: saleOrdersReducer,
    inventoryItems: inventoryItemsReducer,
    purchaseOrders: purchaseOrdersReducer,
    selectedImportedProducts: selectedImportedProductsReducer,
    products: productsReducer,
    productInfo: productInfoPageReducer,
    warehouses: warehousesReducer,
    warehouseInfo: warehouseInfoPageReducer,
    customers: customersPageReducer,
    addCustomerPage: addCustomerPageReducer,
    employees: employeePageReducer,
    selectProductsModal: selectProductsModalReducer,
    newProductsModal: newProductsModalReducer,
  })(state, action);
};

export default rootReducer;
