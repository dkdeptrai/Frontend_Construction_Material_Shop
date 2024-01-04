import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

//pages and components
import Header from "./components/layouts/header/header.jsx";
import MenuBar from "./components/layouts/menubar/menubar.jsx";

//dashboard
import DashBoard from "./pages/Dashboard/Dashboard.jsx";

//customer
import Customer from "./pages/Customer/ListCustomer/Customer.jsx";
import AddCustomerPage from "./pages/Customer/AddCustomer/AddCustomerPage.jsx";
import CustomerInformationPage from "./pages/Customer/InfoCustomer/CustomerInformationPage.jsx";

//employee
import Employee from "./pages/Employee/ListEmployee/Employee.jsx";
import AddEmployee from "./pages/Employee/AddEmployee/AddEmployeePage.jsx";
import EmployeeInformationPage from "./pages/Employee/InfoEmployee/EmployeeInformationPage.jsx";

//inventory
import Inventory from "./pages/inventoryPage.jsx";
import InventoryItemList from "./pages/Inventory/InventoryItemsList/InventoryItemList.jsx";

//sale order
import SaleOrdersPage from "./pages/SaleOrders/ListOrders/SaleOrders.jsx";
import AddSaleOrderPage from "./pages/SaleOrders/AddOrder/AddSaleOrderPage/AddSaleOrderPage.jsx";
import NewProducts from "./pages/SaleOrders/AddOrder/NewProducts/NewProducts.jsx";
import InfoOrder from "./pages/SaleOrders/InfoOrder/InfoOrder.jsx";

import Products from "./pages/productsPage/productsPage.jsx";
import AddProductPage from "./pages/addProductPage/addProductPage.jsx";

//purchase order
import PurchaseOrders from "./pages/PurchaseOrders/ListPurchaseOrders/PurchaseOrders.jsx";
import AddPurchaseOrderPage from "./pages/PurchaseOrders/AddPurchaseOrder/AddPurchaseOrderPage/AddPurchaseOrderPage.jsx";
import Reports from "./pages/reportsPage.jsx";
import Warehouse from "./pages/warehousePage/warehousePage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import Account from "./pages/Setting/Account/Account.jsx";
import SettingModal from "./pages/Setting/SettingModal/SettingModal.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductInfoPage from "./pages/productInfoPage/productInfoPage.jsx";
import AddWarehousePage from "./pages/addWarehousePage.jsx";
import WarehouseInfoPage from "./pages/warehouseInfoPage/warehouseInfoPage.jsx";

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
  "/purchaseorders": "Purchase Orders",
  "/purchaseorders/add": "Add Purchase Order",
  "/purchaseorders/add/add-products": "Add Products",
  "/reports": "Reports",
  "/warehouse": "Warehouse",
  "/account": "Account",
  "/password": "Password",
};

function App() {
  const isOpen = useSelector((state) => state.modal.isOpen);

  const userType = useSelector((state) =>
    state.user.userData?.userType ? state.user.userData.userType : "EMPLOYEE"
  );

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
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProductPage />} />
                <Route
                  path="/products/update/:id"
                  element={<ProductInfoPage />}
                />
                <Route path="/purchaseorders" element={<PurchaseOrders />} />
                <Route
                  path="/purchaseorders/add"
                  element={<AddPurchaseOrderPage />}
                />
                <Route
                  path="/purchaseorders/add/add-products"
                  element={<NewProducts />}
                />
                <Route path="/reports" element={<Reports />} />
                <Route path="/warehouses" element={<Warehouse />} />
                <Route path="/warehouses/add" element={<AddWarehousePage />} />
                <Route
                  path="/warehouses/:address"
                  element={<WarehouseInfoPage />}
                />
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
