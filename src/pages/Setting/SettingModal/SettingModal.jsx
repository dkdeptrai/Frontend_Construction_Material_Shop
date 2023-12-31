import React, { useState } from "react";

import Account from "../Account/Account.jsx";
import Password from "../Password/Password.jsx";
import Notifications from "../Notifications/Notifications.jsx";
import Tax from "../Tax/Tax.jsx";
import SidebarComponent from "../Sidebar/Sidebar.jsx";
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
            {/* <button className="exit-button">
              <ExitIcon />
            </button> */}

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
