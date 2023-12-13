import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/Modal.jsx";

//icons and images
import SettingIcon from "../../../assets/icons/setting.svg?react";
import "./header.css";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageTitle = location.pathname.split("/").pop();
  const userData = useSelector((state) => state.user.userData);
  const pageTitleText =
    pageTitle === "purchaseorders"
      ? "Purchase Orders"
      : pageTitle === "add"
      ? "Employees"
      : pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  const handeClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="header">
      <div className="pageTitle">{pageTitleText}</div>
      <div className="info">
        <div className="employeeName">{userData?.name}</div>
        <Image className="avatar" src="https://picsum.photos/200" />
        <button className="settingButton" onClick={handeClick}>
          <SettingIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
