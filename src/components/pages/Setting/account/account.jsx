import React from "react";
import "./account.css";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../states/Modal.jsx";

const Account = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeModal());
  };

  return (
    <div className="setting">
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
      <button className="close-button" onClick={handleClick}>Cancel</button>
    </div>
  );
};

export default Account;
