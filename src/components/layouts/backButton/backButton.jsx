import React from "react";
import "./backButton.css";

import BackIcon from "../../../assets/icons/back.svg?react";

const BackButton = (props) => {
  return (
    <button className="back-button">
      <div className="button-content">
        <BackIcon />
        <span style={{marginLeft: '1.25rem', fontSize: '1.125rem'}}>{props.content}</span>
      </div>
    </button>
  );
};

export default BackButton;
