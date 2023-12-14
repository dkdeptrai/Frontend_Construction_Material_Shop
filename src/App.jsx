import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

//pages and components
import Header from "./components/layouts/header/header.jsx";
import MenuBar from "./components/layouts/menubar/menubar.jsx";
import DashBoard from "./components/pages/dashBoardPage.jsx";
import Customers from "./components/pages/customersPage.jsx";
import Employee from "./components/pages/Employee/ListEmployee/Employee.jsx";
import AddEmployee from "./components/pages/Employee/AddEmployee/AddEmployeePage.jsx";
import Inventory from "./components/pages/inventoryPage.jsx";
import SaleOrdersPage from "./components/pages/SaleOrders/ListOrders/saleOrders.jsx";
import AddSaleOrderPage from "./components/pages/SaleOrders/AddOrder/AddSaleOrderPage.jsx";
import Products from "./components/pages/productsPage/productsPage.jsx";
import AddProductPage from "./components/pages/addProductPage/addProductPage.jsx";
import PurchaseOrders from "./components/pages/purchaseOrdersPage.jsx";
import Reports from "./components/pages/reportsPage.jsx";
import Warehouse from "./components/pages/warehousePage.jsx";
import SignInPage from "./components/pages/SignInPage/SignInPage.jsx";
import Account from "./components/pages/Setting/account/account.jsx";
import SettingModal from "./components/pages/Setting/SettingModal/SettingModal.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/pages/addProductPage/addProductPage.jsx";

const ROUTE_TITLES = {
  "/": "Authentication",
  "/dashboard": "Dashboard",
  "/customers": "Customers",
  "/employees": "Employees",
  "/employees/add": "Add Employee",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/orders/add": "Add Order",
  "/products": "Products",
  "/purchaseorders": "Purchase Orders",
  "/reports": "Reports",
  "/warehouse": "Warehouse",
  "/account": "Account",
  "/password": "Password",
};

function App() {
  const isOpen = useSelector((state) => state.modal.isOpen);

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
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/employees" element={<Employee />} />
                <Route path="/employees/add" element={<AddEmployee />} /> */
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<SaleOrdersPage />} />
                <Route path="/orders/add" element={<AddSaleOrderPage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProductPage />} />
                <Route path="/purchaseorders" element={<PurchaseOrders />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/warehouse" element={<Warehouse />} />
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
