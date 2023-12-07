import React from "react";
import "./sidebar.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const SidebarComponent = ({ onMenuItemClick }) => {
  
  return (
    <div className="sidebar">
      <Sidebar width="100%">
        <Menu iconShape="square">
          <MenuItem onClick={() => onMenuItemClick('account')}>Account</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('password')}>Password</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('notifications')}>Notification</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('tax')}>Tax</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
