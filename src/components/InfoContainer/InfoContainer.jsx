import React from "react";
import "./InfoContainer.css";

const InfoContainer = ({ title, info, imageUrl }) => {
  return (
    <div className="info-container">
      <img src={imageUrl} />
      <div className="info">
        <p>{info}</p>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default InfoContainer;
