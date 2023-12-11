import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useRoutes,
} from "react-router-dom";
import Account from "../account/account.jsx";
import Password from "../password/password.jsx";
import Notifications from "../notifications/notifications.jsx";
import Tax from "../tax/tax.jsx";
import SidebarComponent from "../setting_sidebar/sidebar.jsx";
import "./SettingModal.css";

const SettingModal = () => {
  const [selectedItem, setSelectedItem] = useState("account");

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <SidebarComponent
            selectedItem={selectedItem}
            onMenuItemClick={setSelectedItem}
          />
          {selectedItem === "account" && <Account />}
          {selectedItem === "password" && <Password />}
          {selectedItem === "notifications" && <Notifications />}
          {selectedItem === "tax" && <Tax />}
        </div>
      </div>
    </>
  );
};

export default SettingModal;
