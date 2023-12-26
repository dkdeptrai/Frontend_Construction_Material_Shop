import React from "react";
import "./InformationLine.css";

const InformationLine = (props) => {
  return (
    <div className="inline-info">
      <label>{props.label}</label>
      <div style={{width: "41%"}}>
        <label style={{ fontWeight: "300" }}>{props.content}</label>
      </div>
    </div>
  );
};

export default InformationLine;
