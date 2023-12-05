import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import DashboardIcon from "../../../assets/icons/dashboard.svg?react";
import ProductIcon from "../../../assets/icons/product.svg?react";
import OrderIcon from "../../../assets/icons/order.svg?react";
import PurchaseOrderIcon from "../../../assets/icons/purchase-order.svg?react";
import CustomerIcon from "../../../assets/icons/customer.svg?react";
import InventoryIcon from "../../../assets/icons/inventory.svg?react";
import WarehouseIcon from "../../../assets/icons/Warehouse.svg?react";
import ReportIcon from "../../../assets/icons/report.svg?react";
import EmployeeIcon from "../../../assets/icons/employee.svg?react";
import Logo from "./logo/logo.jsx";
import "./menubar.css";

function MenuItemComponent({ icon, link }) {
  const location = useLocation();
  return (
    <MenuItem
      style={{ margin: "20px" }}
      icon={icon}
      active={location.pathname === link}
      component={<NavLink to={link} />}
    >
      {link.charAt(1).toUpperCase() + link.slice(2)}
    </MenuItem>
  );
}

function MenuBar() {
  const location = useLocation();
  return (
    <div className="container">
      <Logo />
      <Sidebar
        width="300px"
        backgroundColor="#FFFFFF"
        rootStyles={{
          border: "none",
        }}
      >
        <Menu
          active={location.pathname}
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0) {
                return {
                  color: disabled ? "#eee" : active ? "#f7e8ef" : "#455A64",
                  backgroundColor: active ? "#6a1039" : undefined,
                  borderRadius: active ? "18px" : undefined,
                  fontWeight: active ? "600" : "500",
                  "&:hover": {
                    backgroundColor: "#6a1039",
                    color: "#f7e8ef",
                    borderRadius: "18px",
                    fontWeight: "600",
                  },
                };
              }
            },
            icon: ({ level, active, disabled }) => {
              if (level === 0) {
                return {
                  color: active ? "#f7e8ef" : "#455A64",
                  fill: active ? "#f7e8ef" : "#455A64",
                  "&:hover": {
                    color: "#f7e8ef",
                    fill: "#f7e8ef",
                  },
                };
              }
            },
          }}
        >
          <MenuItemComponent icon={<DashboardIcon />} link="/dashboard" />
          <MenuItemComponent icon={<ProductIcon />} link="/products" />
          <MenuItemComponent icon={<OrderIcon />} link="/orders" />
          <MenuItemComponent
            icon={<PurchaseOrderIcon />}
            link="/purchaseorders"
          />
          <MenuItemComponent icon={<CustomerIcon />} link="/customers" />
          <MenuItemComponent icon={<InventoryIcon />} link="/inventory" />
          <MenuItemComponent icon={<WarehouseIcon />} link="/warehouse" />
          <MenuItemComponent icon={<ReportIcon />} link="/reports" />
          <MenuItemComponent icon={<EmployeeIcon />} link="/employees" />
        </Menu>
      </Sidebar>
    </div>
  );
}

export default MenuBar;
