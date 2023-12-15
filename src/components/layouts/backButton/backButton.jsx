import React from "react";
import "./backButton.css";

import BackIcon from "../../../assets/icons/back.svg?react";

const BackButton = (props) => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <div className="button-content">
        <BackIcon />
        <span style={{marginLeft: '1.25rem', fontSize: '1.125rem'}}>{props.content}</span>
      </div>
    </button>
  );
};

export default BackButton;
