import React from "react";
import "./SettingPage.css";

const SettingPage = () => {
  return (
    <div className="setting-page">
      <div>
        <label>Name</label>
        <input type="text" />
        <label>Employee Code</label>
        <input type="text" />
        <label>Email</label>
        <input type="text" />
        <label>Phone</label>
        <input type="text" />
        <label>Address</label>
        <input type="text" />
        <label>Date of birth</label>
        <input type="date" />
      </div>
      <div className="image"></div>
    </div>
  );
};

export default SettingPage;
