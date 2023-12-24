import React from "react";
import "./sidebar.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/Modal.jsx";
import BellIcon from "../../../assets/icons/bell.svg?react";
import UserIcon from "../../../assets/icons/frame.svg?react";
import TaxIcon from "../../../assets/icons/tax.svg?react";
import PasswordIcon from "../../../assets/icons/pass.svg?react";
import ExitIcon from "../../../assets/icons/exit.svg?react";

const SidebarComponent = ({ selectedItem, onMenuItemClick }) => {
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(closeModal());
  };

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
          <MenuItem
            icon={<BellIcon />}
            active={selectedItem === "notifications"}
            onClick={() => onMenuItemClick("notifications")}
            style={{ margin: "20px" }}
          >
            <span style={{ marginLeft: "25px" }}>Notifications</span>
          </MenuItem>
          <MenuItem
            icon={<TaxIcon />}
            active={selectedItem === "tax"}
            onClick={() => onMenuItemClick("tax")}
            style={{ margin: "20px" }}
          >
            <span style={{ marginLeft: "25px" }}>Tax</span>
          </MenuItem>
          <MenuItem
            icon={<ExitIcon />}
            onClick={handleExit}
            style={{ margin: "20px" }}
          >
            <span style={{ marginLeft: "25px" }}>Exit</span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
