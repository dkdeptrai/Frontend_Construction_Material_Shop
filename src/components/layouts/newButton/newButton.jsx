import React from "react";
import AddIcon from "../../../assets/icons/add.svg?react";

import "./newButton.css";

function NewButton(props) {
  const handleClick = props.onClick;
  const text = props.text || "";
  return (
    <button onClick={handleClick} className="newButton">
      <AddIcon /> {text}
    </button>
  );
}

export default NewButton;
