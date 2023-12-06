import React from "react";
import "./SettingPage.css";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../states/Modal.jsx";

const SettingPage = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-overlay">
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
        <div className="buttons">
          <button onClick={handleClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
