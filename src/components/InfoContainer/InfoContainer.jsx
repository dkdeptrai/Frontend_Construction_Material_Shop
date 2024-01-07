import React from "react";
import "./InfoContainer.css";

//pages and components
import ExportIcon from "../../assets/icons/export.svg?react";

const InfoContainer = ({ title, info, icon }) => {
  return (
    <div className="info-container">
      <div className="icon-container">{icon}</div>
      <div className="info">
        <p>{info}</p>
        <span>{title}</span>
      </div>
      <ExportIcon className="export-icon"/>
    </div>
  );
};

export default InfoContainer;
