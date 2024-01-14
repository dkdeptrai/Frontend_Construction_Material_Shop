import React from "react";
import "./Sidebar.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import BellIcon from "../../../assets/icons/bell.svg?react";
import UserIcon from "../../../assets/icons/frame.svg?react";
import TaxIcon from "../../../assets/icons/tax.svg?react";
import PasswordIcon from "../../../assets/icons/pass.svg?react";

const SidebarComponent = ({ selectedItem, onMenuItemClick }) => {
  return (
    <div className="sidebar">
      <h1 style={{ margin: "30px 20px 30px 20px" }}>Settings</h1>
      <Sidebar width="100%" backgroundColor="white">
        <Menu
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
                    fill: active ? "#f7e8ef" : "#455A64",
                    borderRadius: "18px",
                    fontWeight: "600",
                  },
                };
              }
            },
          }}
        >
          <MenuItem
            active={selectedItem === "account"}
            icon={<UserIcon />}
            onClick={() => onMenuItemClick("account")}
            style={{ margin: "20px" }}
          >
            <span style={{ marginLeft: "25px" }}>Account</span>
          </MenuItem>
          <MenuItem
            icon={<PasswordIcon />}
            active={selectedItem === "password"}
            onClick={() => onMenuItemClick("password")}
            style={{ margin: "20px" }}
          >
            <span style={{ marginLeft: "25px" }}>Password</span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
