import React from "react";
import { useLocation } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import SettingIcon from "../../../assets/icons/setting.svg?react";
import "./header.css";

function Header() {
  const location = useLocation();
  const pageTitle = location.pathname.split("/").pop();
  const pageTitleText = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <div className="header">
      <div className="pageTitle">{pageTitleText}</div>
      <div className="info">
        <div className="employeeName">John Doe</div>
        <Image className="avatar" src="https://picsum.photos/200" />
        <button className="settingButton">
          <SettingIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
