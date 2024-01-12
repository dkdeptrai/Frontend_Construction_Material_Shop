import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

//pages and components
import Header from "./components/layouts/header/header.jsx";
import MenuBar from "./components/layouts/menubar/menubar.jsx";

//dashboard
import DashBoard from "./pages/Dashboard/Dashboard.jsx";

//overview
import Overview from "./pages/Overview/Overview.jsx";

//customer
import Customer from "./pages/Customer/ListCustomer/Customer.jsx";
import AddCustomerPage from "./pages/Customer/AddCustomer/AddCustomerPage.jsx";
import CustomerInformationPage from "./pages/Customer/InfoCustomer/CustomerInformationPage.jsx";

//employee
import Employee from "./pages/Employee/ListEmployee/Employee.jsx";
import AddEmployee from "./pages/Employee/AddEmployee/AddEmployeePage.jsx";
import EmployeeInformationPage from "./pages/Employee/InfoEmployee/EmployeeInformationPage.jsx";

//inventory
import InventoryItemList from "./pages/Inventory/InventoryItemsList/InventoryItemList.jsx";

//sale order
import SaleOrdersPage from "./pages/SaleOrders/ListOrders/saleOrders.jsx";
import AddSaleOrderPage from "./pages/SaleOrders/AddOrder/AddSaleOrderPage/AddSaleOrderPage.jsx";
import NewProducts from "./pages/SaleOrders/AddOrder/NewProducts/NewProducts.jsx";
import InfoOrder from "./pages/SaleOrders/InfoOrder/InfoOrder.jsx";

import ProductInfoPage from "./pages/products/productInfoPage/ProductInfoPage.jsx";

//purchase order
import PurchaseOrders from "./pages/PurchaseOrders/ListPurchaseOrders/PurchaseOrders.jsx";
import AddPurchaseOrderPage from "./pages/PurchaseOrders/AddPurchaseOrder/AddPurchaseOrderPage/AddPurchaseOrderPage.jsx";
import InfoPurchaseOrder from "./pages/PurchaseOrders/InfoPurchaseOrder/InfoPurchaseOrder.jsx";

//warehouse
import WarehousesPage from "./pages/Warehouse/WarehousesPage/WarehousesPage.jsx";
import WarehouseInfoPage from "./pages/Warehouse/warehouseInfoPage/warehouseInfoPage.jsx";

import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import Account from "./pages/Setting/Account/Account.jsx";
import SettingModal from "./pages/Setting/SettingModal/SettingModal.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/products/productsPage/productsPage.jsx";

const ROUTE_TITLES = {
  "/": "Authentication",
  "/dashboard": "Dashboard",
  "/customers": "Customers",
  "/customers/add": "Add Customer",
  "/customers/:id": "Customer Details",
  "/employees": "Employees",
  "/employees/add": "Add Employee",
  "/employees/:id": "Employee Details",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/orders/add": "Add Order",
  "/orders/add/add-products": "Add Products",
  "/orders/:id": "Order Details",
  "/products": "Products",
  "/purchase-orders": "Purchase Orders",
  "/purchase-orders/add": "Add Purchase Order",
  "/purchase-orders/add/add-products": "Add Products",
  "/purchase-orders/:id": "Purchase Order Details",
  "/warehouse": "Warehouse",
  "/account": "Account",
  "/password": "Password",
};

function App() {
  const isOpen = useSelector((state) => state.modal.isOpen);

  const userType = useSelector((state) =>
    state.user.userData?.userType ? state.user.userData.userType : "EMPLOYEE"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action when the component mounts (i.e., when the page reloads)
    dispatch({ type: "CLEAR_REDUX_STORE", payload: { keepUser: true } });
  }, [dispatch]);
  return (
    <>
      {isOpen ? <SettingModal /> : null}
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
        </Routes>
        <div className="routerContainer">
          <MenuBar className="menuBar" />
          <div className="rightPanel">
            <Header />
            <div className="contentContainer">
              <Routes>
                <Route path="/overview" element={<Overview />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="/customers/add" element={<AddCustomerPage />} />
                <Route
                  path="/customers/:id"
                  element={<CustomerInformationPage />}
                />

                {userType === "MANAGER" && (
                  <>
                    <Route path="/employees" element={<Employee />} />
                    <Route path="/employees/add" element={<AddEmployee />} />
                    <Route
                      path="/employees/:id"
                      element={<EmployeeInformationPage />}
                    />
                  </>
                )}

                <Route path="/inventory" element={<InventoryItemList />} />
                <Route path="/orders" element={<SaleOrdersPage />} />
                <Route path="/orders/add" element={<AddSaleOrderPage />} />
                <Route
                  path="/orders/add/add-products"
                  element={<NewProducts />}
                />
                <Route path="/orders/:id" element={<InfoOrder />} />

                {/* // products */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/add" element={<ProductInfoPage />} />
                <Route path="/products/:id" element={<ProductInfoPage />} />
                <Route
                  path="/products/update/:id"
                  element={<ProductInfoPage />}
                />
                <Route path="/purchase-orders" element={<PurchaseOrders />} />
                <Route
                  path="/purchase-orders/add"
                  element={<AddPurchaseOrderPage />}
                />
                <Route
                  path="/purchase-orders/add/add-products"
                  element={<NewProducts />}
                />
                <Route
                  path="/purchase-orders/:id"
                  element={<InfoPurchaseOrder />}
                />
                <Route path="/warehouses" element={<WarehousesPage />} />
                <Route path="/warehouses/add" element={<WarehouseInfoPage />} />
                <Route path="/warehouses/:id" element={<WarehouseInfoPage />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
