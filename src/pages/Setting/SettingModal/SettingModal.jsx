import React, { useState } from "react";

import Account from "../account/account.jsx";
import Password from "../password/password.jsx";
import Notifications from "../notifications/notifications.jsx";
import Tax from "../tax/tax.jsx";
import SidebarComponent from "../setting_sidebar/sidebar.jsx";
import ExitIcon from "../../../assets/icons/exit.svg?react";
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
          <div>
            <button className="exit-button">
              <ExitIcon />
            </button>

            {selectedItem === "account" && <Account />}
            {selectedItem === "password" && <Password />}
            {selectedItem === "notifications" && <Notifications />}
            {selectedItem === "tax" && <Tax />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingModal;
