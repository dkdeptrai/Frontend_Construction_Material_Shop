import React from "react";
import ExportIcon from "../../../assets/icons/export.svg?react";

import "./exportButton.css";

function ExportButton(props) {
  const handleClick = props.onClick;
  return (
    <button className="exportButton" onClick={handleClick}>
      <ExportIcon className="exportIcon" /> <div>Export</div>
    </button>
  );
}

export default ExportButton;
