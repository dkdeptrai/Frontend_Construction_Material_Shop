import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Header from "./components/layouts/header/header.jsx";
import MenuBar from "./components/layouts/menubar/menubar.jsx";
import DashBoard from "./components/pages/dashBoardPage.jsx";
import Customers from "./components/pages/customersPage.jsx";
import Employees from "./components/pages/employeePages.jsx";
import Inventory from "./components/pages/inventoryPage.jsx";
import Orders from "./components/pages/ordersPage.jsx";
import Products from "./components/pages/products/productsPage.jsx";
import PurchaseOrders from "./components/pages/purchaseOrdersPage.jsx";
import Reports from "./components/pages/reportsPage.jsx";
import Warehouse from "./components/pages/warehousePage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const ROUTE_TITLES = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/customers": "Customers",
  "/employees": "Employees",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/products": "Products",
  "/purchaseorders": "Purchase Orders",
  "/reports": "Reports",
  "/warehouse": "Warehouse",
};

function App() {
  return (
    <>
      <Router>
        <div className="routerContainer">
          <MenuBar className="menuBar" />
          <div className="rightPanel">
            <Header />

            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/purchaseorders" element={<PurchaseOrders />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/warehouse" element={<Warehouse />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
