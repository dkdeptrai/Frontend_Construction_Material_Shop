import React from "react";
import DeleteIcon from "../../../assets/icons/delete.svg?react";

import "./deleteButton.css";

function DeleteButton(props) {
  const handleClick = props.onClick;
  return (
    <button className="deleteButton" onClick={handleClick}>
      <DeleteIcon />
    </button>
  );
}

export default DeleteButton;
