import React from "react";
import LogoIcon from "../../../../assets/icons/logo.svg?react";
import "./logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <LogoIcon className="icon" />
      <div className="shopName">ABC Shop</div>
      <div className="shopDescription">Construction Material</div>
    </div>
  );
};

export default Logo;
