import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

//pages and components
import Header from "./components/layouts/header/header.jsx";
import MenuBar from "./components/layouts/menubar/menubar.jsx";
import DashBoard from "./components/pages/dashBoard";
import Customers from "./components/pages/customers";
import Employees from "./components/pages/employees";
import Inventory from "./components/pages/inventory";
import Orders from "./components/pages/orders";
import Products from "./components/pages/products";
import PurchaseOrders from "./components/pages/purchaseOrders";
import Reports from "./components/pages/reports";
import Warehouse from "./components/pages/warehouse";
import SignInPage from "./components/pages/SignInPage/SignInPage.jsx";
import SettingPage from "./components/pages/SettingPage/SettingPage.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const ROUTE_TITLES = {
  "/": "Authentication",
  "/dashboard": "Dashboard",
  "/customers": "Customers",
  "/employees": "Employees",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/products": "Products",
  "/purchaseorders": "Purchase Orders",
  "/reports": "Reports",
  "/warehouse": "Warehouse",
  "/setting": "Setting",
};
import { useState } from "react";

//pages and components

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
        </Routes>
        <div style={{ display: "flex", height: "100vh" }}>
          <MenuBar />
          <div style={{ flex: 1 }}>
            <Header></Header>
            <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/purchaseorders" element={<PurchaseOrders />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/setting" element={<SettingPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
