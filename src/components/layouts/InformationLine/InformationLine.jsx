import React from "react";
import "./InformationLine.css";

const InformationLine = (props) => {  
  return (
    <div className="inline-info">
      <label>{props.label}</label>
      <label style={{fontWeight: "300"}}>{props.content}</label>
    </div>
  );
};

export default InformationLine;