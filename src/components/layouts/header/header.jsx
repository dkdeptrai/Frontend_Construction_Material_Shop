import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../../states/Modal.jsx";

//icons and images
import SettingIcon from "../../../assets/icons/setting.svg?react";
import "./header.css";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = location.pathname.split("/").pop();
  const pageTitleText = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  const handeClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="header">
      <div className="pageTitle">{pageTitleText}</div>
      <div className="info">
        <div className="employeeName">John Doe</div>
        <Image className="avatar" src="https://picsum.photos/200" />
        <button className="settingButton" onClick={handeClick}>
          <SettingIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
