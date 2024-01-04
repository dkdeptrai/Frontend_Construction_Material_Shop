import React, { useState } from "react";

import Account from "../Account/Account.jsx";
import Password from "../Password/Password.jsx";
import Notifications from "../Notifications/Notifications.jsx";
import Tax from "../Tax/Tax.jsx";
import SidebarComponent from "../Sidebar/Sidebar.jsx";
import ExitButton from "../../../assets/icons/exitbutton.svg?react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/Modal.jsx";
import "./SettingModal.css";

const SettingModal = () => {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState("account");

  const handleExit = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <SidebarComponent
            selectedItem={selectedItem}
            onMenuItemClick={setSelectedItem}
          />
          <div>
            <div className="exit-button-container">
              <div className="exit-button" onClick={handleExit}>
                <ExitButton />
              </div>
            </div>
            <div>
              {selectedItem === "account" && <Account />}
              {selectedItem === "password" && <Password />}
              {selectedItem === "notifications" && <Notifications />}
              {selectedItem === "tax" && <Tax />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingModal;
