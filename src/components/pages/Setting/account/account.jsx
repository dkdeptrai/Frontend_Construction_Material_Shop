import React from "react";
import "./account.css";

const Account = () => {
  return (
    <div className="setting">
      <div className="setting-page">
        <div>
          <label>Name</label>
          <input type="text" />
          <label>Employee Code</label>
          <input type="text" />
          <label>Email</label>
          <input type="email" />
          <label>Phone</label>
          <input type="tel" />
          <label>Address</label>
          <input type="text" />
          <label>Date of birth</label>
          <input type="date" />
        </div>
        <div className="image"></div>
      </div>
    </div>
  );
};

export default Account;
